var currentCell;
var userKeyInput = [];
var wordsPerMinute = 0;
var wordIndex = 0;
var rowIndex = 0;

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
    if (event.key != "Backspace" && event.key != "Shift") {
        userKeyInput.push(event.key);
    } else if (event.key == "Backspace") {
        if (userKeyInput.length > 0) {
            userKeyInput.pop();
        }
    }
    //console.log(userKeyInput);
    changeLetterColor(event);
    if (currentCell.x == rows[currentCell.y].numCells-1 && currentCell.y == (numberOfRows-1)/2 && event.key != "Backspace") {
        advanceThroughSentence();
        addNewRow();
        let xUnit = input.offsetWidth/rows[currentCell.y].numCells;
        let yUnit = input.offsetHeight/numberOfRows;
        cursor.style.height = yUnit + "px";
        cursor.style.width = xUnit + "px";
        cursor.style.transform = "translateX(" + currentCell.x * xUnit + "px)";
        cursor.style.transform += "translateY(" + currentCell.y * yUnit + "px)";
        rows.shift();
        return;
    }
    moveCursor(event);
    
});

function updateCurrentWord(event) {
    if (event.key == "Backspace" && cells[currentCell.y][currentCell.x-1].innerText == "") {
        wordIndex--;
        userKeyInput = [];
        //console.log("wordindex " + wordIndex);
    } else if ((event.key == " " && cells[currentCell.y][currentCell.x].innerText == "")) {
        wordIndex++;
        userKeyInput = [];
        //console.log("wordindex " + wordIndex);
    }
}

function clearuserKeyInput(event) {
    if (event.key == "Backspace" && cells[currentCell.y][currentCell.x-1].innerText == "") {
        userKeyInput = [];
    } else if ((event.key == " " && cells[currentCell.y][currentCell.x].innerText == "")) {
        userKeyInput = [];
    }
}

function changeLetterColor(event) {
    console.log("x " + currentCell.x + " y " + currentCell.y);
    //console.log("!" + cells[currentCell.y][currentCell.x].children[0].innerText + "!");
    if (event.key == "Backspace") {
        cells[currentCell.y][currentCell.x].style.color = root.getPropertyValue("--default-color");
    } else if (cells[currentCell.y][currentCell.x].innerText == event.key.trim() && event.key != " ") {
        cells[currentCell.y][currentCell.x].style.color = root.getPropertyValue("--correct-color");
    } else if ((event.key != "Shift" && event.key != "Backspace" && event.key != " ")) {
        cells[currentCell.y][currentCell.x].style.color = root.getPropertyValue("--incorrect-color");
    }
}

function moveCursor(event) {
    //console.log("x " + currentCell.x + " y " + currentCell.y);
    if (event.key == "Backspace") {
        goBackOne();
    //you cannot advance if you type something other than space
    } else if (event.key != "Shift" && event.key != "Backspace" && event.key != " " && cells[currentCell.y][currentCell.x].innerText != "") {
        advanceThroughSentence();
    } else if ((event.key == " " && cells[currentCell.y][currentCell.x].innerText == "")) {
        advanceThroughSentence();
    } else if (event.key == " ") {
        console.log("current cell y " + currentCell.y + " current cell x " + currentCell.x);
        console.log(cells[currentCell.y][currentCell.x].innerText);
    }
    let xUnit = input.offsetWidth/rows[currentCell.y].numCells;
    let yUnit = input.offsetHeight/numberOfRows;
    cursor.style.height = yUnit + "px";
    cursor.style.width = xUnit + "px";
    cursor.style.transform = "translateX(" + currentCell.x * xUnit + "px)";
    cursor.style.transform += "translateY(" + currentCell.y * yUnit + "px)";
}

function updateWordsPerMinute(event) {
    for (let i = 0; i < userKeyInput.length; i++) {
        if (userKeyInput[i] != words[wordIndex].charAt(i)) {
                return;
            }
        }
        console.log("You typed " + words[wordIndex]);
        wordsPerMinute++;
        document.getElementById("wpm").innerText = wordsPerMinute + " WPM";
}


function advanceThroughSentence() {
    //console.log("x " + currentCell.x + "y "+ currentCell.y);
    currentCell.setX = currentCell.x + 1;
    //console.log("numm cells " + rows[currentCell.y].numCells);
    //console.log("current cell x" + currentCell.x);
    if (currentCell.x === rows[currentCell.y].numCells) {
        console.log("changed");
        currentCell.setX = 0;
        if (currentCell.y != (numberOfRows-1)/2) {
            currentCell.setY = currentCell.y + 1;
        }
        //rowIndex++;
    }
}

function goBackOne() {
    //console.log("called");
    if (currentCell.x == 0) {
        if (currentCell.y != 0) {
            currentCell.setY = currentCell.y - 1;
            currentCell.setX = rows[currentCell.y].numCells-1;
        }
    } else {
        //console.log("back one");
        currentCell.setX = currentCell.x-1;
    }
}