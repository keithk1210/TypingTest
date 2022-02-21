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
        this.words = [];
        this.cells = [];
        this.addNewCell = function (newObject) {
            this.cells.push(newObject);
            this.row.children[0].appendChild(newObject);
        };
        this.addNewWord = function (newObject) {
            this.words.push(newObject);
        }
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

function initializeDisplayForTest() {
    cursor.style.height = root.getPropertyValue("--cursor-height");
    cursor.style.top = (input.offsetHeight/numberOfVisibleRows)/2 - (cursor.offsetHeight/2) + "px";
    cursor.style.width = input.offsetWidth/cellsPerRow + "px";
    for (let y = 0; y < numberOfVisibleRows; y++) {
        makeVisibleRow(y,y);
    }
    readjustHeight();
}

function addNewRow() {

    //at this point, hypothetical cursor y == the row at numberOfVisibleRows-1
    rows[hypotheticalCursorY-2].row.remove();
    makeVisibleRow(hypotheticalCursorY+1,numberOfVisibleRows);
    console.log("called");
    
    setTimeout(function() {
        for (let i = hypotheticalCursorY-1; i < (hypotheticalCursorY - 1) + numberOfVisibleRows; i++) {
            if (i == hypotheticalCursorY - 1 + numberOfVisibleRows-1 || hypotheticalCursorY == 2) {
                rows[i].row.style.transform = "translateY(" + (-input.offsetHeight/numberOfVisibleRows) + "px)";
            } else {
                let prevTranslateY = rows[i].row.style.transform.substring(rows[i].row.style.transform.indexOf("-") + 1,  rows[i].row.style.transform.indexOf("p"));
                let newTranslateY = -parseFloat(prevTranslateY) + (-input.offsetHeight/numberOfVisibleRows);
                rows[i].row.style.transform = "translateY(" +  newTranslateY + "px)";
            }
        }
    }, 100);
   
    readjustHeight();

}

function goBackOneRow() {

    rows[hypotheticalCursorY+2].row.remove();
    rows[hypotheticalCursorY-1].row.style.top = -input.offsetHeight/numberOfVisibleRows * 2 + "px";
    input.appendChild(rows[hypotheticalCursorY-1].row);
    
    setTimeout(function() {
        for (let i= hypotheticalCursorY-1; i < hypotheticalCursorY-1+numberOfVisibleRows; i++) {
            if (i == hypotheticalCursorY-1) {
                rows[i].row.style.transform = "translateY(" +  (input.offsetHeight/numberOfVisibleRows) + "px)";
            }
            let prevTranslateY = rows[i].row.style.transform.substring(rows[i].row.style.transform.indexOf("(") + 1,  rows[i].row.style.transform.indexOf("p"));
            let newTranslateY = parseFloat(prevTranslateY) + (input.offsetHeight/numberOfVisibleRows);
            rows[i].row.style.transform = "translateY(" +  newTranslateY + "px)";
        }
    }, 100);

    readjustHeight();
}

function createNewRow() {
    let newRow = document.createElement("div");
    let newRowP = document.createElement("p");
    newRow.style.height = input.offsetHeight/numberOfVisibleRows + "px";
    newRow.classList.add("row");
    newRowP.classList.add("row-p");
    newRow.appendChild(newRowP);
    let rowObject = new Row(newRow);

    return rowObject;
}

function makeVisibleRow(index,positionOnScreen) {
    for (let x = 0; x < rows[index].words.length; x++) {
        for (let i = 0; i < rows[index].words[x].length; i++) {
            let newCharacter = document.createElement("span");
            newCharacter.classList.add("character");
            newCharacter.innerText = rows[index].words[x].charAt(i);
            rows[index].addNewCell(newCharacter);
            if (i >= rows[index].words[x].length-1) {
                let space = document.createElement("span");
                space.classList.add("character");
                space.innerText = " ";
                rows[index].addNewCell(space);
            }
        }
    }
    rows[index].row.style.top = (input.offsetHeight/numberOfVisibleRows) * positionOnScreen + "px";
    input.appendChild(rows[index].row);
}

function writeIntialWords() {
    fixedText = text.replace("\n", " ").replace(/\s+/g, ' ');
    words = fixedText.split(" ");
    var done = false;
    let currentWord = 0;
    let y = 0;
    while(currentWord < words.length) {   
        let newRow = createNewRow();
        for (let x = 0; x < cellsPerRow; x++) {
            if (currentWord < words.length && currentWord >= 0) {
                if ((x + words[currentWord].length < cellsPerRow)) {
                    newRow.addNewWord(words[currentWord]);
                    x += words[currentWord].length;
                    currentWord++;
                }
                
            }
        }
        rows[y] = newRow;
        y++;
    }
}

function trim() {
    //trims all trailing whitespace but one
    for (let y = 0; y < numberOfVisibleRows; y ++) {
        let x = rows[y].cells.length-1;
        while(rows[y].cells[x-1].innerText == "" && x-1 > 0) {
            rows[y].cells[x].remove();
            rows[y].cells.pop();
            x--;
        }
    }
    
    //trims all leading whitespace
    for (let y = 0; y < numberOfVisibleRows; y++) {
        let x = 0;
        while(rows[y].cells[x].innerText == "" && x < rows[y].cells.length) {
            rows[y].cells[x].remove();
            rows[y].cells.pop();
            x++;
        }
    }
    
    for (let y = 0; y < numberOfVisibleRows; y++) {
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
    console.log("called");
    for (let y = hypotheticalCursorY; y < hypotheticalCursorY + numberOfVisibleRows; y++) {
        for (let x = 0 ; x < rows[y].cells.length; x++) {
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
