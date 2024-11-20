document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusText = document.getElementById('status');
    const restartButton = document.getElementById('restart');
    let currentPlayer = 'A';
    let boardState = Array(9).fill(null);
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    function handleClick(event) {
        const cell = event.target;
        const index = cell.getAttribute('data-index');

        if (boardState[index] || checkWinner()) return;

        boardState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add('taken', 'animate');

        if (checkWinner()) {
            statusText.textContent = `Player ${currentPlayer} wins!`;
            highlightWinningCells();
        } else if (boardState.every(cell => cell)) {
            statusText.textContent = 'It\'s a draw!';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusText.textContent = `Player ${currentPlayer}'s turn`;
        }
    }

    function checkWinner() {
        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                combination.forEach(index => cells[index].classList.add('winner'));
                return true;
            }
            return false;
        });
    }

    function highlightWinningCells() {
        winningCombinations.forEach(combination => {
            if (combination.every(index => boardState[index] === currentPlayer)) {
                combination.forEach(index => {
                    cells[index].style.backgroundColor = '#4fa4c7';
                });
            }
        });
    }

    function resetGame() {
        boardState.fill(null);
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('taken', 'animate', 'winner');
            cell.style.backgroundColor = '#1c2025';
        });
        currentPlayer = 'X';
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }

    cells.forEach(cell => cell.addEventListener('click', handleClick));
    restartButton.addEventListener('click', resetGame);

    resetGame();
});
