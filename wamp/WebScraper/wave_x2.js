function log(value) {
  console.log(value);
}

let emojis;
let colours;
let cycles;
let maxCycles;
let containerComplete;
let interval;
let containers;
let nextContainer;

addEventListener("load", getStarted);

async function getStarted() {
  if (emojis === undefined) emojis = await getCodes();
  colours = [
    "red",
    "green",
    "blue",
    "cyan",
    "purple",
    "black",
    "orange",
    "yellow",
    "brown",
    "magenta",
    "pink",
    "gray",
    "aqua",
    "navy",
    "gold",
    "indigo",
    "maroon",
    "olive",
    "teal",
    "violet",
    "rainbow",
  ];
  containerComplete = new CustomEvent("containerComplete");
  containers = Math.floor(Math.random() * 6 + 1);
  cycles = 0;
  maxCycles = Math.floor(Math.random() * 4 + 1) * containers * 2;
  interval = Math.floor(Math.random() * 35 + 35);
  log(containers + " => " + interval);
  Array.from(document.querySelectorAll(".emoji")).forEach((emoji, index) => {
    if (undefined === window["container" + (index % containers)]) {
      window["container" + (index % containers)] = {
        container: [],
        index: 0,
        modifier: 1,
      };
    }
    window["container" + (index % containers)].container.push(emoji);
  });
  generateEmojis(0, container0);
  addEventListener("containerComplete", sendRow);
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

async function generateEmojis(containerNumber, containerObject) {
  try {
    if (containerObject.modifier > 0) {
      let emojiIndex = Math.ceil(Math.random() * Object.keys(emojis).length);
      containerObject.container[containerObject.index].innerText =
        emojis["a" + emojiIndex];
    } else {
      containerObject.container[containerObject.index].innerText = "*";
      containerObject.container[containerObject.index].style.color =
        colours[Math.floor(Math.random() * colours.length)];
    }

    await delay(interval);
    containerObject.index += containerObject.modifier;
    if (
      (containerObject.modifier > 0 &&
        containerObject.index <= containerObject.container.length - 1) ||
      (containerObject.modifier < 0 && containerObject.index >= 0)
    ) {
      generateEmojis(containerNumber, containerObject);
    } else {
      nextContainer = containerNumber + 1;
      cycles++;
      containerObject.modifier *= -1;
      containerObject.modifier > 0
        ? (containerObject.index = 0)
        : (containerObject.index = containerObject.container.length - 1);
      dispatchEvent(containerComplete);
    }
  } catch (error) {
    console.error(error);
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function sendRow() {
  if (cycles >= maxCycles) {
    unsetContainers();
    getStarted();
  } else {
    let containerNumber = "container" + (nextContainer % containers).toString();
    generateEmojis(nextContainer % containers, window[containerNumber]);
  }
}

function unsetContainers() {
  for (let varNumber = 0; varNumber < containers; varNumber++) {
    window["container" + varNumber.toString()] = undefined;
  }
}
