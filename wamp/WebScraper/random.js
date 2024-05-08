function log(value) {
  console.log(value);
}
let emojis;
let codes;
let emojiIndex;
let interval;
let intervalMax;
let intervalMin;
let change;

addEventListener("load", getStarted);

async function getStarted() {
  codes = await getCodes();
  emojis = Array.from(document.querySelectorAll(".emoji"));
  emojiIndex = 0;
  intervalMax = 100;
  intervalMin = 40;
  change = 30;
  interval = intervalMax - change;
  log(emojis);
  generateEmojis();
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
async function generateEmojis() {
  let codeIndex = Math.ceil(Math.random() * Object.keys(codes).length);
  emojis[emojiIndex].innerText = codes["a" + codeIndex];
  await delay(interval);
  emojiIndex++;
  if (emojiIndex >= emojis.length) {
    emojiIndex = 0;
    if (interval > intervalMax || interval < intervalMin) {
      change *= -1;
    }
    interval -= change;
  }
  generateEmojis();
}
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* async function myFunction() {
  console.log('Before setTimeout');
  await delay(2000); // Wait for 2000 milliseconds (2 seconds)
  console.log('After setTimeout');
} */
