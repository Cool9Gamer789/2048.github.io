let board;
let score = 0;
const rows = 4;
const columns = 4;

window.onload = function () {
    setGame();
}

function setGame() {
    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
    ];

    for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < columns; c += 1) {
            let tile = document.createElement("div");

            tile.id = r.toString() + "-" + c.toString();

            let num = board[r][c];
            updateTile(tile, num);
            
            document.getElementById("board").append(tile);
        }
    }

    setTwo();
    setTwo();
}

function hasEmptyTile() {
    for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < columns; c += 1) {
            if (board[r][c] == 0) {
                 return true;
            }
        }
    }
    return false;
}

// Add 2 tiles to the start
function setTwo () {
    if (!hasEmptyTile()) {
        return;
    }

    let found = false;

    while (!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);

        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.textContent = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

// Updates the tile for each slide
function updateTile(tile, num) {
    tile.textContent = "";
    tile.classList.value = "";
    tile.classList.add("tile");

    if (num > 0) {
        tile.textContent = num;
        if (num <= 4096) {
            tile.classList.add("x"+num.toString());
        }
        else {
            tile.classList.add("x8192")
        }
    }
}

// Move the tiles around with arrow key
document.addEventListener("keyup", (event) => {
    if (event.code == "ArrowLeft") {
        slideLeft();
        setTwo();
    }
    else if (event.code == "ArrowRight") {
        slideRight();
        setTwo();
    }
    else if (event.code == "ArrowUp") {
        slideUp();
        setTwo();
    }
    else if (event.code == "ArrowDown") {
        slideDown();
        setTwo();
    }
    document.getElementById("score").textContent = score;
});

// Filters out all the zeros after sliding 
function filterZero(row) {
    // Creates a new array with no 0s
    return row.filter(num => num != 0); 
}

// Sliding implementation for all functions 
function slide(row) {
    row = filterZero(row);

    for (let i = 0; i < row.length-1; i += 1) {
        if (row[i] == row[i+1]) {
            row[i] = row[i] * 2;
            row[i+1] = 0;
            score += row[i];
        }
    }

    row = filterZero(row);

    // Adds the zero to the attend of the array 
    while (row.length < columns) {
        row.push(0);
    }

    return row;
}

// Slides the tiles left
function slideLeft() {
    for (let r = 0; r < rows; r += 1) {
        let row = board[r];
        row = slide(row);
        board[r] = row

        for (let c = 0; c < columns; c += 1) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());

            let num = board[r][c];

            updateTile(tile, num);
        }
    }
}

// Slides the tiles right
function slideRight() {
    for (let r = 0; r < rows; r += 1) {
        let row = board[r];
        row.reverse(); // Reverses the rows
        row = slide(row);
        row.reverse(); // Reverses the rows again 
        board[r] = row

        for (let c = 0; c < columns; c += 1) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());

            let num = board[r][c];

            updateTile(tile, num);
        }
    }
}

// Slides the tiles up
function slideUp() {
    for (let c = 0; c < columns; c += 1) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        for (let r = 0; r < rows; r += 1) {
            board[r][c] = row[r];

            let tile = document.getElementById(r.toString() + "-" + c.toString());

            let num = board[r][c];

            updateTile(tile, num);
        }
    }
}

// Slides the tiles down
function slideDown() {
    for (let c = 0; c < columns; c += 1) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();

        for (let r = 0; r < rows; r += 1) {
            board[r][c] = row[r];

            let tile = document.getElementById(r.toString() + "-" + c.toString());

            let num = board[r][c];

            updateTile(tile, num);
        }
    }
}