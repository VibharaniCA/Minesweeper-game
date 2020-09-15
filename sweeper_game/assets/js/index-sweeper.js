var grid = document.getElementById('grid');
var testMode = false;
generateGrid();

function generateGrid() {
    grid.innerHTML = "";
    for (var i = 0; i < 10; i++) {
        var row = document.createElement('div');
        row.classList.add('row');
        for (var j = 0; j < 10; j++) {
            var cell = document.createElement('div');
            cell.classList.add('cell');
            cell.onclick = function () {
                clickCell(this);
            };
            var mine = document.createAttribute("data-mine");
            mine.value = "false";
            cell.setAttributeNode(mine);
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }
    addMines();
}

function addMines() {
    //Add mines randomly
    for (var i = 0; i < 20; i++) {
        var row = Math.floor(Math.random() * 10);
        var col = Math.floor(Math.random() * 10);
        var cell = grid.children[row].children[col];
        console.log("cell displyed", cell);
        cell.setAttribute("data-mine", "true");
        if (testMode) cell.innerHTML = "X";
    }
}

function revealMines() {
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var cell = grid.children[i].children[j];
            // alert(cell)
            if (cell.getAttribute("data-mine") == "true") cell.className = "mine";
        }
    }
}

function checkLevelCompletion() {
    var levelComplete = true;
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            if ((grid.children[i].children[j].getAttribute("data-mine") == "false") &&
                (grid.children[i].children[j].innerHTML == "")) levelComplete = false;
        }
    }
    if (levelComplete) {
        alert("You Win!");
        revealMines();
    }
}


function clickCell(cell) {
    //Check if the end-user clicked on a mine
    if (cell.getAttribute("data-mine") == "true") {
        revealMines();
        alert("Game Over, Sorry you lost");
    } else {
        //   console.log("else loop")
        cell.className = "clicked";
        var mineCount = 0; //Count and display the number of adjacent mines
        var row = cell.parentNode;
        var cellRow = Array.from(row.parentNode.children).indexOf(row);
        // console.log(cellRow);
        var cellCol = Array.from(cell.parentNode.children).indexOf(cell);
        //console.log(cellRow + " " + cellCol);
        for (var i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++) {
            for (var j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); j++) {
                if (grid.children[i].children[j].getAttribute("data-mine") == "true") mineCount++;
            }
        }
        cell.innerHTML = mineCount;
        if (mineCount == 0) { //Reveal all adjacent cells as they do not have a mine
            for (var
                    i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++) {
                for (var j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1,
                        9); j++) {
                    clickCell(grid.children[i].children[j]);
                }
            }
        }
        checkLevelCompletion();
    }
}