var currentCell;

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
    //cells[currentCell.y][currentCell.x].style.background = root.getPropertyValue("--cursor-color");
    checkIfCorrectKey(event);
    //console.log("!" + event.key + "!");
});

function checkIfCorrectKey(event) {
    //console.log("!" + cells[currentCell.y][currentCell.x].children[0].innerText + "!");
    if (event.key == "Backspace") {
        console.log("x " + currentCell.x + "y "+ currentCell.y);
        goBackOne();
        cells[currentCell.y][currentCell.x].style.color = root.getPropertyValue("--default-color");
    } else if (cells[currentCell.y][currentCell.x].innerText == event.key.trim()) {
        cells[currentCell.y][currentCell.x].style.color = root.getPropertyValue("--correct-color");
        advanceThroughSentence();
    } else if (event.key != "Shift") {
        cells[currentCell.y][currentCell.x].style.color = root.getPropertyValue("--incorrect-color");
        advanceThroughSentence();
    }
    let xUnit = input.offsetWidth/cellsPerRow;
    let yUnit = input.offsetHeight/rows;
    cursor.style.transform = "translateX(" + currentCell.x * xUnit + "px)";
    cursor.style.transform += "translateY(" + currentCell.y * yUnit + "px)";
}

function advanceThroughSentence() {
    console.log("x " + currentCell.x + "y "+ currentCell.y);
    currentCell.setX = currentCell.x + 1;
    if (currentCell.x === cellsPerRow) {
        currentCell.setX = 0;
        currentCell.setY = currentCell.y + 1;
    }
}

function goBackOne() {
    console.log("called");
    if (currentCell.x == 0) {
        if (currentCell.y != 0) {
        currentCell.setX = cellsPerRow-1;
        currentCell.setY = currentCell.y- 1;
        }
    } else {
        currentCell.setX = currentCell.x - 1;
    }
}