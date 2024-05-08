function log(value) {
  console.log(value);
}
let emojis;
let baseEmoji;
let codes;
let success;
let intervalId;
let attempts;
let interval;
let resetButton;
let timeElement
let attemptsElement

addEventListener("load", getStarted);

function resetVaribles() {
  emojis = Array.from(document.querySelectorAll(".emoji"));
  emojis.forEach((emoji) => {
    emoji.innerText = '...';
  })
  resetButton = document.getElementById("reset-button");
  resetButton.addEventListener('click', getStarted)
  resetButton.disabled = true;
  baseEmoji = document.getElementById("base-emoji");
  baseEmoji.innerText = '...';
  attemptsElement = document.getElementById("attempts")
  attemptsElement.innerText = 'Attempts: '
  timeElement = document.getElementById("time")
  timeElement.innerText = 'Time Elapsed: '
  codes = [];
  success = false;
  attempts = 0;
  interval = 100;
}

async function getCodes() {
  try {
    const response = await fetch("./webScraper2.php");
    const retreivedCodes = await response.json();
    return retreivedCodes;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function getStarted() {
  resetVaribles();
  try {
    codes = await getCodes();
    baseEmoji.innerText = codes["a" + Math.ceil(Math.random() * Object.keys(codes).length).toString()];
    emojis.forEach((emoji) => {
      emoji.innerText =codes["a" + Math.ceil(Math.random() * Object.keys(codes).length).toString()];
        if(emoji.classList.contains("finished")) emoji.classList.remove("finished")
      emoji.classList.add("in-works");
    });
    intervalId = setInterval(generateEmojis, interval);
  } catch (error) {
    console.error("Error:", error);
  }
}

function generateEmojis() {
  attempts++;
  if (emojis.length !== 0) {
    emojis.forEach((emoji) => {
      let index = Math.ceil(Math.random() * Object.keys(codes).length);
      emoji.innerText = codes["a" + index];
    });
  } else {;
    clearInterval(intervalId);
    resetButton.disabled = false;
    timeElement.innerText += ((interval * attempts) / 1000).toString() + " seconds"
    attemptsElement.innerText += attempts.toString()
  }
  checkEmojis();
}

function checkEmojis() {
  emojis.forEach((emoji, index) => {
    if (baseEmoji.innerText === emoji.innerText) {
      emoji.classList.remove("in-works");
      emoji.classList.add("finished");
      emojis.splice(index, 1);
    }
  });
}
