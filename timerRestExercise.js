import {
    isTimerExe
} from "./workoutGenerator.js";

let restSec = document.getElementById("input-exe-sec");
let restMin = document.getElementById("input-exe-min");
let initialSecs = Math.floor(restSec.value) + (Math.floor(restMin.value) * 60);
let initialTime = initialSecs * 100; //todo se manejará en centisegundos
let startTime = initialTime;
let currentTime = 0;
let interval = null;
let secs = 0;
let mins = 0;
let isPaused = true;
let resumeSignal = false;
let timeDisplay = null;


function setMinSec() {
    restSec = document.getElementById("input-exe-sec");
    restMin = document.getElementById("input-exe-min");
};

function setInitialTime() {
    setMinSec();
    initialSecs = Math.floor(restSec.value) + (Math.floor(restMin.value) * 60);
    initialTime = initialSecs * 100; //todo se manejará en centisegundos
    startTime = initialTime;
};

function start() {
    timeDisplay = document.getElementById("active");
    resumeSignal = true;
    setInitialTime();
    resetTimer();
    if(isPaused) {
        console.log("timerExe play");
        isPaused = false;
        interval = setInterval(updateTime, 10);
    };
};

function updateTime() {
    currentTime = --startTime;

    secs = pad(Math.floor((currentTime / 100) % 60));
    mins = pad(Math.floor((currentTime / 100) / 60) % 60);

    timeDisplay.innerText = `Rest: ${mins}:${secs}`;

    if (currentTime === 0) {
        stop();
        timeOut();
    }; 
};

function pause() {
    if (isTimerExe) {
        console.log("timerExe paused");
        clearInterval(interval);
        startTime = currentTime;
        isPaused = true;  
    };
};

function resume() {
    if (isPaused && isTimerExe) {
        console.log("timerExe resumed");
        interval = setInterval(updateTime, 10);
        isPaused = false;
    } else {
        console.log("it worked");
    }
};

function stop() {
    console.log("timerExe stopped");
    clearInterval(interval);
    startTime = initialTime;
    isPaused = true;
    resetTimer();
};

function resetTimer() {
    mins = pad(Math.floor(((initialTime / 100) / 60) % 60));
    secs = pad(Math.floor((initialTime / 100) % 60));

    timeDisplay.innerText = `Rest: ${mins}:${secs}`;
};

function makeItZero() {
    timeDisplay.innerText = `Rest: 00:00`;
    console.log("makeitzeroExe");
}

function timeOut() {
    const timeOutEvent = new CustomEvent('timeOutExe');
    document.dispatchEvent(timeOutEvent);
    console.log("time exe is out b*tch!");
};

function pad(num) {
    return ("0"+num).length > 2 ? num : "0"+num;
};


export {
    start,
    pause,
    stop,
    resume,
    restMin,
    restSec,
    resumeSignal,
    timeOut,
    pad,
    makeItZero
};
