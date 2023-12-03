const cell = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;
let scoreX = 0;
let scoreO = 0;

initializeGame();

function initializeGame() {
  cell.forEach((cell) => cell.addEventListener("click", cellClicked));
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
}

function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex");

  if (options[cellIndex] != "" || !running) {
    return;
  }
  updateCell(this, cellIndex);
  checkWinner();

  playClickSound();
}

function playClickSound() {
  const clickSound = document.getElementById("clickSound");
  clickSound.currentTime = 0; // Reset sound to the beginning
  clickSound.play();
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      roundWon = true;
      winningCells = condition;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `${currentPlayer} wins!`;
    highlightWinningCells(winningCells);
    playWinSound();
    updateScore();
    running = false;
  } else if (!options.includes("")) {
    statusText.textContent = `Draw!`;
    running = false;
  } else {
    changePlayer();
  }
}

function highlightWinningCells(cells) {
  cells.forEach((index) => {
    cell[index].classList.add("win");
  });
}

function playWinSound() {
  const winSound = document.getElementById("winSound");
  winSound.currentTime = 0;
  winSound.play();
}

function restartGame() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${currentPlayer}'s turn`;
  cell.forEach((cell) => cell.classList.remove("win"));
  cell.forEach((cell) => (cell.textContent = ""));
  running = true;
}

function updateScore() {
  if (currentPlayer === "X") {
    scoreX++;
  } else {
    scoreO++;
  }

  const scoreXElement = document.getElementById("scoreX");
  const scoreOElement = document.getElementById("scoreO");

  scoreXElement.textContent = `Score X: ${scoreX}`;
  scoreOElement.textContent = `Score O: ${scoreO}`;
}
function refreshPage() {
            location.reload(true);
}
