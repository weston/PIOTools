BET = "BET"
CALL = "CALL"
CHECK = "CHECK"
IP = "IP"
JAM = "JAM"
JAM_THRESHOLD_PCT = Number("0.6")
OOP = "OOP"
RAISE = "RAISE"
ROOT = "ROOT"


class BetConfig {
	constructor(
		flopBets,
		turnBets,
		riverBets,
		flopRaises,
		turnRaises,
		riverRaises){
		this.flopBets = flopBets
		this.turnBets = turnBets
		this.riverBets = riverBets
		this.flopRaises = flopRaises
		this.turnRaises = turnRaises
		this.riverRaises = riverRaises
	}
}


class Node {
	constructor(value, nodeType) {
		this.value = value
		this.type = nodeType
		this.children = []
		this.parent = null
		this.position = null	// OOP or IP
	}

	addChild(node) {
		node.parent = this
		if (node.parent.type == ROOT) {
			node.position = OOP
		} else if (node.parent.isTerminalForStreet()) {
			node.position = OOP
		} else if (node.parent.position == OOP) {
			node.position = IP
		} else {
			node.position = OOP
		}
		this.children.push(node)
	}

	isTerminalForStreet() {
		if (this.parent == null) {
			return false
		}
		if (this.type == CHECK && this.position == IP) {
			return true
		}
		return [JAM, CALL].includes(this.type)
	}

	nextPosition() {
		if (this.position == OOP) {
			return IP
		}
		return OOP
	}
}


// generateLines(...)
// This functions generates line from a betting config similar to
// what PIOSolver does. It does so by creating a game tree, and then
// using the leaves of the tree to generate lines.
function generateLines(
	pot,
	effectiveStack,
	oopConfig,
	ipConfig,
	jamThresholdPercent) {

	root = generateStreetTree(
		new Node(null, ROOT),
		pot,
		effectiveStack,
		oopConfig.flopBets,
		oopConfig.flopRaises,
		ipConfig.flopBets,
		ipConfig.flopRaises,
		jamThresholdPercent * effectiveStack / 100,
	)
	var leaves = getLeaves(root)
	for (var i in leaves) {
		var node = leaves[i]

		if (node.type == JAM) {
			continue
		}
		var oopBets = oopConfig.turnBets
		if (node.type == CALL && node.position == OOP) {
			// Don't allow donk bets
			oopBets = []
		}
		generateStreetTree(
			node,
			pot + (2*node.value),
			effectiveStack - node.value,
			oopBets,
			oopConfig.turnRaises,
			ipConfig.turnBets,
			ipConfig.turnRaises,
			jamThresholdPercent * effectiveStack / 100,
		)
	}
	var leaves = getLeaves(root)
	for (var i in leaves) {
		var node = leaves[i]
		if (node.type == JAM) {
			continue
		}
		var oopBets = oopConfig.riverBets
		if (node.type == CALL && node.position == OOP) {
			// Don't allow donk bets
			oopBets = []
		}
		generateStreetTree(
			node,
			pot + (2*node.value),
			effectiveStack - node.value,
			oopBets,
			oopConfig.riverRaises,
			ipConfig.riverBets,
			ipConfig.riverRaises,
			jamThresholdPercent * effectiveStack / 100,
		)
	}
	return cleanLines(getLinesFromTreeHelper(root, null))
}


