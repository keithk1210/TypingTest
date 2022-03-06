//numbers
const numberOfVisibleRows = 3;
const cellsPerRow = 25;
const accuracyDisplayIndex = 1;
//html elements
var input;
const root = getComputedStyle(document.documentElement);
var cursorElement;
var cursor;
const mainContent = document.querySelector(".main-content");
const durationMenu = document.getElementById("duration-menu");
var durationButtons = [];
const timerDisplay = document.createElement("span");
const listboxArea = document.querySelector(".listbox-area");
//sentences
const outputMsg = "Your results...";
const accuracyDisplayInitialText = "Accuracy: ";


class TextButton {
    constructor(author, title, content) {
        this.author = author;
        this.title = title;
        this.content = content;
        this.button;
    }
    set setButton(button) {
        this.button = button;
    }
}

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

class Cursor {
    constructor(initialPosition) {
        this.position = initialPosition;
        this.element;
        this.lineInText = 0;
    }
    set setScreenX(x) {
        this.position.setX = x;
    }
    set setScreenY(y) {
        this.position.setY = y;
    }
    set setLineInText(value) {
        this.lineInText = value;
    }
    set assignElement(element) {
        this.element = element;
    }
    isOnEmptySpace() {
        return rows[this.lineInText].cells[cursor.position.x].innerText == "" || rows[this.lineInText].cells[cursor.position.x].innerText == "\n";
    }
    redraw() {
        let xUnit = input.offsetWidth/rows[this.lineInText].cells.length;
        let yUnit = input.offsetHeight/numberOfVisibleRows;
        this.element.style.height = root.getPropertyValue("--cursor-height");
        this.element.style.top = (input.offsetHeight/numberOfVisibleRows)/2 - (this.element.offsetHeight/2) + "px";
        this.element.style.width = xUnit + "px";
        this.element.style.transform = "translateX(" + this.position.x * xUnit + "px)";
        this.element.style.transform += "translateY(" + this.position.y * yUnit + "px)";
    }
    initialize() {
        this.element.style.height = root.getPropertyValue("--cursor-height");
        this.element.style.top = (input.offsetHeight/numberOfVisibleRows)/2 - (this.element.offsetHeight/2) + "px";
        this.element.style.width = input.offsetWidth/cellsPerRow + "px";
    }
}

cursor = new Cursor(new Coord(0,0));


const texts = [
    new TextButton("Tool", "Fear Inoculum", fearInoculum),
    new TextButton("Red Hot Chili Peppers", "Can't Stop", cantStop),
    new TextButton("Led Zeppelin", "Stairway to Heaven", stairwayToHeaven),
    new TextButton("The White Stripes", "Fell in Love With a Girl", fellInLoveWithAGirl)
]
