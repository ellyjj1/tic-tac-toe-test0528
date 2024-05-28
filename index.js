const { fromEvent } = require('rxjs');
const { map, scan, startWith, filter } = require('rxjs/operators');

// Function to check for a winner
const checkWinner = (board) => {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

// Initialize the game board
const initialState = {
  board: Array(9).fill(null),
  turn: 'X',
  winner: null
};

const cells = document.querySelectorAll('.cell');

const game$ = fromEvent(cells, 'click').pipe(
  map(event => parseInt(event.target.getAttribute('data-index'))),
  filter(index => !initialState.board[index]), // Only allow clicking empty cells
  scan((state, index) => {
    const newBoard = state.board.slice();
    newBoard[index] = state.turn;
    const winner = checkWinner(newBoard);
    return {
      board: newBoard,
      turn: state.turn === 'X' ? 'O' : 'X',
      winner: winner
    };
  }, initialState),
  startWith(initialState)
);

// Subscribe to the game state and update the UI
game$.subscribe(state => {
  state.board.forEach((value, index) => {
    cells[index].textContent = value;
  });

  if (state.winner) {
    alert(`Player ${state.winner} wins!`);
  }
});
