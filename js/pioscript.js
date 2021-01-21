class PIOScript {
	constructor(parsedHand, outputFilepath) {
		console.log(parsedHand.flop)
		this.script = []
		this.setThreads(0)
		this.setAccuracy(parsedHand.potSizes[FLOP] / 100)
		this.setRange("OOP", this.getRange("OOP", parsedHand))
		this.setRange("IP", this.getRange("IP", parsedHand))
		this.setBoard(parsedHand.flop)
		this.setEffectiveStack(parsedHand.effectiveStacks[FLOP])
		this.setIsomorphism()
		this.setPot(0, 0, parsedHand.potSizes[FLOP])
		this.clearLines()
		var lines = this.getLines(parsedHand)
		for (var i = 0; i < lines.length; i++) {
			this.addLine(lines[i])
		}
		// force_line [0]
		// remove_line [0, 0]
		this.buildTree()
		this.skipIfDone(outputFilepath, "next")
		this.go(600)
		this.waitForSolver()
		this.dumpTree(outputFilepath)
		this.label("next")
		this.solverTime()
		this.echo("Thanks for using this tool.")
	}

	getRange(position, parsedHand) {
		var activePositions = parsedHand.activePositions()
		var oopPosition = activePositions[0]
		var ipPosition = activePositions[1]
		if (position == "OOP") {
			return getRange(parsedHand.preflopType(), oopPosition, ipPosition)
		}
		return getRange(parsedHand.preflopType(), ipPosition, oopPosition)
	}

	getCBetPosition(parsedHand) {
		var includesSB = parsedHand.activePositions().includes("SB")
		var includesBB = parsedHand.activePositions().includes("BB")

		if (parsedHand.preflopType() == "SRP") {
			if (includesSB && includesBB) {
				return "OOP"
			}
			return "IP"
		}
		if (parsedHand.preflopType() == "3BP") {
			if (includesSB && includesBB) {
				return "IP"
			}
			if (!includesSB && !includesBB) {
				return "IP"
			}
		}
		return "OOP"

	}

	getLines(parsedHand) {
		var cbetSize = 60
		var cbet = parsedHand.flopCBetAction()
		if (cbet != null) {
			cbetSize = cbet.amount / parsedHand.potSizes[FLOP] * 100
		}
		var turnBets = [40, 80, 150]
		var riverBets = [80, 150]
		var raises = [50]
		var cbettingPosition = this.getCBetPosition(parsedHand)

		if (cbettingPosition == "IP") {
			var ipFlopBets = [cbetSize]
			var oopFlopBets = []
		} else{
			var ipFlopBets = [33,75]
			var oopFlopBets = [cbetSize]
		}

		var oopConfig = new BetConfig(
			oopFlopBets, turnBets, riverBets, raises, raises, raises)
		var ipConfig = new BetConfig(
			ipFlopBets, turnBets, riverBets, raises, raises, raises)
		var lines = generateLines(
			parsedHand.potSizes[FLOP],
			parsedHand.effectiveStacks[FLOP],
			oopConfig,
			ipConfig,
			67,
		)
		var roundedLines = []
		for (var i = 0; i < lines.length; i++) {
			var roundedLine = []
			for (var j = 0; j < lines[i].length; j++) {
				roundedLine.push(Math.round(100 * lines[i][j]) / 100)
			}
			roundedLines.push(roundedLine)
		}
		return roundedLines
	}

	getScript() {
		return this.script.join("\n")
	}

	setEffectiveStack(stack){
		this.addCommand("set_eff_stack", [stack.toString()])
	}

	setBoard(board) {
		this.addCommand("set_board", board)
	}

	setRange(position, range){
		var params = [position]
		params = params.concat(range)
		this.addCommand("set_range", params)
	}

	setAccuracy(numChips) {
		this.addCommand("set_accuracy", [numChips.toString()])
	}

	setThreads(numThreads) {
		this.addCommand("set_threads", [numThreads.toString()])
	}

	setIsomorphism() {
		this.addCommand("set_isomorphism", [1, 0])
	}

	setPot(oop, ip, main) {
		this.addCommand("set_pot", [oop, ip, main])
	}

	addLine(line) {
		this.addCommand("add_line", line)
	}

	clearLines() {
		this.addCommand("clear_lines", [])
	}

	buildTree() {
		this.addCommand("build_tree", [])
	}

	skipIfDone(filepath, skipToLabel)  {
		this.addCommand("skip_if_done", [filepath, skipToLabel])
	}

	go(numSeconds) {
		this.addCommand("go", [numSeconds, "seconds"])
	}

	waitForSolver() {
		this.addCommand("wait_for_solver", [])
	}

	dumpTree(filepath) {
		this.addCommand("dump_tree", [filepath, "no_rivers"])
	}

	echo(s) {
		this.addCommand("echo", [s])
	}

	label(labelName) {
		this.addCommand("LABEL:", [labelName])
	}

	solverTime() {
		this.addCommand("solver_time", [])
	}

	addCommand(command, params) {
		this.script.push(command + " " + params.join(" "))
	}
}
