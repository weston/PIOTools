const state = {
  dataRows: [],
  title: String,
  actionToColumnIndex: {},
  actions: [],
  filename: String,
  columns: [],
  results: [],
};



function init() {
  const fileSelector = document.getElementById('file-selector');
  fileSelector.addEventListener('change', (event) => {
    const fileList = event.target.files;
    const fileReader = new FileReader(); 
    fileReader.readAsText(fileList[0])
    fileReader.onload = function() {
      initDrills(fileList[0].name, fileReader.result);
      newDrill();
    }; 
    fileReader.onerror = function() {
      alert(fileReader.error);
    }; 
  });
}

// filename is string
// fileContents is a PIOSolver CSV string
function initDrills(filename, fileContents) {
  // Add filename to cookies
  fileContents = fileContents.replace(/\r/g, "");
  const fileLines = fileContents.split("\n");
  const title = fileLines[1].split(", ")[1];
  const columns = fileLines[3].split(",");
  const actions = [];
  document.getElementById("trainer-title").innerHTML = title;
  const actionToColumnIndex = {};
  for (let i = 0; i < columns.length; i++) {
    if (columns[i].includes(' freq')) {
      const actionLabel = columns[i].replace(" freq", "");
      actionToColumnIndex[actionLabel] = i;
      actions.push(actionLabel);
    }
  }

  // First few rows are meta data, last row is averages
  const dataRows = fileLines.slice(4, fileLines.length - 2);
  state.dataRows = dataRows;
  state.title = title;
  state.actionToColumnIndex = actionToColumnIndex;
  state.filename = filename;
  state.columns = columns;
  state.actions = actions;
}

function newDrill() {
  const index = Math.floor(Math.random() * state.dataRows.length);
  const chosenRow = state.dataRows[index].split(",");
  const flop = chosenRow[state.columns.indexOf('Flop')]
  const turn = state.columns.indexOf('Turn') >= 0 ? ' ' + chosenRow[state.columns.indexOf('Turn')] : '';
  const river= state.columns.indexOf('River') >= 0 ? ' ' + chosenRow[state.columns.indexOf('River')] : '';
  const board = flop + turn + river;
  document.getElementById('trainer-board').innerHTML = board;
  const controlsContainer = document.getElementById('trainer-controls');
  controlsContainer.innerHTML = "";
  let totalFreqCounter = 0;
  function handleSliderMove(e) {
    // Update display percentages
    // Make sure that everything sums up to 100
    let total = 0;
    for (let i = 0; i < state.actions.length; i++) {
      const sliderID = `slider-id-${i}`;
      const slider = document.getElementById(sliderID);
      total += parseInt(slider.value);
    }
    // Iterate backwards through the sliders, and increase/decrease them until
    // the excess is handled.
    for (let i = 0; i < state.actions.length; i++) {
      const sliderID = `slider-id-${i}`;
      const slider = document.getElementById(sliderID);
      const percentage = Math.round(100 * (1.0 * parseInt(slider.value) / total), 2)
      document.getElementById(`${sliderID}-display`).innerHTML = `${percentage}%`;
    }
  }

  for (const actionLabel of state.actions) {
    const isLast = actionLabel === state.actions[state.actions.length - 1]
    const sliderContainer = document.createElement("div");
    const slider = document.createElement('input');
    slider.type = "range";
    slider.min = 0;
    slider.max = 100;
    if (isLast) {
      slider.value = 100 - totalFreqCounter;
    } else {
      slider.value = Math.round(100 / state.actions.length);
      totalFreqCounter += parseInt(slider.value);
    }
    slider.id = `slider-id-${state.actions.indexOf(actionLabel)}`;
    sliderContainer.innerHTML += actionLabel + ' ';
    sliderContainer.appendChild(slider);

    const freqDisplay = document.createElement("span");
    freqDisplay.id = slider.id + '-display';
    freqDisplay.innerHTML = `${slider.value}%`;
    sliderContainer.innerHTML += "  "
    sliderContainer.appendChild(freqDisplay)

    sliderContainer.innerHTML += "<br/> <br/>"
    controlsContainer.appendChild(sliderContainer)
  }

  // For some reason, we have to add this outside of the loop
  for (let i = 0; i < state.actions.length; i++) {
    const e = document.getElementById(`slider-id-${i}`)
    e.oninput = handleSliderMove;
  }
  const nextButton = document.createElement('input')
  nextButton.value = "Submit";
  nextButton.type = "button";
  nextButton.onclick = function() {
    appendResults(board, chosenRow);
    newDrill();
  }
  controlsContainer.appendChild(nextButton);
}

function appendResults(board, rowData) {
  const chosenFrequencies = {};
  for (const action of state.actions) {
    const slider = document.getElementById(`slider-id-${state.actions.indexOf(action)}`)
    chosenFrequencies[action] = parseInt(slider.value);
  }
  const solverFrequencies = {};
  const diffs = {};
  for (const action of state.actions) {
    const frequencyColumnIndex = state.actionToColumnIndex[action];
    const frequencyString = rowData[frequencyColumnIndex].replace('\r', '');
    const frequency = Math.round(parseFloat(frequencyString));
    solverFrequencies[action] = frequency;
    const diff = chosenFrequencies[action] - frequency;
    if (diff > 0) {
      diffs[action] = `+${diff}`
    } else if (diff < 0) {
      diffs[action] = `${diff}`
    } else {
      diffs[action] = "0";
    }
  }
  const resultsTable = document.getElementById('results-table-entries');
  const tableRow = resultsTable.insertRow(1)
  const boardElement = document.createElement('td')
  boardElement.innerHTML = board;
  tableRow.appendChild(boardElement);

  const gtoElement = document.createElement('td')
  gtoElement.innerHTML = formatObject(solverFrequencies);
  tableRow.appendChild(gtoElement);
 
  const heroElement = document.createElement('td');
  heroElement.innerHTML = formatObject(chosenFrequencies);
  tableRow.appendChild(heroElement);

  const diffElement = document.createElement('td');
  diffElement.innerHTML = formatObject(diffs);
  tableRow.appendChild(diffElement);
}

function formatObject(ob) {
  let obString = JSON.stringify(
    ob).replace(/"/g, "").replace(":", ": ");
  obString = obString.replace(/{/g, '').replace(/}/g, '')
  obString = obString.replace(/BET /g, 'b').replace(/RAISE /g, 'r')
  obString = obString.replace(/CHECK/g, 'x').replace(/FOLD/g, 'f')
  obString = obString.replace(/,/g, ', ')

  return obString;
}