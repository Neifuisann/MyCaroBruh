const board = document.getElementById('board');
const SIZE = 20; // Kích thước bảng 20x20, có thể thay đổi
const EMPTY = '';
const PLAYER_X = 'X';
const PLAYER_O = 'O';

let cells = Array(SIZE).fill(null).map(() => Array(SIZE).fill(EMPTY));
let currentPlayer = PLAYER_X;

function createBoard() {
    board.style.gridTemplateColumns = `repeat(${SIZE}, 30px)`;
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', onCellClick);
            board.appendChild(cell);
        }
    }
}

function onCellClick(event) {
    const row = event.target.dataset.row;
    const col = event.target.dataset.col;

    if (cells[row][col] === EMPTY) {
        cells[row][col] = currentPlayer;
        event.target.classList.add(currentPlayer.toLowerCase());
        event.target.textContent = currentPlayer;

        if (checkWin(row, col)) {
            setTimeout(() => {
                alert(`${currentPlayer} thắng!`);
                resetBoard();
            }, 100);
        } else if (isBoardFull()) {
            setTimeout(() => {
                alert('Trò chơi hòa!');
                resetBoard();
            }, 100);
        } else {
            currentPlayer = (currentPlayer === PLAYER_X) ? PLAYER_O : PLAYER_X;
        }
    }
}

function checkWin(row, col) {
    row = parseInt(row);
    col = parseInt(col);
    const directions = [
        [[0, 1], [0, -1]], // Horizontal
        [[1, 0], [-1, 0]], // Vertical
        [[1, 1], [-1, -1]], // Diagonal \
        [[1, -1], [-1, 1]] // Diagonal /
    ];
    const target = cells[row][col];

    for (const direction of directions) {
        let count = 1;
        for (const [dx, dy] of direction) {
            let r = row + dx;
            let c = col + dy;
            while (r >= 0 && r < SIZE && c >= 0 && c < SIZE && cells[r][c] === target) {
                count++;
                r += dx;
                c += dy;
            }
        }
        if (count >= 5) {
            return true;
        }
    }
    return false;
}

function isBoardFull() {
    return cells.every(row => row.every(cell => cell !== EMPTY));
}

function resetBoard() {
    cells = Array(SIZE).fill(null).map(() => Array(SIZE).fill(EMPTY));
    board.innerHTML = '';
    createBoard();
    currentPlayer = PLAYER_X;
}

createBoard();
