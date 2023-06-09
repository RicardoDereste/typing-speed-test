const text = document.querySelector("#text");
const input = document.querySelector("#input");
const restart = document.querySelector("#restart");
const result = document.querySelector("#result");
const historic = document.querySelector("#historic");
const changeThemeBtn = document.querySelector("#changeTheme");

const texts = [
  "Believe you can, and you're halfway there.",
  "The only limit is the one you set in your mind.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "Your time is now. Start where you are, use what you have, and do what you can.",
  "Every accomplishment starts with the decision to try.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Don't wait for opportunity, create it.",
  "Your dreams don't have an expiration date. Take a deep breath and try again.",
  "The only person you should try to be better than is the person you were yesterday.",
  "You are capable of amazing things. Believe in yourself and anything is possible."
];

function newText() {
  const index = Math.floor(Math.random() * texts.length);
  text.textContent = texts[index];
}

function initiate() {
  const testStatus = JSON.parse(localStorage.getItem("testInProgress"));

  if (!testStatus) {
    localStorage.setItem("initialtime", new Date().getTime());
    localStorage.setItem("testInProgress", true);
  }
}

function check() {
  const finalTime = new Date().getTime();
  const timeSpent =
    (finalTime - parseInt(localStorage.getItem("initialtime"))) / 1000;
  result.textContent = `Congratulations! You took ${timeSpent} seconds.`;

  addTohistoric(text.textContent, timeSpent);

  localStorage.setItem("testInProgress", false);
  input.value = "";
  newText();
}

function addTohistoric(textTyped, timeSpent) {
  const itemHistoric = document.createElement("p");
  itemHistoric.textContent = `Text: "${textTyped}" - Time: ${timeSpent} seconds`;
  historic.appendChild(itemHistoric);
}

function updateTest() {
  initiate();
  if (input.value === text.textContent) {
    check();
  }
}

function restartTest() {
  input.value = "";
  result.textContent = "";
  newText();
  localStorage.setItem("testInProgress", false);
  historic.innerHTML = "";
}

function changeTheme() {
  const body = document.body;

  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
    body.classList.add("light");
  } else {
    body.classList.remove("light");
    body.classList.add("dark");
  }
}

input.addEventListener("keyup", updateTest);
restart.addEventListener("click", restartTest);

changeThemeBtn.addEventListener("click", changeTheme);

newText();
