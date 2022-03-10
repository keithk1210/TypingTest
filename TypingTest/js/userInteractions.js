var userKeyInput = [];
var numberOfKeystrokes = 0;
var correctKeystrokes = 0;

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
                rows[cursor.lineInText].cells[cursor.position.x].style.color = root.getPropertyValue("--default-color");
                goBackOne();
                if (cursor.position.x == rows[cursor.lineInText].cells.length-1 && cursor.lineInText > 0) { //after moving back one, checks if you have now gone back to the prev row
                        goBackOneRow();
                }
                if (userKeyInput.length > 0) {
                    userKeyInput.pop();
                }
            } else if (event.key.length == 1 
                /*&& ((event.key != " " && !cursor.isOnEmptySpace()) 
            || (event.key == " " && cursor.isOnEmptySpace()))*/) {
                userKeyInput.push(event.key);
                //if (event.key != " ") {
                    numberOfKeystrokes++;
                    checkIfCorrect(event);
                //}
                if (cursor.position.x == rows[cursor.lineInText].cells.length-1 && cursor.lineInText > 0) {
                    advanceThroughSentence();
                    addNewRow();
                } else {
                    
                    advanceThroughSentence();
                }
            }
            calculateAccuracyAndUpdateDisplay();
            cursor.redraw();
        }
    });
}

function checkIfCorrect(event) {
    if (rows[cursor.lineInText].cells[cursor.position.x].innerText == event.key.trim()) {
        rows[cursor.lineInText].cells[cursor.position.x].style.color = root.getPropertyValue("--highlight-color");
        correctKeystrokes++;
    } else if ((event.key != "Shift" && event.key != "Backspace")) {
        rows[cursor.lineInText].cells[cursor.position.x].style.color = root.getPropertyValue("--incorrect-color");
    }
}

function advanceThroughSentence() {
    cursor.setScreenX = cursor.position.x + 1;
    if (cursor.position.x === rows[cursor.lineInText].cells.length) {
        cursor.setScreenX = 0;
        if (cursor.position.y != (numberOfVisibleRows-1)/2) {
            cursor.setScreenY = cursor.lineInText + 1;
        }
        cursor.setLineInText = ++cursor.lineInText;
    }
}

function goBackOne() {
    if (cursor.position.x == 0) {
        if (cursor.lineInText == 1 && cursor.lineInText == 1) {
            cursor.setLineInText = --cursor.lineInText;
            cursor.setScreenY = cursor.lineInText - 1;
            cursor.setScreenX = rows[cursor.lineInText].cells.length-1;
        } else if (cursor.lineInText > 0) {
            cursor.setLineInText = --cursor.lineInText;
            cursor.setScreenX = rows[cursor.lineInText].cells.length-1;
            //////console.log("x " + cursor.position.x + "");
        } 
    } else {
        cursor.setScreenX = cursor.position.x-1;
    }
}
//functions for readability
function moveCurrentWordBackward() {
    currentWord--;
    for (let i = numberOfVisibleRows-1; i >= 0; i--) {
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
    var previousWord;
    if (currentWord > 0) {
        previousWord = currentWord-1;
    } else {
        previousWord = currentWord;
    }
    let x = rows[numberOfVisibleRows-1].cells.length-2;
    let i = words[previousWord].length - 1;
    while (true) {
        //console.log(rows[numberOfVisibleRows-1].cells[x].innerText + " == " + words[currentWord-1].charAt(i) + " word: " + words[currentWord-1] + " i = " + i);
        if (rows[numberOfVisibleRows-1].cells[x].innerText != words[previousWord].charAt(i)) {
            break;
        } else if (i == 0){
            return;
        }
        x--;
        i--;
    }
    for (let y = 0; y < numberOfVisibleRows; y++) {
        for (let x = 0; x < rows[y].cells.length; x++) {
            if (rows[y].cells[x].innerText == "") {
                console.log(rows[y].cells[x]);
                console.log("currentword " + currentWord + " " + words[currentWord]);
                currentWord++;
            }
        }
    }
}