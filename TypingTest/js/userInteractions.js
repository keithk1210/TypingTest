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

window.addEventListener("keydown",function(event) {
    if(event.key.match(/\d/)) {
        let input = parseInt(event.key) - 1;
        if (input < durationButtons.length) {
            for (let i = 0; i < durationButtons.length; i++) {
                if (durationButtons[input].button === durationButtons[i].button) {
                    duration = durationButtons[input].duration;
                    durationButtons[input].button.style.background = root.getPropertyValue("--selected-color");
                } else {
                    durationButtons[i].button.style.background = root.getPropertyValue("--highlight-color");
                }
            }
        }
    }
});

function startGame() {
    window.addEventListener("keydown",function(event) {
        if(event.key == " ") {
            event.preventDefault();
          }
        if (isPermittedKey(event.key)) {
            if (event.key == "Backspace") {
                rows[currentCell.y].cells[currentCell.x].style.color = root.getPropertyValue("--default-color");
                goBackOne();
                if (currentCell.x == rows[currentCell.y].cells.length-1 && hypotheticalCursorY > 0) {
                        moveCurrentWordBackward();
                        goBackOneRow();
                }
                if (userKeyInput.length > 0) {
                    userKeyInput.pop();
                }
            } else if (event.key.length == 1 && ((event.key != " " && !currentCellIsEmptySpace()) || (event.key == " " && currentCellIsEmptySpace()))) {
                userKeyInput.push(event.key);
                if (event.key != " ") {
                    numberOfKeystrokes++;
                }
                if (currentCell.x == rows[currentCell.y].cells.length-1 && hypotheticalCursorY > 0) {
                    advanceThroughSentence();
                    moveCurrentWordForward();
                    addNewRow();
                } else {
                    checkIfCorrect(event);
                    advanceThroughSentence();
                }
            }
            updateAccuracy();
            redrawCursor();
        }
    });
}

function checkIfCorrect(event) {
    if (rows[currentCell.y].cells[currentCell.x].innerText == event.key.trim() && event.key != " ") {
        rows[currentCell.y].cells[currentCell.x].style.color = root.getPropertyValue("--highlight-color");
        correctKeystrokes++;
    } else if ((event.key != "Shift" && event.key != "Backspace" && event.key != " ")) {
        rows[currentCell.y].cells[currentCell.x].style.color = root.getPropertyValue("--incorrect-color");
    }
}

function redrawCursor() {
    let xUnit = input.offsetWidth/rows[currentCell.y].cells.length;
    let yUnit = input.offsetHeight/numberOfRows;
    cursor.style.height = root.getPropertyValue("--cursor-height");
    cursor.style.top = (input.offsetHeight/numberOfRows)/2 - (cursor.offsetHeight/2) + "px";
    cursor.style.width = xUnit + "px";
    cursor.style.transform = "translateX(" + currentCell.x * xUnit + "px)";
    cursor.style.transform += "translateY(" + currentCell.y * yUnit + "px)";
}

function advanceThroughSentence() {
    currentCell.setX = currentCell.x + 1;
    if (currentCell.x === rows[currentCell.y].cells.length) {
        currentCell.setX = 0;
        if (currentCell.y != (numberOfRows-1)/2) {
            currentCell.setY = currentCell.y + 1;
        }
        hypotheticalCursorY++;
    }
}

function goBackOne() {
    if (currentCell.x == 0) {
        if (currentCell.y == 1 && hypotheticalCursorY == 1) {
            hypotheticalCursorY--;
            currentCell.setY = currentCell.y - 1;
            currentCell.setX = rows[currentCell.y].cells.length-1;
        } else if (currentCell.y > 0) {
            hypotheticalCursorY--;
            currentCell.setX = rows[currentCell.y].cells.length-1;
            //////console.log("x " + currentCell.x + "");
        } 
    } else {
        currentCell.setX = currentCell.x-1;
    }
}
//functions for readability
function currentCellIsEmptySpace() {
    return rows[currentCell.y].cells[currentCell.x].innerText == "" || rows[currentCell.y].cells[currentCell.x].innerText == "\n";
}

function moveCurrentWordBackward() {
    currentWord--;
    for (let i = numberOfRows-1; i >= 0; i--) {
        for (let x = rows[i].cells.length-1; x >= 0; x--) {
            if (rows[i].cells[x].innerText == "") {
                //console.log("current word " + words[currentWord] + " " + currentWord);
                ////console.log(rows[i].cells[x]);
                currentWord--;
            }
        }
    }
}

function moveCurrentWordForward() {
    let x = rows[numberOfRows-1].cells.length-2;
    let i = words[currentWord].length - 1;
    while (true) {
        console.log(rows[numberOfRows-1].cells[x].innerText + " == " + words[currentWord].charAt(i) + " word: " + words[currentWord]);
        if (rows[numberOfRows-1].cells[x].innerText != words[currentWord].charAt(i)) {
            console.log("does not match " + words[currentWord]);
            break;
        } else if (i == 0){
            return;
        }
        x--;
        i--;
    }
}