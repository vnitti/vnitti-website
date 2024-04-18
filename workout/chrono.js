//HTML elementos del reloj
let display = document.getElementById("chrono-display");
//let pauseBtn = document.getElementById("pause-btn");
//let resetBtn = document.getElementById("reset-btn");

let startTime = 0;
let currentTime = 0;
let interval = 0;
let isPaused = true;

function start() {
    if (isPaused) {
        console.log("chrono play");
        isPaused = false;
        startTime = currentTime;
        interval = setInterval(updateTime, 10);
    }
};

function updateTime() {
    currentTime = ++startTime;

    let mili = pad(Math.floor(currentTime % 100));
    let secs = pad(Math.floor((currentTime / 100) % 60));
    let mins = pad(Math.floor(((currentTime / 100) / 60) % 60));
    let hrs = pad(Math.floor((((currentTime / 100) / 60 ) / 60) % 60));

    display.innerText = `${hrs} : ${mins} : ${secs} : ${mili}`;
};

function stop() {
    console.log("chrono stopped");
    isPaused = true;
    clearInterval(interval);
    startTime = 0;
    currentTime = 0;
    display.innerText = "00:00:00";
};

function pause() {
    console.log("chrono paused");
    clearInterval(interval);
    isPaused = true;
};

function pad(num) {
    return num > 9 ? num : "0"+num;
};

export {
    start,
    pause,
    stop
};