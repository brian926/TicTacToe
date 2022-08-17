document.addEventListener("DOMContentLoaded", () => {

  // Event listener for all the cells
  document.querySelectorAll(".cell").forEach((cell) =>
    cell.addEventListener("click", (e) => {
      gameControls.makePlay(e, player1, player2, testBoard);
    })
  );

  // Event listener for when the modal is active
  document
    .querySelector("[data-modal]")
    .addEventListener("click", displayControls.toggleModal);

  // Event listener for the new game button
  document.getElementById("new-game").addEventListener("click", () => {
    gameControls.newGameBtn(testBoard);
  });

  // Event listener for the clear scores button
  document.querySelector("#clear-scores").addEventListener("click", () => {
    gameControls.clearAllScoresBtn(player1, player2);
  });
});

class GameBoard {
  constructor() {
    this.controlBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.displayBoard = ["", "", "", "", "", "", "", "", ""];
  }
  isFull() {
    let count = 0;
    for (let i = 1; i < 10; i++) {
      if (this.controlBoard.includes(i)) {
        count++;
      }
    }
    if (count === 0) {
      return true;
    }
  }
  markBoard(play, playerMark) {
    if (this.controlBoard.includes(play)) {
      let index = this.controlBoard.findIndex((e) => e === play);
      this.controlBoard[index] = 0;
      this.displayBoard[index] = playerMark;
      return true;
    }
  }
  boardReset() {
    this.controlBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.displayBoard = ["", "", "", "", "", "", "", "", ""];
  }
}

// A player class that will hold the players marker, and all the plays that they have made
class Player {
  constructor(marker, plays = [], score = 0) {
    this.marker = marker;
    this.plays = plays;
    this.score = score;
  }
  addPlay(play) {
    this.plays.push(play);
  }
  clearPlays() {
    this.plays = [];
  }
  clearScore() {
    this.score = 0;
  }
  scoreUp() {
    this.score++;
  }
  // returns true if player has a winning hand
  didIWin() {
    const winingHands = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];
    let count = 0;
    for (let i of winingHands) {
      for (let n of i) {
        if (this.plays.includes(n)) {
          count++;
        }
      }
      if (count === 3) {
        return true;
      }
      count = 0;
    }
    return false;
  }
}

const testBoard = new GameBoard();
let currentBoard = testBoard.displayBoard;
const player1 = new Player("X");
const player2 = new Player("O");

const displayControls = (() => {
  // Updates the pages game board
  function boardUpdate(displayBoard) {
    for (let i = 0; i < displayBoard.length; i++) {
      let activeCell = document.querySelector(`[data-cell-value="${i + 1}"]`);
      activeCell.textContent = displayBoard[i];
    }
  }

  // Updates the pages score board
  function scoreUpdate(player1Score, player2Score) {
    const pXScore = document.querySelector("#player-one-score");
    const pOScore = document.querySelector("#player-two-score");
    pXScore.textContent = player1Score;
    pOScore.textContent = player2Score;
  }

  // Update the current player banner, by flipping the return from current player
  function showCurrentPlayer(currentPLayerMarker) {
    const playerSpan = document.querySelector("#current-player");
    if (currentPLayerMarker === "X") {
      playerSpan.textContent = "O";
      return;
    }
    playerSpan.textContent = "X";
  }

  // Set the Winner text in modal
  function setWinner(winningPlayerMarker) {
    const winner = document.querySelector(".winner");
    winner.textContent = `Winner: ${winningPlayerMarker}`;
  }

  // Set the Winner text in modal to Tie
  function showTie() {
    const winner = document.querySelector(".winner");
    winner.textContent = "It's a Draw!";
  }

  function toggleModal() {
    const modal = document.querySelector("[data-modal]");
    if (modal.className === "modal active") {
      modal.classList.remove("active");
      return;
    }
    modal.classList.add("active");
  }

  return {
    boardUpdate,
    scoreUpdate,
    showCurrentPlayer,
    setWinner,
    showTie,
    toggleModal,
  };
})();

const gameControls = (() => {
  // Toggle between the given players
  let playCounter = 1;
  function togglePlayer(player1, player2) {
    playCounter++;
    if (playCounter % 2 == 0) {
      return player1;
    } else {
      return player2;
    }
  }

  function resetCounter() {
    playCounter = 1;
  }

  function newGameBtn(activeBoard) {
    resetCounter();
    activeBoard.boardReset();
    displayControls.boardUpdate(activeBoard.displayBoard);
    displayControls.showCurrentPlayer("O");
  }

  function clearAllScoresBtn(player1, player2) {
    player1.clearScore();
    player2.clearScore();
    displayControls.scoreUpdate(player1.score, player2.score);
  }

  function clearPlays(player1, player2, activeBoard) {
    player1.clearPlays();
    player2.clearPlays();
    activeBoard.boardReset();
  }

  // Runs after a game is finished
  function nextGame(player1, player2, activeBoard) {
    clearPlays(player1, player2, activeBoard);
    displayControls.boardUpdate(activeBoard.displayBoard);
    displayControls.toggleModal();
  }

  // Check to see if a game is done
  function endGame(currentPlayer, player1, player2, activeBoard) {
    if (currentPlayer.didIWin()) {
      currentPlayer.scoreUp();
      displayControls.setWinner(currentPlayer.marker);
      displayControls.scoreUpdate(player1.score, player2.score);
      nextGame(player1, player2, activeBoard);
    } else if (activeBoard.isFull()) {
      displayControls.showTie();
      clearPlays(player1, player2, activeBoard);
      nextGame(player1, player2, activeBoard);
    }
  }

  function makePlay(event, player1, player2, activeBoard) {
    let currentPlayer = togglePlayer(player1, player2);
    let cellValue = parseFloat(event.target.dataset.cellValue);
    activeBoard.markBoard(cellValue, currentPlayer.marker);
    currentPlayer.addPlay(cellValue);
    displayControls.boardUpdate(activeBoard.displayBoard);
    displayControls.showCurrentPlayer(currentPlayer.marker);
    endGame(currentPlayer, player1, player2, activeBoard);
  }

  return { makePlay, clearPlays, newGameBtn, clearAllScoresBtn };
})();