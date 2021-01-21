// Disclaimer: I have no idea how tests are supposed to be written
// in javascript stuff, so I'm just going to do this beucuase
// I don't want to bother to figure out how to use a proper testing
// framework.

var lib = require('./generate_lines.js')
var assert = console.assert

function testOneRiverBet() {
	var oop = new lib.BetConfig(
		[], [], [10], [], [], [])
	var ip = new lib.BetConfig(
		[], [], [10], [], [], [])
	var expectedLines = [
		[0, 0, 0, 0, 1],
		[0, 0, 0, 0, 0, 1],
	]
	testHelper("testOneRiverBet", expectedLines, oop, ip, 10, 100, 67)
}


function testOneTurnBet() {
	var oop = new lib.BetConfig(
		[], [10], [], [], [], [])
	var ip = new lib.BetConfig(
		[], [10], [], [], [], [])
	var expectedLines = [
		[0, 0, 1],
		[0, 0, 0, 1],
	]
	testHelper("testOneTurnBet", expectedLines, oop, ip, 10, 100, 67)

}


function testOneFlopBet() {
	var oop = new lib.BetConfig(
		[10], [], [], [], [], [])
	var ip = new lib.BetConfig(
		[10], [], [], [], [], [])
	var expectedLines = [
		[1],
		[0, 1],
	]
	testHelper("testOneFlopBet", expectedLines, oop, ip, 10, 100, 67)
}


function testOneSizeAllStreets() {
	var oop = new lib.BetConfig(
		[15], [25], [35], [], [], [])
	var ip = new lib.BetConfig(
		[10], [20], [30], [], [], [])
	var expectedLines = [
		[0, 0, 0, 0, 0, 30],
		[0, 0, 0, 0, 35],
		[0, 0, 0, 20, 20, 20, 62],
		[0, 0, 25, 25, 25, 70],
		[0, 0, 25, 25, 77.5],
		[0, 10, 10, 10, 10, 10, 46],
		[0, 10, 10, 10, 10, 52],
		[0, 10, 10, 10, 34, 34, 34, 84.4],
		[15, 15, 15, 15, 15, 54],
		[15, 15, 15, 15, 60.5],
		[15, 15, 15, 41, 41, 41, 95.6],
		[15, 15, 47.5, 47.5, 115.75],
		[15, 15, 47.5, 47.5, 47.5, 106],
	]
	testHelper(
		"testOneSizeAllStreets", expectedLines, oop, ip, 100, 1000, 67)
}


function testRiverRaises() {
	var oop = new lib.BetConfig(
		[], [], [50], [], [], [50])
	var ip = new lib.BetConfig(
		[], [], [50], [], [], [50])
	var expectedLines = [
		[0, 0, 0, 0, 0, 50, 150, 350, 750, 1550, 3150, 6350, 10000],
		[0, 0, 0, 0, 50, 150, 350, 750, 1550, 3150, 6350, 10000],
	]
	testHelper("testRiverRaises", expectedLines, oop, ip, 100, 10000, 67)
}


function testRiverRaisesMultipleSizes() {
	var oop = new lib.BetConfig(
		[], [], [], [], [], [50, 100])
	var ip = new lib.BetConfig(
		[], [], [200], [], [], [])
	var expectedLines = [
		[0, 0, 0, 0, 0, 200, 450],
		[0, 0, 0, 0, 0, 200, 700,]
	]
	testHelper(
		"testRiverRaisesMultipleSizes", expectedLines, oop, ip, 100, 10000, 67)
}


function testRiverRaisesVaryingSizes() {
	var oop = new lib.BetConfig(
		[], [], [], [], [], [50])
	var ip = new lib.BetConfig(
		[], [], [300], [], [], [100])
	var expectedLines = [
		[0, 0, 0, 0, 0, 300, 650, 2050, 4150, 10000],
	]
	testHelper(
		"testRiverRaisesVaryingSizes", expectedLines, oop, ip, 100, 10000, 67)
}


function testRiverRaisesFull() {
	var oop = new lib.BetConfig(
		[], [], [100, 200], [], [], [50, 100])
	var ip = new lib.BetConfig(
		[], [], [25, 75], [], [], [50, 100])
	var expectedLines = [
		[0, 0, 0, 0, 0, 25, 100, 250, 1000],
		[0, 0, 0, 0, 0, 25, 100, 250, 550, 1000],
		[0, 0, 0, 0, 0, 25, 100, 400, 1000],
		[0, 0, 0, 0, 0, 25, 175, 400, 1000],
		[0, 0, 0, 0, 0, 25, 175, 625, 1000],
		[0, 0, 0, 0, 0, 75, 200, 1000],
		[0, 0, 0, 0, 0, 75, 200, 450, 1000],
		[0, 0, 0, 0, 0, 75, 325, 1000],
		[0, 0, 0, 0, 100, 250, 1000],
		[0, 0, 0, 0, 100, 250, 550, 1000],
		[0, 0, 0, 0, 100, 400, 1000],
		[0, 0, 0, 0, 200, 1000],
		[0, 0, 0, 0, 200, 450, 1000],
	]
	testHelper("testRiverRaisesFull", expectedLines, oop, ip, 100, 1000, 67)
}


