const timerDisplay = document.getElementById("timer");
const scrambleDisplay = document.getElementById("scramble");

let startTime = null;
let timerInterval = null;
let running = false;

const moves = ["U", "D", "L", "R", "F", "B"];
const suffixes = ["", "'", "2"];

function generateScramble(length = 20) {
  let scramble = [];
  let lastMove = "";

  while (scramble.length < length) {
    const move = moves[Math.floor(Math.random() * moves.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    if (move !== lastMove) {
      scramble.push(move + suffix);
      lastMove = move;
    }
  }

  return scramble.join(" ");
}

function updateScramble() {
  scrambleDisplay.textContent = generateScramble();
}

function updateTimerDisplay(ms) {
  let seconds = ms / 1000;
  timerDisplay.textContent = seconds.toFixed(2);
}

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    updateTimerDisplay(elapsed);
  }, 10);
}

function stopTimer() {
  clearInterval(timerInterval);
  const finalTime = Date.now() - startTime;
  updateTimerDisplay(finalTime);
  running = false;
  updateScramble();
}

let keysPressed = new Set();

window.addEventListener("keydown", (e) => {
  keysPressed.add(e.key);

  if (keysPressed.has("Shift") && keysPressed.has(" ")) {
    if (!running) {
      running = true;
      startTimer();
    } else {
      stopTimer();
    }
  }
});

window.addEventListener("keyup", (e) => {
  keysPressed.delete(e.key);
});

updateScramble();