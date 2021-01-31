SUITS = ["c", "d", "h", "s"]
RANKS = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"]
INTERNAL_STATE = {}
BLANK_CARD_SLOT = "_"


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
		cell.innerHTML = BLANK_CARD_SLOT
		cell.onclick = selectSlot
		row .appendChild(cell)
	}
	table.appendChild(row)
	parent.appendChild(table)
}


function selectCard(event) {
	var shouldBeSelected = null
	var elem = event.srcElement
	if (elem.classList.contains("highlighted-card")) {
		shouldBeSelected = false
	} else {
		shouldBeSelected = true
	}
	if (elem.classList.contains("dead-card")){
		shouldBeSelected = false
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
	var rank = selectedCard.id[0]
	var suit = selectedCard.id[1]
	elem.innerHTML = selectedCard.id
	elem.classList.add("suit-".concat(suit))
	selectedCard.classList.remove("highlighted-card")
	selectedCard.classList.add("dead-card")
	selectedCard.innerHTML = BLANK_CARD_SLOT
}


function main() {
	// Start with button on the left
	INTERNAL_STATE["hand_number"] = 0
	newGame()
}


function newGame() {
	INTERNAL_STATE["round"] = 1
	INTERNAL_STATE["hand_number"] += 1
	if (!warrenIsDealer()) {
		document.getElementById("left-dealer").innerHTML = "Dealer"
		document.getElementById("right-dealer").innerHTML = "_"
	} else {
		document.getElementById("left-dealer").innerHTML = "_"
		document.getElementById("right-dealer").innerHTML = "Dealer"
	}
	drawCardPicker()
	drawCardSlots("left")
	drawCardSlots("right")
	drawNextCardSlots(5)
}


function progressGame() {
	if (INTERNAL_STATE["round"] == 5+1) {
		newGame()
		return
	}
	var nextCards = getChosenCards("next-cards")
	var playerCards = getChosenCards("left-slots")
	if (cardCount(nextCards) != nextCards.length) {
		console.log("Must fill all of the next card slots")
		return
	}
	// After placing their cards, how many cards do we expext
	// to be on the button's board on the "nth" round
	// For not on the button, it lags behind by one slot
	// INTERNAL_STATE["round"] is 1 indexed
	var roundToButtonCardCount = [0, 5, 7, 9, 11, 13]
	var round = INTERNAL_STATE["round"]
	var expectedCards = null
	if (INTERNAL_STATE["hand_number"] % 2 == 1) {
		expectedCards = roundToButtonCardCount[round]
	} else {
		expectedCards = roundToButtonCardCount[round-1]
	}
	if (cardCount(playerCards) != expectedCards) {
		console.log("Unexpected selected card count")
		return
	}
	// State is valid here. Send state to warren
	// Parse response
	// Update screen accordingly
	// 		dead cards, suggestions

	var warrenCards = getChosenCards("right-slots")
	queryWarren(playerCards, warrenCards, nextCards)
	return
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


function queryWarren(playerCards, warrenCards, nextCards) {
	const request = new XMLHttpRequest();
	var url = "http://localhost:8080/?mode=advanced&type=evaulation&gametype=Pineapple&"

	var hand1 = cardsToWarrenParams(playerCards)
	var hand2 = cardsToWarrenParams(warrenCards)
	var toPlay = cardsToWarrenParams(nextCards)

	url = url.concat("hand1=" + hand1 + "&")
	url = url.concat("hand2=" + hand2 + "&")
	url = url.concat("toplay=" + toPlay)

	request.open("GET", url);
	request.send();
	request.onreadystatechange = (e) => {
		handleWarrenResponse(request.responseText)
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


function handleWarrenResponse(responseText){
	var suggestions = responseText.split(",")
	if (suggestions.length != 26){
		console.log("Unparseable warren response")
		return
	}
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
	if (suggestions.length != 2*targetCells.length) {
		console.log("Something went wrong")
		return
	}
	var warrenCardCount = 0
	var offset = 0
	if (!warrenIsDealer()) {
		offset = 13
	}
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
	INTERNAL_STATE["round"] = {
		5: 2,
		7: 3,
		9: 4,
		11: 5,
		13: 6,
	}[warrenCardCount]
	var roundToNextCardSlots = [null, 5, 3, 3, 3, 3, 5, 5]
	drawNextCardSlots(roundToNextCardSlots[INTERNAL_STATE["round"]])
	document.getElementById("round-number").innerHTML = INTERNAL_STATE["round"]
}

function warrenIsDealer() {
	return INTERNAL_STATE["hand_number"] % 2 == 0
}
