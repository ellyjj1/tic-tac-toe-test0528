document.addEventListener('DOMContentLoaded', (event) => {
  const cells = document.querySelectorAll('.cell');
  let currentPlayer = 'X';

//list the winner combinations and check every time when a player click on a cell.
//As a player, game should caculate if any player's X or O sign make a line not matter in rows, columns or diagonals, so that the player can win
  const checkWinner = () => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
        alert(`Player ${cells[a].textContent} wins!`);
        resetBoard();
        return true;
      }
    }
//As a player, game should caculate if there is not empty cell, so that the game should alert "draw".
    if ([...cells].every(cell => cell.textContent)) {
      alert('Draw!');
      resetBoard();
      return true;
    }

    return false;
  };

//reset the board after alert "win" or "draw"
//As a player, i want the game to reset after every win or draw, so that i can play again
  const resetBoard = () => {
    cells.forEach(cell => cell.textContent = '');
  };

//2 players use X or O and click on the cell
//As a player, I should be able to click on a cell and and X or O should be added to the board, so that the game can be played
  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      if (!cell.textContent) {
        cell.textContent = currentPlayer;
        if (!checkWinner()) {
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
      }
    });
  });
});
