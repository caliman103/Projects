function log(value) {
  console.log(value);
}

let numbersToGenerate;
let numbers;
let interval;
let appState;
let mainContent;
let answerField;
let events;

addEventListener("load", function () {
  mainContent = document.getElementById("main-content");
  answerField = document.getElementById("answer-field");
  appState = "startState";
  events = updateEvents();
  numbersToGenerate = 5;
  numbers = [];
  interval = 1200;
  document.addEventListener("keyup", handleInput);
});

function startState() {
  if (appState === "startState") {
    document.removeEventListener("keyup", handleInput);
    showState();
  }
}

function showState() {
  numbers[0] = Math.floor(Math.random() * 10 + 1);
  for (let i = 1; i < numbersToGenerate; i++) {
    do {
      numbers[i] = Math.floor(Math.random() * 10 + 1);
    } while (numbers[i] === numbers[i - 1]);
  }
  log(numbers);

  let index = 0;
  updateNumber();

  const intervalId = setInterval(updateNumber, interval);
  setTimeout(function () {
    mainContent.innerText = "What is the Sum?";
    appState = "checkState";
    removeCssClass(answerField, "hidden");
    answerField.classList.add("visible");
    clearInterval(intervalId);
    appState = "resultState";
    document.addEventListener("keyup", handleInput);
  }, interval * numbersToGenerate);

  function updateNumber() {
    if (index >= numbers.length) {
      return;
    }
    mainContent.innerText = numbers[index];
    index++;
  }
}

async function resultState() {
  if (appState === "resultState") {
    document.removeEventListener("keyup", handleInput);
    removeCssClass(answerField, "visible");
    answerField.classList.add("hidden");
    let sum = numbers.reduce((a, b) => a + b, 0);
    log(sum + " => " + answerField.value);
    if (sum === parseInt(answerField.value)) {
      mainContent.innerText = "Correct, Good Job!";
    } else {
      mainContent.innerText = "Incorrect, correct answer was " + sum;
    }
    answerField.value = "";
    await delay(5000);
    appState = "startState";
    mainContent.innerText = "Press spacebar  to start";
    document.addEventListener("keyup", handleInput);
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function removeCssClass(element, cssClass) {
  if (element.classList.contains(cssClass)) {
    element.classList.remove(cssClass);
  }
}

function handleInput(e) {
  if (events[e.keyCode] !== undefined) {
    events[e.keyCode]();
  }
}

function updateEvents() {
  return {
    32: startState,
    13: resultState,
  };
}
