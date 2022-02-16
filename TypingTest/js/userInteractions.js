var currentCell;
var userKeyInput = [];
var hypotheticalCursorY = 0;
var numberOfKeystrokes = 0;
var correctKeystrokes = 0;

class Coord {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
    set setX(x) {
        this.x = x;
    }
    set setY(y) {
        this.y = y;
    }
}

currentCell = new Coord(0,0);

function startGame() {
    window.addEventListener("keydown",function(event) {
        console.log(cells[currentCell.y][currentCell.x].innerText);
        if(event.key == " ") {
            event.preventDefault();
          }
        if (isPermittedKey(event.key)) {
            if (event.key == "Backspace") {
                cells[currentCell.y][currentCell.x].style.color = root.getPropertyValue("--default-color");
                goBackOne();
                if (userKeyInput.length > 0) {
                    userKeyInput.pop();
                }
            } else if (event.key.length == 1 && ((event.key != " " && !currentCellIsEmptySpace()) || (event.key == " " && currentCellIsEmptySpace()))) {
                if (event.key != " ") {
                    numberOfKeystrokes++;
                }
                if (currentCell.x == rows[currentCell.y].numCells-1 && hypotheticalCursorY > 0) {
                    advanceThroughSentence();
                    addNewRow();
                } else {
                    checkIfCorrect(event);
                    advanceThroughSentence();
                    userKeyInput.push(event.key);
                }
            }
            updateAccuracy();
            redrawCursor();
        }
    });
}

function checkIfCorrect(event) {
    if (cells[currentCell.y][currentCell.x].innerText == event.key.trim() && event.key != " ") {
        cells[currentCell.y][currentCell.x].style.color = root.getPropertyValue("--correct-color");
        correctKeystrokes++;
    } else if ((event.key != "Shift" && event.key != "Backspace" && event.key != " ")) {
        cells[currentCell.y][currentCell.x].style.color = root.getPropertyValue("--incorrect-color");
    }
}

function redrawCursor() {
    let xUnit = input.offsetWidth/rows[currentCell.y].numCells;
    let yUnit = input.offsetHeight/numberOfRows;
    cursor.style.height = root.getPropertyValue("--cursor-height");
    cursor.style.top = (input.offsetHeight/numberOfRows)/2 - (cursor.offsetHeight/2) + "px";
    cursor.style.width = xUnit + "px";
    cursor.style.transform = "translateX(" + currentCell.x * xUnit + "px)";
    cursor.style.transform += "translateY(" + currentCell.y * yUnit + "px)";
}

function advanceThroughSentence() {
    currentCell.setX = currentCell.x + 1;
    if (currentCell.x === rows[currentCell.y].numCells) {
        currentCell.setX = 0;
        if (currentCell.y != (numberOfRows-1)/2) {
            currentCell.setY = currentCell.y + 1;
        }
        hypotheticalCursorY++;
    }
}

function goBackOne() {
    if (currentCell.x == 0) {
        if (currentCell.y != 0) {
            currentCell.setY = currentCell.y - 1;
            currentCell.setX = rows[currentCell.y].numCells-1;
        }
    } else {
        currentCell.setX = currentCell.x-1;
    }
}
//functions for readability
function currentCellIsEmptySpace() {
    return cells[currentCell.y][currentCell.x].innerText == "" || cells[currentCell.y][currentCell.x].innerText == "\n";
}