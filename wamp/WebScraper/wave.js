function log(value) {
  console.log(value);
}
let emojis;
let codes;
let emojiIndex;
let interval;
let emojisArray;
let rows;
let columns;
let counter;
let indexes;
let changers;

addEventListener("load", getStarted);

async function getStarted() {
  codes = await getCodes();
  emojiIndex = 0;
  rows = Math.floor((Math.random() * 7) + 3);
  columns = Math.floor((Math.random() * 7) + 3);
  log(rows + " => " + columns)
  counter = 1;
  changers = [];
  interval = 50;
  indexes = [];
  for (let i = 0; i < rows; i++) {
    indexes.push(0);
    changers.push(-1);
  }
  emojis = {};
  Array.from(document.querySelectorAll(".emoji")).forEach((emoji, index) => {
    if (undefined === emojis["row" + ((index % rows) + 1)])
      emojis["row" + ((index % rows) + 1)] = [];
    let tempArray = emojis["row" + ((index % rows) + 1)];
    tempArray.push(emoji);
    emojis["row" + ((index % rows) + 1)] = tempArray;
  });
  const intervalID = setInterval(() => {
    generateEmojis(
      "row" + counter.toString(),
      emojis["row" + counter.toString()]
    );
    counter++;
  }, interval * columns);
  setTimeout(() => {
    clearInterval(intervalID);
  }, interval * columns * rows);
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

async function generateEmojis(rowNumber, row) {
  let index = parseInt(rowNumber.toString().slice(-1)) - 1;
  if (indexes[index] >= row.length - 1 || indexes[index] <= 0) {
    changers[index] *= -1;
  }
  
  let codeIndex = Math.ceil(Math.random() * Object.keys(codes).length);
  row[indexes[index]].innerText = codes["a" + codeIndex];
  await delay(interval);
  indexes[index] += changers[index];
  generateEmojis(rowNumber, row);
}

async function removeEmojis(rowNumber, row) {
  
}
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* async function myFunction() {
    console.log('Before setTimeout');
    await delay(2000); // Wait for 2000 milliseconds (2 seconds)
    console.log('After setTimeout');
  } */
