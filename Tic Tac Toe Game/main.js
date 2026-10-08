const board = document.querySelector(".board");
let currentPlayer = "X";
let cells = Array.from({length: 9});

const handlClick = (e) => {
    const cellIndex = e.target.dataset.index;
    console.log(cellIndex)
    if (cells[cellIndex]) return;
    updateCell(cellIndex, currentPlayer);
    const winner = checkWinner();
    
    if (winner || !cells.includes(undefined)) {
        alert(winner? `Winner ${winner} Win!` : "Its a Draw!");
        resetGame();
    }
}

const checkWinner = () => {
    const winningCombo = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (const combo of winningCombo) {
        const [a, b, c] = combo;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            return cells[a];
        }
    }
}

const resetGame = () => {
    cells = Array.from({length: 9});
    currentPlayer = "X"
    board.querySelectorAll(".cell").forEach((cell) => {
        cell.textContent = "";
        cell.classList.remove("player-x", "player-o");
    })
}

const updateCell = (index, value) => {
    cells[index] = value;
    const cell = board.querySelector(`[data-index="${index}"]`);
    cell.classList.add(value === "X"? "player-x":"player-o");
    currentPlayer = currentPlayer === "X"? "O" : "X";
    cell.textContent = value;
}

cells.forEach((cell, index) => {
    cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = index;
    cell.addEventListener("click", handlClick)
    board.appendChild(cell);
})

checkWinner();