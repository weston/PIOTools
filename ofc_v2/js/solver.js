SUITS = ["c", "d", "h", "s"]
RANKS = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"]
INTERNAL_STATE = {}
BLANK_CARD_SLOT = "_"
BASE_URL = "http://ec2-35-167-176-184.us-west-2.compute.amazonaws.com/"

TILDE = 192
ONE = 49
TWO = 50
THREE = 51


function drawCardPicker(){
	var parent = document.getElementById("card-picker")
	parent.innerHTML = ""
	var table = document.createElement("table")
	for (var i = 0; i < 4; i++) {
		var suit = SUITS[i]
		var row = document.createElement("tr")
		row.classList.add("card-picker-tr")
		for (var k = 0; k < 13; k++) {
			var rank = RANKS[k]
			var cell = document.createElement("td")
			cell.classList.add("card-picker-td")
			cell.classList.add("suit-".concat(suit))
			cell.classList.add("no-select")
			cell.id = rank.concat(suit)
			cell.innerHTML = rank.concat(suit)
			cell.onclick = selectCard
			row.appendChild(cell)

		}
		table.appendChild(row)
	}
	parent.appendChild(table)
}


function drawCardSlots(position) {
	var parent = document.getElementById(position.concat("-slots"))
	parent.innerHTML = ""
	var table = document.createElement("table")
	for (var i = 0; i < 3; i++) {
		var rowCount = [3, 5, 5][i]
		var row = document.createElement("tr")
		for (var k = 0; k < rowCount; k++) {
			var cell = document.createElement("td")
			cell.classList.add("card-slot-td")
			cell.classList.add("no-select")
			cell.classList.add("row-" + i)
			cell.innerHTML = BLANK_CARD_SLOT
			cell.onclick = selectSlot
			row.appendChild(cell)
		}
		table.appendChild(row)
	}
	parent.appendChild(table)
}

function drawNextCardSlots(numSlots) {
	var parent = document.getElementById("next-cards")
	parent.innerHTML = ""
	table = document.createElement("table")
	var row = document.createElement("tr")
	for (var i = 0; i < numSlots; i++) {
		var cell = document.createElement("td")
		cell.classList.add("card-slot-td")
		cell.classList.add("no-select")
		cell.classList.add("row-0")
		cell.innerHTML = BLANK_CARD_SLOT
		cell.onclick = selectSlot
		row .appendChild(cell)
	}
	table.appendChild(row)
	parent.appendChild(table)
}


function selectCard(event) {
	var elem = event.srcElement
	if (elem.classList.contains("dead-card")) {
		return
	}

	if (pressedKeys[TILDE]) {
		appendCard("next-cards", 0, elem)
		deselectPicker()
		return
	} else if (pressedKeys[ONE]) {
		appendCard("left-slots", 0, elem)
		deselectPicker()
		return
	} else if (pressedKeys[TWO]) {
		appendCard("left-slots", 1, elem)
		deselectPicker()
		return
	} else if (pressedKeys[THREE]) {
		appendCard("left-slots", 2, elem)
		deselectPicker()
		return
	}

	var shouldBeSelected = null
	if (elem.classList.contains("highlighted-card")) {
		shouldBeSelected = false
	} else {
		shouldBeSelected = true
	}

	deselectPicker()
	if (shouldBeSelected) {
		elem.classList.add("highlighted-card")
	}
}


function deselectPicker() {
	var allSelected = document.getElementsByClassName("highlighted-card")
	for (var i = 0; i < allSelected.length; i++) {
		allSelected[i].classList.remove("highlighted-card")
	}
}


function selectSlot(event) {
	var allSelected = document.getElementsByClassName("highlighted-card")
	var elem = event.srcElement
	if (allSelected.length > 1) {
		deselectPicker();
		return
	}
	var alreadyOccupied = elem.innerHTML != BLANK_CARD_SLOT
	if (allSelected.length == 0 || alreadyOccupied) {
		var card = elem.innerHTML
		elem.innerHTML = BLANK_CARD_SLOT
		elem.classList.remove("suit-".concat(card[1]))
		var originElem = document.getElementById(card)
		if (originElem != null){
			originElem.classList.remove("dead-card")
			originElem.innerHTML = card
		}
		if (allSelected.length == 0) {
			return
		}
	}
	var selectedCard = allSelected[0]

	cardToElem(selectedCard, elem)
}