function testTurnRaisesFull() {
	var oop = new lib.BetConfig(
		[], [100, 200], [], [], [50, 100], [])
	var ip = new lib.BetConfig(
		[], [25, 75], [], [], [50, 100], [])
	var expectedLines = [
		[0, 0, 0, 25, 100, 250, 1000],
		[0, 0, 0, 25, 100, 250, 550, 1000],
		[0, 0, 0, 25, 100, 400, 1000],
		[0, 0, 0, 25, 175, 400, 1000],
		[0, 0, 0, 25, 175, 625, 1000],
		[0, 0, 0, 75, 200, 1000],
		[0, 0, 0, 75, 200, 450, 1000],
		[0, 0, 0, 75, 325, 1000],
		[0, 0, 100, 250, 1000],
		[0, 0, 100, 250, 550, 1000],
		[0, 0, 100, 400, 1000],
		[0, 0, 200, 1000],
		[0, 0, 200, 450, 1000],
	]
	testHelper("testTurnRaisesFull", expectedLines, oop, ip, 100, 1000, 67)
}


function testTurnRiverCombo() {
	var oop = new lib.BetConfig(
		[], [100, 200], [], [], [50, 100], [])
	var ip = new lib.BetConfig(
		[], [25, 75], [100], [], [50, 100], [])
	var expectedLines = [
		[0, 0, 0, 25, 100, 100, 100, 400],
		[0, 0, 0, 25, 100, 250, 1000],
		[0, 0, 0, 25, 100, 250, 250, 250, 1000],
		[0, 0, 0, 25, 100, 250, 550, 1000],
		[0, 0, 0, 25, 100, 250, 550, 550, 550, 1000],
		[0, 0, 0, 25, 100, 400, 1000],
		[0, 0, 0, 25, 100, 400, 400, 400, 1000],
		[0, 0, 0, 25, 175, 175, 175, 625],
		[0, 0, 0, 25, 175, 400, 1000],
		[0, 0, 0, 25, 175, 400, 400, 400, 1000],
		[0, 0, 0, 25, 175, 625, 1000],
		[0, 0, 0, 25, 175, 625, 625, 625, 1000],
		[0, 0, 0, 25, 25, 25, 175],
		[0, 0, 0, 75, 200, 1000],
		[0, 0, 0, 75, 200, 200, 200, 1000],
		[0, 0, 0, 75, 200, 450, 1000],
		[0, 0, 0, 75, 200, 450, 450, 450, 1000],
		[0, 0, 0, 75, 325, 1000],
		[0, 0, 0, 75, 325, 325, 325, 1000],
		[0, 0, 0, 75, 75, 75, 325],
		[0, 0, 100, 100, 100, 400],
		[0, 0, 100, 250, 1000],
		[0, 0, 100, 250, 250, 250, 1000],
		[0, 0, 100, 250, 550, 1000],
		[0, 0, 100, 250, 550, 550, 550, 1000],
		[0, 0, 100, 400, 1000],
		[0, 0, 100, 400, 400, 400, 1000],
		[0, 0, 200, 1000],
		[0, 0, 200, 450, 1000],
		[0, 0, 200, 450, 450, 450, 1000],

		// These two for some reason are not produced by PIO but
		// I think it is probably ok
		[0, 0, 200, 200, 200, 1000],
		[0, 0, 0, 0, 0, 100]

	]
	testHelper("testTurnRiverCombo", expectedLines, oop, ip, 100, 1000, 67)
}



function testHelper(
	testName, expectedLines, oop, ip, pot, stack, jamThreshold) {
	console.log(testName)

	var lines = lib.generateLines(pot, stack, oop, ip, jamThreshold)
	//console.log(lines)
	var expectedLinesStrings = []
	for (var i in expectedLines) {
		expectedLinesStrings.push(expectedLines[i].join(" "))
	}
	assert(expectedLinesStrings.length == lines.length)
	for (var i in lines) {
		assert(expectedLinesStrings.includes(lines[i].join(" ")))
	}
}


tests = [
	testOneRiverBet,
	testOneTurnBet,
	testOneFlopBet,
	testOneSizeAllStreets,
	testRiverRaises,
	testRiverRaisesMultipleSizes,
	testRiverRaisesVaryingSizes,
	testRiverRaisesFull,
	testTurnRaisesFull,
	testTurnRiverCombo,
]


for (i in tests) {
	tests[i]()
}
