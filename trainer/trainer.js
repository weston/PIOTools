const state = {
  dataRows: [],
  title: String,
  actionToColumnIndex: {},
  actions: [],
  filename: String,
  columns: [],
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
  const turn = state.columns.indexOf('Turn') >= 0 ? chosenRow[state.columns.indexOf('Turn')] : '';
  const river= state.columns.indexOf('River') >= 0 ? chosenRow[state.columns.indexOf('River')] : '';
  document.getElementById('trainer-board').innerHTML = flop + turn + river;
  const controlsContainer = document.getElementById('trainer-controls');

  let totalFreqCounter = 0;
  function handleSliderMove(e) {
    const sourceID = e.srcElement.id;
    const displayID = sourceID + '-display';
    document.getElementById(displayID).innerHTML = e.srcElement.value;

    // Make sure that everything sums up to 100
    let totalFreq = 0;
    for (let i = 0; i < state.actions.length; i++) {
      const sliderID = `slider-id-${i}`;
      const slider = document.getElementById(sliderID);
      totalFreq += parseInt(slider.value);
    }
    // Iterate backwards through the sliders, and increase/decrease them until
    // the excess is handled.
    for (let i = state.actions.length - 1; i >= 0; i--) {
      const sliderID = `slider-id-${i}`;
      if (sliderID === sourceID) {
        // Don't adjust the thing we just updated.
        continue;
      }
      const slider = document.getElementById(sliderID);
      if (totalFreq > 100) {
        const excess = totalFreq - 100;
        const sliderValue = parseInt(slider.value);
        slider.value = sliderValue - Math.min(sliderValue, excess);
        totalFreq -= Math.min(sliderValue, excess);
      } else if (totalFreq < 100) {
        const deficit = 100 - totalFreq ;
        const sliderValue = parseInt(slider.value);
        slider.value = sliderValue + Math.min(100-sliderValue, deficit);
        totalFreq += Math.min(sliderValue, deficit);
      } else {
        break;
      }
      document.getElementById(`${sliderID}-display`).innerHTML = slider.value;
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
      totalFreqCounter += slider.value;
    }
    slider.id = `slider-id-${state.actions.indexOf(actionLabel)}`;
    sliderContainer.innerHTML += actionLabel + ' ';
    sliderContainer.appendChild(slider);

    const freqDisplay = document.createElement("span");
    freqDisplay.id = slider.id + '-display';
    freqDisplay.innerHTML = slider.value;
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
}