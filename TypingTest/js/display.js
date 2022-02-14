const inputContainer = document.querySelector(".input-container");
const outputContainer = document.querySelector(".output-container");

var cells = new Array(numberOfRows);
var rows = [];
var currentWord = 0;
const words = sentence1.split(" ");

for (let x = 0; x < numberOfRows; x++) {
    cells[x] = new Array(cellsPerRow);
}

//figure out how to advance past the first row 

window.onload = function() {
    inputContainer.classList.add("input-container-inactive");
    outputContainer.classList.add("output-container-inactive");
    var timer = new CountdownTimer(60);
    var display = document.getElementById("timer");
    var timeObj = CountdownTimer.parse(60);

    format(timeObj.minutes, timeObj.seconds);

    timer.onTick(format).onTick(endTest);

    window.addEventListener("keydown", function (event) {  
        if (event.key == "Enter") {
            prepareDisplay();
            initalizeDisplay();
            writeIntialWords();
            trim();
            timer.start();
        }
    });

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
    constructor(row,numCells, cellRow) {
        this.row = row;
        this.numCells = numCells;
        this.cellRow = cellRow;
    }
    set setNumCells(numCells) {
        this.numCells = numCells;
    }
 }

function initalizeDisplay() {
    cursor.style.height = root.getPropertyValue("--cursor-height");
    cursor.style.top = (input.offsetHeight/numberOfRows)/2 - (cursor.offsetHeight/2) + "px";
    cursor.style.width = input.offsetWidth/cellsPerRow + "px";
    for (let y = 0; y < numberOfRows; y++) {
        let newRow = createNewRow(y);
        newRow.row.style.top = input.offsetHeight/3 * y + "px"; 
        input.appendChild(newRow.row);
        rows[y] = newRow;
    }
    readjustHeight();
}

function addNewRow() {
    console.log("new row added");
    console.log("---------");
    rows[0].row.remove();
    rows.shift();
    cells.shift();
    cells.push(new Array(cellsPerRow));
    let newRow = createNewRow(numberOfRows-1);
    newRow.row.style.top = input.offsetHeight + "px";
    rows[numberOfRows-1] = newRow;
    input.appendChild(newRow.row);
    setTimeout(function() {
    for (let i = 0; i < rows.length; i++) {
        if (hypotheticalCursorY == 2 || i == rows.length - 1) {
            rows[i].row.style.transform = "translateY(" + (-input.offsetHeight/numberOfRows) + "px)";
        } else {
            let prevTranslateY = rows[i].row.style.transform.substring(rows[i].row.style.transform.indexOf("-") + 1,  rows[i].row.style.transform.indexOf("p"));
            console.log("parse float "  + parseFloat(prevTranslateY));
            console.log("divided thing " + -input.offsetHeight/numberOfRows);
            let newTranslateY = -parseFloat(prevTranslateY) + (-input.offsetHeight/numberOfRows);
            console.log("new translate y" + newTranslateY);
            rows[i].row.style.transform = "translateY(" +  newTranslateY + "px)";
        }
        console.log(rows[i].row.style.transform);
    }
    }, 100);
    
    for (let x = 0; x < cellsPerRow; x++) {
        if (currentWord < words.length) {
            if ((x + words[currentWord].length < cellsPerRow)) {
                for (let i = 0; i < words[currentWord].length; i++) {
                    cells[numberOfRows-1][x].innerText = words[currentWord].charAt(i);
                    x++;
                }
                currentWord++;
            }
        }
    }
    
    readjustHeight();
    
    //console.log(rows.length);
    
    console.log("row length " + rows.length);
    trimLast();
    console.log(console.log(cells[currentCell.y]));
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
        console.log("y " + y);
        //console.log("cells.length " + cells.length);
        cells[y][x] = newCharacter;
    }
    return new Row(newRow, cellsPerRow, cells[y]);
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
        while(!(cells[numberOfRows-1][x-1].innerText) && x-1 > 0) {
            //console.log("x " + x + " y " + y);
            cells[numberOfRows-1][x].remove();
            rows[numberOfRows-1].setNumCells = rows[numberOfRows-1].numCells - 1;
            x--;
        }
    //readjusts width after trim
        for (let x = 0 ; x < rows[numberOfRows-1].numCells; x++) {
            cells[numberOfRows-1][x].style.width = input.offsetWidth/rows[numberOfRows-1].numCells + "px";
        }
}

function readjustHeight() {
    for (let y = 0; y < numberOfRows; y++) {
        for (let x = 0 ; x < rows[y].numCells; x++) {
            //console.log(rows[y].row.offsetHeight);
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