function generateStreetTree(
	root,
	startingPot,
	effectiveStack,
	oopBets,
	oopRaises,
	ipBets,
	ipRaises,
	jamThreshold){

	var adjustment = 0
	if (root.type != ROOT) {
		adjustment = root.value
	}


	// Add OOP check and bets
	root.addChild(new Node(adjustment, CHECK))
	for (var i in oopBets) {
		var betPercent = oopBets[i]
		var betSize = betPercent * startingPot / 100
		if (betSize + adjustment > jamThreshold) {
			root.addChild(
				new Node(adjustment + effectiveStack, JAM))
		} else {
			root.addChild(
				new Node(adjustment + betSize, BET))
		}
	}

	// Add IP check and bets
	root.children[0].addChild(new Node(adjustment, CHECK))
	for (var i in ipBets) {
		var betPercent = ipBets[i]
		var betSize = betPercent * startingPot / 100
		if (betSize + adjustment > jamThreshold) {
			// root.children[0] is OOP check
			root.children[0].addChild(
				new Node(adjustment + effectiveStack, JAM))
		} else {
			root.children[0].addChild(
				new Node(adjustment + betSize, BET))
		}
	}

	// Add raises until the effective stack runs out
	var addedNewNode = true
	while(addedNewNode){
		addedNewNode = false
		var leaves = getLeaves(root)
		for (var i in leaves) {
			var node = leaves[i]
			if (node.isTerminalForStreet()) {
				continue
			}
			console.assert([BET, RAISE].includes(node.type))
			node.addChild(new Node(node.value, CALL))
			var raises = ipRaises
			if (node.position == IP) {
				raises = oopRaises
			}
			for (var i in raises) {
				var raisePercent = raises[i]
				var raiseSize = (((
					startingPot + (2*node.value)) * raisePercent) / 100) + node.value
				if (raiseSize + adjustment > jamThreshold) {
					node.addChild(
						new Node(adjustment + effectiveStack, JAM))
				} else {
					addedNewNode = true
					node.addChild(
						new Node(adjustment + raiseSize, RAISE))
				}
			}
		}
	}
	return root
}


function getLeaves(node) {
	if (node.children.length == 0) {
		return [node]
	}
	var nodes = []
	for (var i in node.children) {
		var child = node.children[i]
		var leaves = getLeaves(child)
		for (var i in leaves) {
			nodes.push(leaves[i])
		}
	}
	return nodes
}


function getLinesFromTreeHelper(node, prefix) {
	if (prefix == null) {
		prefix = []
	}
	var lines = []
	if (node.children.length == 0) {
		if (node.type == CALL) {
			lines.push(prefix)
		} else {
			if (node.type == JAM) {
				lines.push(prefix.concat([node.value]))
				return lines
			}
			var n = node
			var count = 0
			while ([CHECK, CALL].includes(n.type)) {
				count += 1
				n = n.parent
			}

			var newPrefix = prefix.concat([node.value])
			newPrefix = newPrefix.slice(0, newPrefix.length - count)
			lines.push(newPrefix)
		}

	}
	for (var i in node.children) {
		var child = node.children[i]
		var newPrefix = prefix.concat([node.value])
		if (node.type == ROOT) {
			newPrefix = []
		}
		var newLines = getLinesFromTreeHelper(child, newPrefix)
		for (var j in newLines) {
			lines.push(newLines[j])
		}
	}
	return lines
}

function cleanLines(lines) {
	if (lines.length < 2) {
		return lines
	}
	var cleanedLines = []

	// Remove a line if it is empty
	for (var i in lines) {
		if (lines[i].length  > 0) {
			cleanedLines.push(lines[i])
		}
	}
	lines = cleanedLines
	cleanedLines = []
	for (var i in lines) {
		// If candidate is a prefix of any cleaned line, ignore it
		// If a cleaned line is a prefix of candidate, swap it in
		// If neither of these is true, add it to cleaned lines
		var candidateLine = lines[i]
		var candidateLineString = candidateLine.join(" ")
		var shouldAdd = true
		for (var j in cleanedLines) {
			var cleanedLine = cleanedLines[j]
			var cleanedLineString = cleanedLine.join(" ")
			if (cleanedLineString == candidateLineString) {
				shouldAdd = false
				break
			}
			if (cleanedLineString.startsWith(candidateLineString)) {
				shouldAdd = false
				break
			}
			if (candidateLineString.startsWith(cleanedLineString)) {
				cleanedLines[j] = candidateLine
				shouldAdd = false
				break

			}

		}
		if (shouldAdd) {
			cleanedLines.push(candidateLine)
		}
	}
	return cleanedLines
}


// This is just so we can call the function in
// test_generate_lines.js
// In order to run the tests we have to uncomment this
// exports.generateLines = generateLines
// exports.BetConfig = BetConfig