function killCardInPicker(cardString) {
	var cells = document.getElementsByClassName("card-picker-td")
	for (var i = 0; i < cells.length; i++) {
		var cell = cells[i]
		if (cell.innerHTML == cardString) {
			cell.classList.add("dead-card")
			cell.innerHTML = BLANK_CARD_SLOT
		}
	}
}


function cardToElem(fromElem, toElem) {
	var rank = fromElem.id[0]
	var suit = fromElem.id[1]
	toElem.innerHTML = fromElem.id
	toElem.classList.add("suit-".concat(suit))
	fromElem.classList.remove("highlighted-card")
	fromElem.classList.add("dead-card")
	fromElem.innerHTML = BLANK_CARD_SLOT
}


function main() {
	newGame()
}


function newGame() {
	INTERNAL_STATE["dead_cards"] = []
	drawCardPicker()
	drawCardSlots("left")
	drawCardSlots("right")
	drawNextCardSlots(5)
	displayError("")
}


function progressGame() {
	var nextCards = getChosenCards("next-cards")
	var playerCards = getChosenCards("left-slots")
	var warrenCards = getChosenCards("right-slots")
	if (cardCount(nextCards) != 3 && cardCount(nextCards) != 5) {
		displayError("Not enough new cards")
		return
	}
	var validCounts = {
		0: [0],
		5: [0, 5],
		7: [5, 7],
		9: [7, 9],
		11: [9, 11],
		13: [11],
	}
	if (!(cardCount(playerCards) in validCounts)) {
		displayError("Invalid number of cards in the left slots")
		return
	}
	if (!(validCounts[cardCount(playerCards)].includes(cardCount(warrenCards)))) {
		displayError("Invalid number of cards in the right slots")
		return
	}
	// Dealer acts last, so if they have more cards than us, Warren must
	// be in the dealer position.
	var warrenIsDealer = cardCount(playerCards) > cardCount(warrenCards)
	queryWarren(playerCards, warrenCards, nextCards, warrenIsDealer)
}



function getChosenCards(parentID){
	// tableID: next-cards, left-slots, right-slots
	var table = document.getElementById(parentID)
	var cells = document.getElementsByClassName("card-slot-td")
	var chosenCards = []
	for (var i = 0; i < cells.length; i++) {
		if (table.contains(cells[i])) {
			chosenCards.push(cells[i].innerHTML)
		}
	}
	return chosenCards
}


function cardCount(cardList) {
	var count = 0
	for (var i = 0; i < cardList.length; i++) {
		if (cardList[i] != BLANK_CARD_SLOT) {
			count += 1
		}
	}
	return count
}


function appendCard(parentID, rowNumber, selectedElem) {
	var table = document.getElementById(parentID)
	var cells = document.getElementsByClassName("row-" + rowNumber)
	for (var i = 0; i < cells.length; i++) {
		if (table.contains(cells[i])) {
			if (cells[i].innerHTML == BLANK_CARD_SLOT){
				cardToElem(selectedElem, cells[i])
				return
			}
		}
	}
}


function queryWarren(playerCards, warrenCards, nextCards, warrenIsDealer) {
	const request = new XMLHttpRequest();
	var url = BASE_URL + "?mode=advanced&type=evaluation&gametype=Pineapple&"

	var hand1 = cardsToWarrenParams(playerCards)
	var hand2 = cardsToWarrenParams(warrenCards)
	var toPlay = cardsToWarrenParams(nextCards)

	url = url.concat("next=warren1" + "&")
	url = url.concat("hand1=" + hand1 + "&")
	url = url.concat("hand2=" + hand2 + "&")
	url = url.concat("toplay=" + toPlay + "&")
	url = url.concat("access_key=" + getPassword() + "&")
	if (INTERNAL_STATE["dead_cards"].length > 0) {
		url = url.concat("deadcards=" + INTERNAL_STATE["dead_cards"].join(","))
	}
	request.open("GET", url);
	request.send();
	request.onreadystatechange = (e) => {
		handleWarrenResponse(request.responseText, toPlay, warrenIsDealer)
	}
}


function cardsToWarrenParams(cards) {
	var counter = 0
	var cardToValue = {}
	var values = []
	for (var s = 0; s < SUITS.length; s++) {
		var suit = SUITS[s]
		for (var r = 0; r < RANKS.length; r++) {
			var rank = RANKS[r]
			cardToValue[rank.concat(suit)] = counter
			counter += 1
		}
	}
	cardToValue[BLANK_CARD_SLOT] = -1
	for (var i = 0; i < cards.length; i++) {
		values.push(cardToValue[cards[i]])
	}
	return values.join(",")
}


