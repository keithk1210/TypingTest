const inputContainer = document.querySelector(".input-container");
const outputContainer = document.querySelector(".output-container");

var rows = [];
var currentWord = 0;
var text;
var fixedText;
var words;


class Row {
    constructor(row) {
        this.row = row;
        this.cells = [];

        this.addNewCell = function (newObject) {
            this.cells.push(newObject);
        };
    }
    
 }

function endTest() {
    if (this.expired()) {
        //console.log("test ended");
        terminateDisplay();
        calculateWPM();
    }
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
    listboxArea.remove();

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
        let newRow = createNewRowAtIndex(y);
        newRow.row.style.top = input.offsetHeight/3 * y + "px"; 
        input.appendChild(newRow.row);
        rows[y] = newRow;
    }
    readjustHeight();
}

function addNewRow() {

    rows[0].row.remove();
    rows.shift();
    let newRow = createNewRowAtIndex(numberOfRows-1);
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
    //console.log(words[currentWord] + " " + currentWord);
    for (let x = 0; x < cellsPerRow; x++) {
        if (currentWord < words.length) {
            if ((x + words[currentWord].length < cellsPerRow)) {
                for (let i = 0; i < words[currentWord].length; i++) {
                    newRow.cells[x].innerText = words[currentWord].charAt(i);
                    x++;
                }
                currentWord++;
            }
        }
    }

    readjustHeight();
    //console.log(rows);
    trim();

}

function goBackOneRow() {

    rows[rows.length-1].row.remove();
    rows.pop();
    let newRow = createNewRowAtIndex(0);
    newRow.row.style.top = -input.offsetHeight/numberOfRows + "px";
    rows.unshift(newRow);
    input.appendChild(newRow.row);
    
    setTimeout(function() {
        for (let i = 0; i < rows.length; i++) {
            if (hypotheticalCursorY < 1 || i == 0) {
                rows[i].row.style.transform = "translateY(" + (input.offsetHeight/numberOfRows) + "px)";
            } else {
                let prevTranslateY = rows[i].row.style.transform.substring(rows[i].row.style.transform.indexOf("(") + 1,  rows[i].row.style.transform.indexOf("p"));
                let newTranslateY = parseFloat(prevTranslateY) + (input.offsetHeight/numberOfRows);
                rows[i].row.style.transform = "translateY(" +  newTranslateY + "px)";
            }
        }
    }, 100);
    
    for (let x = cellsPerRow-1; x >= 0; x--) {
        if (x == cellsPerRow-1) {
            continue;
        }
        if (currentWord < words.length && currentWord >= 0) {
                for (let i = words[currentWord].length-1; i >= 0; i--) {
                    newRow.cells[x].innerText = words[currentWord].charAt(i);
                    //console.log(newRow.cells[x]);
                    x--;
                }
                //console.log("current word " + words[currentWord] + " " + currentWord);
                if (currentWord > 0) {
                    currentWord--;
                }
            }
        }

    readjustHeight();
    trim();
}

function createNewRowAtIndex(index) {
    let newRow = document.createElement("div");
    let newRowP = document.createElement("p");
    newRow.style.height = input.offsetHeight/numberOfRows + "px";
    newRow.classList.add("row");
    newRowP.classList.add("row-p");
    newRow.appendChild(newRowP);
    let rowObject = new Row(newRow);

    for (let x = 0; x < cellsPerRow; x++) {
        let newCharacter = document.createElement("span");
        newCharacter.classList.add("character");
        newRowP.appendChild(newCharacter);
        rowObject.addNewCell(newCharacter);
    }

    return rowObject;
}

function writeIntialWords() {
    fixedText = text.replace("\n", " ").replace(/\s+/g, ' ');
    words = fixedText.split(" ");
    for (let y = 0; y < numberOfRows; y++) {   
        for (let x = 0; x < cellsPerRow; x++) {
            if (currentWord < words.length) {
                if ((x + words[currentWord].length < cellsPerRow)) {
                    for (let i = 0; i < words[currentWord].length; i++) {
                        rows[y].cells[x].innerText = words[currentWord].charAt(i);
                        x++;
                    }
                    currentWord++;
                }
                
            }
        }
    }
}

function trim() {
    //trims all trailing whitespace but one
    for (let y = 0; y < numberOfRows; y ++) {
        let x = rows[y].cells.length-1;
        while(rows[y].cells[x-1].innerText == "" && x-1 > 0) {
            rows[y].cells[x].remove();
            rows[y].cells.pop();
            x--;
        }
    }
    
    //trims all leading whitespace
    for (let y = 0; y < numberOfRows; y++) {
        let x = 0;
        while(rows[y].cells[x].innerText == "" && x < rows[y].cells.length) {
            rows[y].cells[x].remove();
            rows[y].cells.pop();
            x++;
        }
    }
    
    for (let y = 0; y < numberOfRows; y++) {
        for (let x = 0 ; x < rows[y].numberOfCells; x++) {
            rows[y].cells[x].style.width = input.offsetWidth/rows[y].cells.length + "px";
        }
    }  
}

/*
function trimRowAtIndex(index) {
        let x = cellsPerRow-1;
        while(!(rows[index].cells[x-1].innerText) && x-1 > 0) {
            //console.log("removed");
            rows[index].cells[x].remove();
            rows[index].cells.pop();
            x--;
        }
    //readjusts width after trim
        for (let x = 0 ; x < rows[index].cells.length; x++) {
            rows[index].cells[x].style.width = input.offsetWidth/rows[index].cells.length + "px";
        }
}
*/

function readjustHeight() {
    for (let y = 0; y < numberOfRows; y++) {
        for (let x = 0 ; x < rows[y].cells.length; x++) {
            ////console.log(rows[y].row.offsetHeight);
            rows[y].cells[x].style.lineHeight = rows[y].row.offsetHeight + "px";
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
