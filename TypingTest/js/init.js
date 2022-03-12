class DurationButton {
    constructor(button,duration) {
        this.button = button;
        this.duration = duration;
    }
}

var duration = 0;
var timer;
var timeObj;
var delay = 0;

window.onload = function() {

    for (let i = 0; i < 3; i ++) {
        let newButton = document.createElement("span");
        let buttonDuration = (i+1) * 60;
        newButton.classList.add("duration-button");
        newButton.onclick = function(event) {
            duration = buttonDuration;
            for (let i = 0; i < durationButtons.length; i++) {
                if (durationButtons[i].button === newButton) {
                    newButton.style.background = root.getPropertyValue("--selected-color");
                } else {
                    durationButtons[i].button.style.background = root.getPropertyValue("--highlight-color");
                }
            }
        };
        durationButtons[i] = new DurationButton(newButton, buttonDuration);
    }

    for (let i = 0; i < durationButtons.length; i++) {
        let minutes = "" + Math.floor(durationButtons[i].duration / 60);
        let seconds = durationButtons[i].duration % 60;
        let formattedSeconds = (seconds < 10) ? "0" + seconds : "" + seconds;
        durationButtons[i].button.innerText = minutes + ":" + formattedSeconds; 
        durationMenu.appendChild(durationButtons[i].button);
    }

    for (let i = 0; i < texts.length; i++) {
        let newListItem = document.createElement("li");
        texts[i].setButton = newListItem;
        newListItem.innerText = texts[i].author + " - " + texts[i].title;
        newListItem.onclick = function() {
            text = texts[i].content;
            console.log(text);
            for (let i = 0; i < texts.length; i++) {
                if (newListItem == texts[i].button) {
                    texts[i].button.classList.add("listbox-item-selected");
                } else {
                    texts[i].button.classList.remove("listbox-item-selected");
                }
            }
        }
        document.getElementById("texts-list").appendChild(newListItem);
    }

    window.addEventListener("keydown", function (event) { ` vbb `
        if (typeof timer == 'undefined') {
            timer = new CountdownTimer(duration);
            timeObj = CountdownTimer.parse(1);
            format(timeObj.minutes, timeObj.seconds);
            timer.onTick(format).onTick(endTest);
        }
        if (!varsReady() && event.key == "Enter") {
            document.getElementById("start-instructions").style.color = root.getPropertyValue("--incorrect-color");
            document.getElementById("start-instructions").innerText = "Please select a test duration and text, then press enter.";
            return;
        }
        if (event.key == "Enter" && timer.expired() && varsReady()) {
            prepareDisplayForTest();
            writeIntialWords();
            initializeDisplayForTest();
            trim();
            timer.start();
            startGame();
        }
    });

    function format(minutes, seconds) {
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        timerDisplay.textContent = minutes + ':' + seconds;
    }
}

window.addEventListener("mousemove", event => {
    if (delay <= 0) {
        console.log("x " + event.x + " y " + event.y);
        delay = 100;
    } else {
        delay--;
    }
});

function writeIntialWords() {
    fixedText = text.replace("\n", " ").replace(/\s+/g, ' ');
    words = fixedText.split(" ");
    var done = false;
    let currentWord = 0;
    let y = 0;
    while(currentWord < words.length) { //assigns what words go to each row
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
    for (let y = 0; y < rows.length; y++) { //turns  the words to cells and adds a space at the end
        for (let x = 0; x < rows[y].words.length; x++) {
            for (let i = 0; i < rows[y].words[x].length; i++) {
                let newCharacter = document.createElement("span");
                newCharacter.classList.add("character");
                newCharacter.innerText = rows[y].words[x].charAt(i);
                rows[y].addNewCell(newCharacter);
                if (i == rows[y].words[x].length-1) {
                    let space = document.createElement("span");
                    space.classList.add("character");
                    space.innerText = " ";
                    rows[y].addNewCell(space);
                }
            }
        }
    }
}

function varsReady() {
    return typeof timer != 'undefined' && text != "null";
}