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
  let title = fileLines[1].split(", ")[1];
  title = title.split(`\\`).slice(0, title.split(`\\`).length - 1).join('\\');
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
  document.getElementById('trainer-board').innerHTML = formatBoard(board);
  const controlsContainer = document.getElementById('trainer-controls');
  controlsContainer.innerHTML = "";
  let totalFreqCounter = 0;
  function handleSliderMove(e) {
    // If there are only 2 actions, we can just update the other one 
    // such that they both are 100%
    if (state.actions.length === 2) {
      const newValue = e.srcElement.value;
      const updatedID = e.srcElement.id;
      for (let i = 0; i < 2; i++) {
        const sliderID = `slider-id-${i}`;
        if (sliderID !== updatedID) {
          const otherSlider = document.getElementById(sliderID);
          otherSlider.value = 100 - newValue;
        }
      }
    }

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
    slider.classList.add('slider')
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
  nextButton.value = "Next";
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
    const sliderID = `slider-id-${state.actions.indexOf(action)}`;
    const sliderDisplay = document.getElementById(`${sliderID}-display`);
    chosenFrequencies[action] = parseInt(sliderDisplay.innerHTML.replace("%", ""));
  }
  const solverFrequencies = {};
  const diffs = {};
  let isCorrect = true;
  for (const action of state.actions) {
    const frequencyColumnIndex = state.actionToColumnIndex[action];
    const frequencyString = rowData[frequencyColumnIndex].replace('\r', '');
    const frequency = Math.round(parseFloat(frequencyString));
    solverFrequencies[action] = frequency;
    const diff = chosenFrequencies[action] - frequency;
    if (Math.abs(diff) > getAccuracyThreshold()) {
      isCorrect = false;
    }
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
  tableRow.classList.add(isCorrect? 'correct-row' : 'incorrect-row');
  const boardElement = document.createElement('td')
  boardElement.innerHTML = formatBoard(board);
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
  const lines = [];
  for (let action of state.actions) {
    const result = ob[action]
    action = action.replace("BET ", 'b')
    action = action.replace("CHECK", 'x')
    action = action.replace("CALL", 'c')
    action = action.replace("RAISE ", 'r')
    action = action.replace("FOLD ", 'f')
    let prefix = ''
    let suffix = '';
    if (result.toString().includes("+")) {
      prefix = `<span class="too-high-result">`
      suffix =  `</span>`;
    }
    if (result.toString().includes("-")) {
      prefix = `<span class="too-low-result">`
      suffix =  `</span>`;
    }
    lines.push(`${prefix}${action}: ${result}%${suffix}`)
  }
  return lines.join("<br/>")
}

function formatBoard(boardString) {
  const components = boardString.split(" ");
  const newComponents = [];
  for (const card of components) {
    if (card[1] === 'c') {
      newComponents.push(`<span class="club">${card[0]} </>`)
    }
    if (card[1] === 's') {
      newComponents.push(`<span class="spade">${card[0]} </>`)
    }
    if (card[1] === 'h') {
      newComponents.push(`<span class="heart">${card[0]} </>`)
    }
    if (card[1] === 'd') {
      newComponents.push(`<span class="diamond">${card[0]} </>`)
    }
  }
  return newComponents.join("")
}

function getAccuracyThreshold() {
  const result = parseInt(document.getElementById('accuracy-threshold').innerHTML)
  if (isNaN(result)) {
    return 10;
  }
  return result;
}