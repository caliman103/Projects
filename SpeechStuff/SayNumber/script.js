function log(value) {
  console.log(value);
}
addEventListener("load", (e) => {
  let fireworks = document.querySelectorAll(".firework");
  let number = document.getElementById("number-label");
  let numberButton = document.getElementById("new-number-button");
  newNumber();
  hide_fireworks();
  function newNumber() {
    number.innerText = String(Math.floor(Math.random() * 21));
  }
  function display_fireworks() {
    fireworks.forEach((firework) => {
      firework.style.display = "block";
    });
  }

  function hide_fireworks() {
    fireworks.forEach((firework) => {
      firework.style.display = "none";
    });
  }

  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new window.SpeechRecognition();
  recognition.interimResults = true;

  numberButton.addEventListener("click", (e) => {
    newNumber();
    number.style.color = "white";
    numberButton.style.display = "none";
    hide_fireworks();
  });

  addEventListener("keyup", (e) => {});

  recognition.addEventListener("result", (e) => {
    const transcript = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");

    //  const pattern = new RegExp(`${number.innerText}`, "i");
    log(transcript);

    if (transcript === number.innerText) {
      number.style.color = "green";
      numberButton.style.display = "inline";
      display_fireworks();
    }
  });

  recognition.addEventListener("end", recognition.start);

  recognition.start();
});
