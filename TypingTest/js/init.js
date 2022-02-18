class DurationButton {
    constructor(button,duration) {
        this.button = button;
        this.duration = duration;
    }
}

var duration;
var timer;

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

    window.addEventListener("keydown", function (event) { 
        if (typeof timer === 'undefined') {
            var timer = new CountdownTimer(duration);
            var timeObj = CountdownTimer.parse(duration);
            format(timeObj.minutes, timeObj.seconds);
            timer.onTick(format).onTick(endTest);
        }
        if (typeof duration === 'undefined') {
            document.getElementById("start-instructions").style.color = root.getPropertyValue("--incorrect-color");
            document.getElementById("start-instructions").innerText = "Please select a test duration.";
            return;
        }
        if (event.key == "Enter" && timer.expired()) {
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