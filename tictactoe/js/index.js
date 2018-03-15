console.clear();
var currBoard = new Array(9).fill(null);
const human = 'X';
const computer = 'O';
const wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8]
];

let squares;

window.onload = function() {
  document.querySelector('.reset').addEventListener('click', startGame);
  startGame();
}

function startGame() {
  // Reset the endgame dialog
  document.querySelector('.endgame').classList.remove('show');
  document.querySelector('.endgame h2').innerText = '';

  // Reset the squares and set up the click handlers
  squares = document.querySelectorAll('.square');
  squares.forEach(square => {
    square.addEventListener('click', turnClick);
    square.classList.remove('hlhuman', 'hlcomputer', 'hltie');
    square.innerText = '';
    currBoard = new Array(9).fill(null);
  });
}

function turnClick(e) {
  let square = e.target;
  if (square.innerText != '') return false;
  turn(square, human);
  if (!checkWin(currBoard, human) && !checkTie()) turn(bestSpot(), computer);
}

function turn(square, player) {
  let index;
  if (typeof square == 'number') {
    index = square;
    square = document.getElementById('s' + square);
  } else {
    index = square.id.substring(1);
  }

  currBoard[index] = player;
  square.innerText = player;

  let gameWon = checkWin(currBoard, player);
  if (gameWon) gameOver(gameWon);
}

function checkWin(board, player) {
  let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
  let gameWon = false;
  for (let [index, win] of wins.entries()) {
    if (win.every(square => plays.indexOf(square) != -1)) {
      gameWon = {index, player};
      break;
    }
  }
  return gameWon;
}

function gameOver(gameWon) {
  for (let index of wins[gameWon.index]) {
    let square = document.getElementById('s' + index);
    let cssClass = 'hl' + ((gameWon.player == human) ? 'human' : 'computer');
    square.classList.add(cssClass);
  }

  squares.forEach(square => square.removeEventListener('click', turnClick));
  declareWinner(gameWon.player == human ? 'You Win!' : 'Computer Wins.');
}

function declareWinner(message) {
  document.querySelector('.endgame h2').innerText = message;
  document.querySelector('.endgame').classList.add('show');
}

function emptySquares() {
  return currBoard.reduce((a,e,i) => e == null ? a.concat(i) : a, []);
}

function bestSpot() {
  return minimax(currBoard, computer).square;
}

function checkTie() {
  if (emptySquares().length == 0) {
    squares.forEach(square => {
      square.classList.add('hltie');
      square.removeEventListener('click', turnClick);
    });
    declareWinner("It's a Tie!");
    return true;
  }
  return false;
}

function minimax(board, player) {
  let available = emptySquares();

  // Base case
  // This recursive function is used to determine the best
  // move for the computer. So, a computer win is assigned a
  // high score and a player win is assigned a low score.
  if (checkWin(board, human)) {
    return {score: -10};
  } else if (checkWin(board, computer)) {
    return {score: 10};
  } else if (available.length == 0) {
    return {score: 0};
  }

  // Iterate through the list of available spaces and collect
  // the moves and the score for each move.
  let moves = [];
  available.forEach(square => {
    let move = {};
    let result;

    // Try a move, get the score.
    board[square] = player;
    if (player == human) {
      result = minimax(board, computer);
    } else {
      result = minimax(board, human);
    }

    // Reset the square
    board[square] = null;

    // Store the move and its score.
    move.square = square;
    move.score = result.score;
    moves.push(move);
  });

  let bestMove, bestScore;
  if (player == computer) {
    bestScore = -1000;
    moves.forEach(move => {
      if (move.score > bestScore) {
        bestScore = move.score;
        bestMove = move;
      }
    });
  } else {
    bestScore = 1000;
    moves.forEach(move => {
      if (move.score < bestScore) {
        bestScore = move.score;
        bestMove = move;
      }
    });
  }

  return bestMove;
}
