class DurationButton {
    constructor(button,duration) {
        this.button = button;
        this.duration = duration;
    }
}

var duration;
var timer;
var timeObj;

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

    window.addEventListener("keydown", function (event) { 
        if (typeof timer == 'undefined') {
            timer = new CountdownTimer(999);
            timeObj = CountdownTimer.parse(999);
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
            initalizeDisplayForTest();
            writeIntialWords();
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

function varsReady() {
    return typeof timer != 'undefined' && typeof text != 'undefined';
}