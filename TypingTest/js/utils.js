function CountdownTimer(duration, granularity) {
    this.duration = duration;
    this.tickFunctions = [];
    this.granularity = granularity;
    this.running = false;
}

CountdownTimer.prototype.start = function () {
    if (this.running) {
        return;
    }
    var start = Date.now(),
        that = this,
        diff, obj;
    this.running = true;
    (function timer() {
        diff = that.duration - (((Date.now() - start) / 1000  | 0));

        if (diff > 0) {
            setTimeout(timer, that.granularity);
        } else {
            diff = 0;
            that.running = false;
        }

        obj = CountdownTimer.parse(diff);
        that.tickFunctions.forEach(function(ftn) {
            ftn.call(this, obj.minutes, obj.seconds);
        }, that);
    }());
};

CountdownTimer.prototype.onTick = function (ftn) {
    if (typeof ftn === "function" ) {
        this.tickFunctions.push(ftn);
    }
    return this;
}

CountdownTimer.prototype.expired = function() {
    return !this.running;
};

CountdownTimer.parse = function(seconds) {
    return {
        'minutes': (seconds/60) | 0,
        'seconds': (seconds % 60) | 0
    };
};




/*
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function() {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if(--timer < 0) {
            timer = duration;
        }
    }, 1000);
}
*/