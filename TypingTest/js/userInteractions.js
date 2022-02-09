var currentCell;
var correctKeyStrokes = 0;
var keystrokes = [];
var wordsPerMinute = 0;
var wordIndex = 0;
const words = sentence1.split(" ");
var lastKey;

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
    if (event.key != " " && event.key != "Backspace" && event.key != "Shift") {
        keystrokes.push(event.key);
    } else if (event.key == "Backspace") {
        if (keystrokes.length > 0) {
            keystrokes.pop();
        }
    }
    console.log(keystrokes);
    updateWordsPerMinute(event);
    updateCurrentWord(event);
    checkIfCorrectKey(event);
    console.log(words[wordIndex]);

    //console.log("length " + words[wordIndex].length);
});

function updateCurrentWord(event) {
    if (event.key == "Backspace" && cells[currentCell.y][cells.currentCell.x-1].innerText == "") {
        wordIndex--;
    } else if ((event.key == " " && cells[currentCell.y][currentCell.x].innerText == "")) {
        wordIndex++;
    }
}

function checkIfCorrectKey(event) {
    //console.log("!" + cells[currentCell.y][currentCell.x].children[0].innerText + "!");
    if (event.key == "Backspace") {
        goBackOne();
        cells[currentCell.y][currentCell.x].style.color = root.getPropertyValue("--default-color");
    } else if (cells[currentCell.y][currentCell.x].innerText == event.key.trim() && event.key != " ") {
        cells[currentCell.y][currentCell.x].style.color = root.getPropertyValue("--correct-color");
        advanceThroughSentence();
    } else if ((event.key != "Shift" && event.key != "Backspace" && event.key != " ")) {
        cells[currentCell.y][currentCell.x].style.color = root.getPropertyValue("--incorrect-color");
        advanceThroughSentence();
    } else if ((event.key == " " && cells[currentCell.y][currentCell.x].innerText == "")) {
        advanceThroughSentence();
    }
    let xUnit = input.offsetWidth/rows[currentCell.y].numCells;
    let yUnit = input.offsetHeight/numberOfRows;
    cursor.style.height = yUnit + "px";
    cursor.style.width = xUnit + "px";
    cursor.style.transform = "translateX(" + currentCell.x * xUnit + "px)";
    cursor.style.transform += "translateY(" + currentCell.y * yUnit + "px)";
}

function updateWordsPerMinute(event) {
    if (event.key == " " && keystrokes.length == words[wordIndex].length) {
        
        for (let i = 0; i < keystrokes.length; i++) {
            if (keystrokes[i] != words[wordIndex].charAt(i)) 
                keystrokes = [];
                console.log("code reached");
                return;
            }
            keystrokes = [];
            console.log("You typed " + words[wordIndex]);
            wordsPerMinute++;
            document.getElementById("wpm").innerText = wordsPerMinute + " WPM";
        }
}


function advanceThroughSentence() {
    //console.log("x " + currentCell.x + "y "+ currentCell.y);
    currentCell.setX = currentCell.x + 1;
    if (currentCell.x === rows[currentCell.y].numCells) {
        currentCell.setX = 0;
        currentCell.setY = currentCell.y + 1;
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
        currentCell.setX = currentCell.x-1;
    }
}