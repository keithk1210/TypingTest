const inputContainer = document.querySelector(".input-container");
const outputContainer = document.querySelector(".output-container");

var cells = new Array(numberOfRows);
var rows = [];
var currentWord = 0;
const modifiedSentence = sentence1.replace("\n", " ").replace(/\s+/g, ' ');
const words = modifiedSentence.split(" ");



class Row {
    constructor(row, numCells, cellRow) {
        this.row = row;
        this.numCells = numCells;
        this.cellRow = cellRow;
    }
    set setNumcells(numCells) {
        this.numCells = numCells;
    }
 }

function endTest() {
    if (this.expired()) {
        console.log("test ended");
        terminateDisplay();
        calculateWPM();
    }
}

for (let x = 0; x < numberOfRows; x++) {
    cells[x] = new Array(cellsPerRow);
}


function terminateDisplay() {
    document.querySelector(".input-container").remove();
}

function prepareDisplayForTest() {
    //adding
    const inputContainer = document.createElement("div");
    inputContainer.classList.add("input-container");

    input = document.createElement("div");
    input.classList.add("input");
    input.setAttribute("id","input");
    
    cursor = document.createElement("div");
    cursor.classList.add("cursor");
    cursor.setAttribute("id","cursor");

    input.appendChild(cursor);
    inputContainer.appendChild(input);
    document.getElementsByTagName("body")[0].appendChild(inputContainer);

    let accuracyDisplay = document.createElement("span");
    accuracyDisplay.innerText = accuracyDisplayInitialText;

    durationMenu.appendChild(timerDisplay);
    durationMenu.appendChild(accuracyDisplay);
    
    let containers = document.querySelectorAll(".info-msg-container");
    for (let i = 0 ; i < containers.length; i++) {
        containers[i].remove();
    }

    //removing

    for (let i = 0; i < durationButtons.length; i++) {
        durationButtons[i].button.remove();
    }

    

}

function initalizeDisplayForTest() {
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

    cells.shift();
    cells.push(new Array(cellsPerRow));

    rows[0].row.remove();
    rows.shift();
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
                let newTranslateY = -parseFloat(prevTranslateY) + (-input.offsetHeight/numberOfRows);
                rows[i].row.style.transform = "translateY(" +  newTranslateY + "px)";
            }
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
    trimLast();
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
            cells[y][x].remove();
            rows[y].setNumcells = rows[y].numCells - 1;
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
            cells[numberOfRows-1][x].remove();
            rows[numberOfRows-1].setNumcells = rows[numberOfRows-1].numCells - 1;
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
function displayOutput(wpm) {
    let body = document.getElementsByTagName("body")[0];
    let outputContainer = document.createElement("div");
    outputContainer.classList.add("output-container");
    let outputText = document.createElement("span");
    let header = document.createElement("h3");
    header.innerText = outputMsg;
    header.classList.add("output-header");
    outputText.classList.add("output");
    body.appendChild(outputContainer);
    setTimeout(function() {
        outputContainer.classList.add("output-container-active");
    }, 50);
    setTimeout(function() {
        outputContainer.appendChild(header);
    outputContainer.appendChild(outputText);
    }, 500);
    outputText.innerText = "WPM: " + wpm;
}

function updateAccuracy() {
    let accuracy = (correctKeystrokes/numberOfKeystrokes * 100).toFixed(2);
    if (!isNaN(accuracy)) {
        durationMenu.children[accuracyDisplayIndex].innerText = accuracyDisplayInitialText + (correctKeystrokes/numberOfKeystrokes * 100).toFixed(1) + "%";
    }
}
