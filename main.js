/*
  Advices
  - Always Check The Console
  - Take Your Time To Name The Identifiers
  - DRY

  Steps To Create The Project
  [01] Create HTML Markup
  [02] Add Styling And Separate From Logic
  [03] Create The App Logic
  ---- [01] Add Levels
  ---- [02] Show Level And Seconds
  ---- [03] Add Array Of Words
  ---- [04] ِAdd Start Game Button
  ---- [05] Generate Upcoming Words
  ---- [06] Disable Copy Word And Paste Event + Focus On Input
  ---- [07] Start Play Function
  ---- [08] Start The Time And Count Score
  ---- [09] Add The Error And Success Messages
  [04] Your Trainings To Add Features
  ---- [01] Save Score To Local Storage With Date
  ---- [02] Choose Levels From Select Box
  ---- [03] Break The Logic To More Functions
  ---- [04] Choose Array Of Words For Every Level
  ---- [05] Write Game Instruction With Dynamic Values
  ---- [06] Add 3 Seconds For The First Word
*/

// Array Of Words
const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing"
];

// Setting Levels
const lvls = {
  "Easy": 5,
  "Normal": 3,
  "Hard": 2
};


// Catch Selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");

// Default Level
let defaultLevelName = "Normal"; // Change Level From Here
let defaultLevelSeconds = lvls[defaultLevelName] + 3;
timeLeftSpan.innerHTML = defaultLevelSeconds;
if (words.length == 30) {
  document.getElementById("cars").oninput = function () {
    defaultLevelName = `${document.querySelector("select").selectedOptions[0].value}`;
    defaultLevelSeconds = lvls[defaultLevelName];
    lvlNameSpan.innerHTML = defaultLevelName;
    secondsSpan.innerHTML = defaultLevelSeconds + 3;
    timeLeftSpan.innerHTML = defaultLevelSeconds + 3;
    scoreTotal.innerHTML = words.length;
  }
  console.log(22);
} else {
timeLeftSpan.innerHTML = defaultLevelSeconds;
document.getElementById("cars").oninput = function () {
  defaultLevelName = `${document.querySelector("select").selectedOptions[0].value}`;
  defaultLevelSeconds = lvls[defaultLevelName];
  lvlNameSpan.innerHTML = defaultLevelName;
  secondsSpan.innerHTML = defaultLevelSeconds;
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  scoreTotal.innerHTML = words.length;
}
}
// Setting Level Name + Seconds + Score
// lvlNameSpan.innerHTML = defaultLevelName;
// secondsSpan.innerHTML = defaultLevelSeconds;
// timeLeftSpan.innerHTML = defaultLevelSeconds;
// scoreTotal.innerHTML = words.length;

// Disable Paste Event
input.onpaste = function () {
  return false;
}

// Start Game
startButton.onclick = function () {
  this.remove();
  input.focus();
  // Generate Word Function
  genWords();
}

function genWords() {
  // Get Random Word From Array
  let randomWord = words[Math.floor(Math.random() * words.length)];
  // Get Word Index
  let wordIndex = words.indexOf(randomWord);
  // Remove WordFrom Array
  words.splice(wordIndex, 1);
  // Show The Random Word
  theWord.innerHTML = randomWord;
  // Empty Upcoming Words
  upcomingWords.innerHTML = '';
  // Generate Words
  for (let i = 0; i < words.length; i++) {
    // Create Div Element
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  // Call Start Play Function
  startPlay();
}

function startPlay() {
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      // Stop Timer
      clearInterval(start);
      // Compare Words
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        // Empty Input Field
        input.value = '';
        // Increase Score
        scoreGot.innerHTML++;
        // save the score in local storage
        saveTheScore();
        if (words.length > 0) {
          // Call Generate Word Function
          genWords();
        } else {
          // save the score in local storage
          saveTheScore();
          let span = document.createElement("span");
          span.className = 'good';
          let spanText = document.createTextNode("Congratz");
          span.appendChild(spanText);
          finishMessage.appendChild(span);
          // Remove Upcoming Words Box
          upcomingWords.remove();
        }
      } else {
        // save the score in local storage
        saveTheScore();
        let span = document.createElement("span");
        span.className = 'bad';
        let spanText = document.createTextNode("Game Over");
        span.appendChild(spanText);
        finishMessage.appendChild(span);
        topScore();
      }
    }
  }, 1000);
}
function saveTheScore () {
  window.localStorage.setItem(`
  ${new Date().getDate()}-
  ${new Date().getMonth()}-
  ${new Date().getFullYear()}
  `,`${scoreGot.innerHTML}`);
}
function topScore () {
  let div = document.createElement("div");
  div.className = "top-score";
  let theKey = window.localStorage.getItem(`
  ${new Date().getDate()}-
  ${new Date().getMonth()}-
  ${new Date().getFullYear()}
  `,`${scoreGot.innerHTML}`);
  div.innerHTML = `Last Score is : ${theKey}`
  document.querySelector(".game").appendChild(div);
}
// window.localStorage.clear();