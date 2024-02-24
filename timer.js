let restSec = Math.floor(document.getElementById("rest-ex-sec").value);
let restMin = Math.floor(document.getElementById("rest-ex-min").value);

let totalSeconds = (restMin * 60) + restSec;
let seconds = totalSeconds;
let timerInterval;
let isPaused = false;
let initialTime;


function start(timer) {
    if (!timerInterval) {
        timerInterval = setInterval(()=>update(timer), 1000);
    }
};


function pause() {
    isPaused = true;
};


function resume() {
    isPaused = false;
};


function stop(timer) {
    clearInterval(timerInterval);
    timerInterval = null;
    reset(timer);
    console.log("stop");
};


//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
function update(timer) {
    if (!isPaused) {
        if (seconds > 0) {
            seconds--;
            console.log("sss");
        } else {
            stop(timer);
            timer.innerHTML = "00:00:00";
            return;
        }

        const formattedTime = pad(Math.floor(seconds / 3600)) + ':' +
                              pad(Math.floor((seconds % 3600) / 60)) + ':' +
                              pad(seconds % 60);

        timer.innerHTML = formattedTime;
        console.log("end of update");
    }
};
//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA


function reset(timer) {
    seconds = totalSeconds;
    timer.innerHTML = formatTime(totalSeconds);
};


function pad(value) {
    return value < 10 ? '0' + value : value;
};


function formatTime(seconds) {
    return pad(Math.floor(seconds / 3600)) + ':' +
           pad(Math.floor((seconds % 3600) / 60)) + ':' +
           pad(seconds % 60);
};

initialTime = formatTime(seconds);

export {
    start,
    pause,
    resume,
    stop,
    initialTime
}