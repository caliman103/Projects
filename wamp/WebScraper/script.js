function log(value) {
  console.log(value);
}
let emojis;
let codes;

addEventListener("load", () => {
  emojis = document.querySelectorAll(".emoji");
  codes = [];
  getStarted();
});

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
  try {
    codes = await getCodes();
    setUpEmojis();
  } catch (error) {
    console.error("Error:", error);
  }
}

function getNewEmoji(e) {
  let index = Math.ceil(Math.random() * Object.keys(codes).length);
  index = "a" + index;
  e.target.innerText = codes[index];
}

async function setUpEmojis() {
  emojis.forEach((emoji) => {
    emoji.innerText =
      codes["a" + Math.ceil(Math.random() * Object.keys(codes).length).toString()];
    emoji.addEventListener("mouseover", getNewEmoji);
  });
}
