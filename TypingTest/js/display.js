var cells = new Array(numberOfRows);
var rows = [];

for (let x = 0; x < numberOfRows; x++) {
    cells[x] = new Array(cellsPerRow);
}

window.onload = function() {
    document.querySelector(".container").classList.add("container-inactive");
    
    var timer = new CountdownTimer(60);
    var display = document.getElementById("timer");
    var timeObj = CountdownTimer.parse(60);

    format(timeObj.minutes, timeObj.seconds);

    timer.onTick(format);

    document.getElementById("start-button").onclick = function () {
        prepareDisplay();
        initalizeDisplay();
        writeSentence(sentence1);
        trim();
        timer.start();
    }

    function format(minutes, seconds) {
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ':' + seconds;
    }
}

function prepareDisplay() {
    document.querySelector(".container").classList.remove("container-inactive");
    document.querySelector(".container").classList.add("container-active");
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
        let newRow = document.createElement("div");
        let newRowP = document.createElement("p");
        newRow.classList.add("row");
        newRowP.classList.add("row-p");
        newRow.appendChild(newRowP);

        for (let x = 0; x < cellsPerRow; x++) {
            let newCharacter = document.createElement("span");
            newCharacter.classList.add("character");
            ///console.log(input.offsetWidth);
            //newCharacter.style.width = width/cellsPerRow + "%";
            newRowP.appendChild(newCharacter);
            cells[y][x] = newCharacter;
        }
        
        
        input.appendChild(newRow);
        rows[y] = new Row(newRow,cellsPerRow);
    }
}

function writeSentence(sentence) {
    let wordIndex = 0;
    let words = sentence.split(' ');
    for (let y = 0; y < numberOfRows; y++) {   
        //console.log(y);
        for (let x = 0; x < cellsPerRow; x++) {
            //if the row can fit the word, then add it
            if (wordIndex < words.length) {
                if ((x + words[wordIndex].length < cellsPerRow)) {
                    //writes out word
                    for (let i = 0; i < words[wordIndex].length; i++) {
                        //if (words[wordIndex].charAt(i) != " ") {
                            //console.log(words[wordIndex].charAt(i));
                            cells[y][x].innerText = words[wordIndex].charAt(i);
                            x++;
                        //}
                    }
                    //moves on to next word
                    wordIndex++;
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


/*
function createCharacter(char) {
    let newCharacter = document.createElement("span");
    newCharacter.classList.add("character");
    newCharacter.style.width = input.offsetWidth/cellsPerRow + "%";
    newCharacter.innerText = char;
    return newCharacter;
}


/*
function writeSentence(sentence) {
    let counter = 0;
    let split = sentence.split('');
    for (let y = 0; y < cells.length; y++) {
        let str = "";
        for (let x = 0; x < cells[y].length; x++) {
            if (split[counter] === undefined) {
                return;
            }
            cells[y][x].innerText = split[counter];
            counter++;
        }
    }
}
*/