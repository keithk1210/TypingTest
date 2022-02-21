//numbers
const numberOfVisibleRows = 3;
const cellsPerRow = 25;
const accuracyDisplayIndex = 1;
//html elements
var input;
const root = getComputedStyle(document.documentElement);
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

const texts = [
    new TextButton("Tool", "Fear Inoculum", fearInoculum),
    new TextButton("Red Hot Chili Peppers", "Can't Stop", cantStop),
    new TextButton("Led Zeppelin", "Stairway to Heaven", stairwayToHeaven),
    new TextButton("The White Stripes", "Fell in Love With a Girl", fellInLoveWithAGirl)
]
