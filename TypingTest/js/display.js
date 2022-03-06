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
    
    cursorElement = document.createElement("div");
    cursorElement.classList.add("cursor");
    cursorElement.setAttribute("id","cursor");
    cursor.assignElement = cursorElement;

    input.appendChild(cursorElement);

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
    cursor.initialize();
    for (let y = 0; y < numberOfVisibleRows; y++) {
        makeVisibleRowAtPositionOnScreen(rows[y].row,y);
    }
    readjustHeight();
}

function addNewRow() { //TODO figure out why the animation does not occur when you back and then forward
    //when this function executes, hypotheticalCursorY corresponds to the row at numberOfVisibleRows-1 (the last one)
    rows[cursor.lineInText-2].row.remove();
    makeVisibleRowAtPositionOnScreen(rows[cursor.lineInText+1].row,numberOfVisibleRows); //makes it past the screen so that it can be dragged up
    
    setTimeout(function() {
        for (let i = cursor.lineInText-1; i < (cursor.lineInText-1) + numberOfVisibleRows; i++) { //iterates through the previous row, the current row, and the row to be added
            if (i == cursor.lineInText-1 + numberOfVisibleRows-1 || cursor.lineInText == 2) { //
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
    //when this function executes, the cursor will be at the first row
    rows[cursor.lineInText+2].row.remove();
    rows[cursor.lineInText-1].row.style.top = -input.offsetHeight/numberOfVisibleRows * 2 + "px";
    input.appendChild(rows[cursor.lineInText-1].row);
    
    setTimeout(function() {
        for (let i= cursor.lineInText-1; i < cursor.lineInText-1+numberOfVisibleRows; i++) {
            if (i == cursor.lineInText-1) {
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

function makeVisibleRowAtPositionOnScreen(row,positionOnScreen) {
    console.log("makeVisibleRowAtPositionOnScreen: " + input.offsetHeight/numberOfVisibleRows * positionOnScreen);
    row.style.top = (input.offsetHeight/numberOfVisibleRows) * positionOnScreen + "px";
    input.appendChild(row);
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

function readjustHeight() {
    console.log("called");
    for (let y = cursor.lineInText; y < cursor.lineInText + numberOfVisibleRows; y++) {
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

function calculateAccuracyAndUpdateDisplay() {
    let accuracy = (correctKeystrokes/numberOfKeystrokes * 100).toFixed(2);
    if (!isNaN(accuracy)) {
        durationMenu.children[accuracyDisplayIndex].innerText = accuracyDisplayInitialText + (correctKeystrokes/numberOfKeystrokes * 100).toFixed(1) + "%";
    }
}