function getHighestEquityAction(parsedData, equityKey, handKey) {
	var bestEquity = null
	var best = null
	for (var i = 0; i < parsedData["calcs"].length; i++) {
		var action = parsedData["calcs"][i]
		if (bestEquity == null || Number(action[equityKey]) > bestEquity) {
			best = action[handKey]
			bestEquity = Number(action[equityKey])
		}
	}
	return best
}

function handleWarrenResponse(responseText, toPlay, warrenIsDealer){
	if (responseText.length == 0) {
		return
	}
	try {
        var data = JSON.parse(responseText);
    } catch(e) {
		console.log("Can't parse response from Warren" + responseText)
		return
	}
	if ("error" in data) {
		displayError(data["error"])
		return
	}
	if (warrenIsDealer) {
		var handKey = "hand2"
		var equityKey = "equity2"
	} else {
		var handKey = "hand1"
		var equityKey = "equity1"
	}

	var suggestions = getHighestEquityAction(data, equityKey, handKey)
	if (suggestions.length != 13){
		displayError("Can't understand Warren")
		return
	}
	INTERNAL_STATE["dead_cards"] = INTERNAL_STATE["dead_cards"].concat(toPlay.split(","))
	var orderedCards = []
	for (var s = 0; s < SUITS.length; s++) {
		var suit = SUITS[s]
		for (var r = 0; r < RANKS.length; r++) {
			var rank = RANKS[r]
			orderedCards.push(rank.concat(suit))
		}
	}
	var parent = document.getElementById("right-slots")
	var cells = document.getElementsByClassName("card-slot-td")
	var targetCells = []
	for (var i = 0; i < cells.length; i++) {
		if (parent.contains(cells[i])) {
			targetCells.push(cells[i])
		}
	}
	var warrenCardCount = 0
	var offset = 0
	for (var i = 0; i < targetCells.length; i++) {
		var cell= targetCells[i]
		var handString = BLANK_CARD_SLOT
		var suggestion = suggestions[i+offset]
		if (suggestion == -1) {
			continue
		}
		handString = orderedCards[suggestions[i+offset]]
		cell.innerHTML = handString
		cell.classList.add("suit-".concat(handString[1]))
		warrenCardCount += 1
	}
	drawNextCardSlots(3)
	displayError("")
}


function autoUpdate() {
	const request = new XMLHttpRequest();
	var url = "http://localhost:80"
	request.open("GET", url);
	request.send();
	request.onreadystatechange = (e) => {
		if (request.responseText.length == 0){
			return
		}
		var data = JSON.parse(request.responseText);
		drawCardPicker()
		drawCardSlots("left")
		drawCardSlots("right")
		drawNextCardSlots(5)
		var typeToCardObjects = {
			"villain_left": [],
			"villain_right": [],
			"hero_main": [],
			"hero_new": [],
		}
		for (var i = 0; i < data.length; i++) {
			typeToCardObjects[data[i]["type"]].push(data[i])
			killCardInPicker(data[i]["card"])
		}

		var typeToParentID = {
			"villain_right": "left-slots",
			"villain_left": "left-slots",
			"hero_main": "right-slots",
			"hero_new": "next-cards",
		}
		for (var k in typeToCardObjects) {
			fillCardSlots(typeToParentID[k], typeToCardObjects[k])
		}
	}
}


function fillCardSlots(parentID, cardObjects) {
	if (cardObjects.length == 0) {
		return
	}
	var parent = document.getElementById(parentID)
	var cells = document.getElementsByClassName("card-slot-td")
	var targetCells = []
	for (var i = 0; i < cells.length; i++) {
		if (parent.contains(cells[i])) {
			targetCells.push(cells[i])
		}
	}
	for (var i = 0; i < cardObjects.length; i++) {
		var elem = {}
		var cell = targetCells[i]
		var handString = cardObjects[i]["card"]
		if (handString.length == 0){
			continue
		}
		cell.innerHTML = handString
		cell.classList.add("suit-".concat(handString[1]))
	}
}


function displayError(errorString) {
	console.log(errorString)
	document.getElementById("errors").innerHTML = errorString
}

function getPassword() {
	return document.getElementById("code").value
}


pressedKeys = {};
window.onkeyup = function(e) { pressedKeys[e.keyCode] = false; }
window.onkeydown = function(e) { pressedKeys[e.keyCode] = true; }
