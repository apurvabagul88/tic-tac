const cells = document.querySelectorAll(".gamecell");
const turnInfo = document.getElementById("turn-info");
const resetBtn = document.getElementById("reset-btn");
const resultDialog = document.getElementById("result-dialog");
const winnerMsg = document.getElementById("winner-msg");

let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]           // diagonals
];

function checkWinner() {
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      gameActive = false;
      winnerMsg.textContent = `Player ${board[a]} Wins 🎉`;
      resultDialog.showModal();
      return;
    }
  }
  if (!board.includes("")) {
    winnerMsg.textContent = "It's a Draw!";
    resultDialog.showModal();
    gameActive = false;
  }
}

function handleClick(e) {
  const cell = e.target;
  const index = cell.dataset.position;

  if (!gameActive || board[index]) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  checkWinner();
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  turnInfo.textContent = `Turn: Player ${currentPlayer}`;
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  cells.forEach(cell => cell.textContent = "");
  turnInfo.textContent = `Turn: Player ${currentPlayer}`;
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
resetBtn.addEventListener("click", resetGame);
