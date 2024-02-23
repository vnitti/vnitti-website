
let timerInterval;
let isPaused = false;


function startTimer(sec, totalSec, timerN) {
    console.log(`startTimer inside timer.js`);
    if (!timerInterval) {
        timerInterval = setInterval(updateTimer(sec, totalSec, timerN), 1000);
    }
}

function pauseTimer() {
    isPaused = true;
}

function resumeTimer() {
    isPaused = false;
}

function stopTimer(sec, totalSec) {
    clearInterval(timerInterval);
    timerInterval = null;
    resetTimer(sec, totalSec);
}
//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
function updateTimer(sec, totalSec, timerId) {
    if (!isPaused) {
        if (sec > 0) {
            sec--;
            console.log(`sec now is: ${sec}`);
        } else {
            stopTimer(sec, totalSec);
            console.log("timer has been stopped");
            return;
        }

        const formattedTime = pad(Math.floor(sec / 3600)) + ':' +
                              pad(Math.floor((sec % 3600) / 60)) + ':' +
                              pad(sec % 60);

        document.getElementById(timerId).innerHTML = formattedTime;
        console.log("end of updateTimer");
    }
}
//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
function resetTimer(sec, totalSec) {
    sec = totalSec;
    document.getElementById(timerId).innerHTML = formatTime(totalSec);
}

function pad(value) {
    return value < 10 ? '0' + value : value;
}

function formatTime(sec) {
    return pad(Math.floor(sec / 3600)) + ':' +
           pad(Math.floor((sec % 3600) / 60)) + ':' +
           pad(sec % 60);
}


export {
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
};