window.onload = function() {

    var timer = new CountdownTimer(10);
    var display = document.getElementById("timer");
    var timeObj = CountdownTimer.parse(10);

    format(timeObj.minutes, timeObj.seconds);

    timer.onTick(format).onTick(endTest);

    window.addEventListener("keydown", function (event) {  
        if (event.key == "Enter" && timer.expired()) {
            prepareDisplay();
            initalizeDisplay();
            writeIntialWords();
            trim();
            timer.start();
            startGame();
        }
    });

    function format(minutes, seconds) {
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ':' + seconds;
    }
}