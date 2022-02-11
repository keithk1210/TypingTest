const inputContainer = document.querySelector(".input-container");
const outputContainer = document.querySelector(".output-container");

var cells = new Array(numberOfRows);
var rows = [];
var currentWord = 0;
const words = sentence1.split(" ");

for (let x = 0; x < numberOfRows + 1; x++) {
    cells[x] = new Array(cellsPerRow);
}

window.onload = function() {
    inputContainer.classList.add("input-container-inactive");
    outputContainer.classList.add("output-container-inactive");
    var timer = new CountdownTimer(60);
    var display = document.getElementById("timer");
    var timeObj = CountdownTimer.parse(60);

    format(timeObj.minutes, timeObj.seconds);

    timer.onTick(format).onTick(endTest);

    document.getElementById("start-button").onclick = function () {
        prepareDisplay();
        initalizeDisplay();
        writeIntialWords();
        trim();
        timer.start();
    }

    function format(minutes, seconds) {
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ':' + seconds;
    }
}

function endTest() {
    if (this.expired()) {
        console.log("test ended");
        terminateDisplay();
        calculateAccuracy();
    }
}

function terminateDisplay() {
    inputContainer.classList.remove("input-container-active");
    inputContainer.classList.add("input-container-inactive");
}

function prepareDisplay() {
    inputContainer.classList.remove("input-container-inactive");
    inputContainer.classList.add("input-container-active");
    document.getElementById("start-button").style.display = "none";
}

class Row {
    constructor(row,numCells) {
        this.row = row;
        this.numCells = numCells;
    }
    set setNumCells(numCells) {
        this.numCells = numCells;
    }
 }

function initalizeDisplay() {
    cursor.style.height = input.offsetHeight/numberOfRows + "px";
    cursor.style.width = input.offsetWidth/cellsPerRow + "px";
    for (let y = 0; y < numberOfRows; y++) {
        let newRow = createNewRow(y);
        input.appendChild(newRow);
        rows[y] = new Row(newRow,cellsPerRow);
    }
    readjustHeight();
}

function addNewRow() {
    let newRow = createNewRow(numberOfRows);
    rows[numberOfRows] = new Row(newRow,cellsPerRow);
    for (let x = 0; x < cellsPerRow; x++) {
        if (currentWord < words.length) {
            if ((x + words[currentWord].length < cellsPerRow)) {
                for (let i = 0; i < words[currentWord].length; i++) {
                    cells[numberOfRows][x].innerText = words[currentWord].charAt(i);
                    x++;
                }
                currentWord++;
            }
        }
    }
    
    
    //console.log(rows.length);
    input.appendChild(newRow);
    
    trimLast();
    for (let i = 0; i < rows.length; i++) {
        rows[i].row.style.transform ="translateY(-" + input.offsetHeight/numberOfRows + "px)";
    }
    cells.shift();
    console.log(cells.length);
    //input.style.transform = 
}

function createNewRow(y) {
    let newRow = document.createElement("div");
    let newRowP = document.createElement("p");
    newRow.style.height = input.offsetHeight/numberOfRows + "px";
    newRow.classList.add("row");
    newRowP.classList.add("row-p");
    newRow.appendChild(newRowP);

    for (let x = 0; x < cellsPerRow; x++) {
        let newCharacter = document.createElement("span");
        newCharacter.classList.add("character");
        newRowP.appendChild(newCharacter);
        cells[y][x] = newCharacter;
    }
    return newRow;
}

function writeIntialWords() {
    for (let y = 0; y < numberOfRows; y++) {   
        for (let x = 0; x < cellsPerRow; x++) {
            if (currentWord < words.length) {
                if ((x + words[currentWord].length < cellsPerRow)) {
                    for (let i = 0; i < words[currentWord].length; i++) {
                        cells[y][x].innerText = words[currentWord].charAt(i);
                        x++;
                    }
                    currentWord++;
                }
                
            }
        }
    }
}

function trim() {
    for (let y = 0; y < numberOfRows; y ++) {
        let x = cellsPerRow-1;
        while(!(cells[y][x-1].innerText) && x-1 > 0) {
            //console.log("x " + x + " y " + y);
            cells[y][x].remove();
            rows[y].setNumCells = rows[y].numCells - 1;
            x--;
        }
    }
    //readjusts width after trim
    for (let y = 0; y < numberOfRows; y++) {
        for (let x = 0 ; x < rows[y].numCells; x++) {
            cells[y][x].style.width = input.offsetWidth/rows[y].numCells + "px";
        }
    }  
}

function trimLast() {
        let x = cellsPerRow-1;
        while(!(cells[numberOfRows][x-1].innerText) && x-1 > 0) {
            //console.log("x " + x + " y " + y);
            cells[numberOfRows][x].remove();
            rows[numberOfRows].setNumCells = rows[numberOfRows].numCells - 1;
            x--;
        }
    //readjusts width after trim
        for (let x = 0 ; x < rows[numberOfRows].numCells; x++) {
            cells[numberOfRows][x].style.width = input.offsetWidth/rows[numberOfRows].numCells + "px";
        }
}

function readjustHeight() {
    for (let y = 0; y < numberOfRows; y++) {
        for (let x = 0 ; x < rows[y].numCells; x++) {
            console.log(rows[y].row.offsetHeight);
            cells[y][x].style.lineHeight = rows[y].row.offsetHeight + "px";
        }
    }  
}
function displayOutput(wpm, accuracy) {
    outputContainer.classList.remove("output-container-inactive");
    setTimeout(function() {
        outputContainer.classList.add("output-container-active");
    }, 50);
    outputContainer.children[0].innerText = "WPM " + wpm + " Accuracy " + accuracy.toFixed(2) + "%";
}
