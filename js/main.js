//
// Requires generate_lines.js, pioscript.js, and parse.js to work
//


function init(){
    document.getElementById('file-input').addEventListener('change', handleFileSelect, false);
}


function handleFileSelect(event){
    const reader = new FileReader()
    reader.onload = function(event) {
        document.getElementById("uploaded-file").innerHTML = event.target.result
    }
    reader.readAsText(event.target.files[0])
}


function parse() {
	var outputDirectory = document.getElementById("output-directory").value
    var hhText = document.getElementById("uploaded-file").innerHTML
    var hands = hhText.split("\n\n")
    var parsedHands = [];
    for (var i = 0; i < hands.length-1; i++) {
		var parsedHand = new HandHistory(hands[i])
		if (!["SRP", "3BP"].includes(parsedHand.preflopType())){
			console.log(parsedHand.preflopType(), "hands are not supported")
			continue
		}
		if (parsedHand.activeUsernames().length != 2 ){
			console.log("Only hands that are HU OTF are supported")
			continue
		}
		if (parsedHand.preflopType() == "SRP" &&
			!parsedHand.activePositions().includes("BB")){
			console.log("Only SRP hands including the BB are supported")
			continue
		}
		if (parsedHand.flop == null) {
			console.log("Didn't see the flop. Ignoring...")
			continue
		}
		parsedHands.push(parsedHand)

    }
	var outputElem = document.getElementById("script-output")
	outputElem.innerHTML = ""
	for (var i = 0; i < parsedHands.length; i++) {
		var filename = parsedHands[i].flop.join("").concat(".cfr")
		var outputFile = outputDirectory.concat("\\").concat(filename)
		var script = new PIOScript(parsedHands[i], outputFile)
		outputElem.innerHTML += script.getScript()
		outputElem.innerHTML += "\n"
	}
}
