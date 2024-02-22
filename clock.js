//HTML elementos del reloj
let timeDisplay = document.getElementById("timeDisplay");
//let pauseBtn = document.getElementById("pause-btn");
//let resetBtn = document.getElementById("reset-btn");

let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalId;
let hrs = 0;
let mins = 0;
let secs = 0;

let workOutList = Array;


//botón de start
let playClicked = () => {
    if(paused) {
        paused = false;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 1000);
    }
};


//botón de pause
let pauseClicked = () => {
    if(!paused) {
        paused = true;
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId);
    }
};


//botón de reset
let stopClicked = () => {
    paused = true;
    clearInterval(intervalId);
    startTime = 0;
    elapsedTime = 0;
    currentTime = 0;
    hrs = 0;
    mins = 0;
    secs = 0;
    timeDisplay.textContent = "00:00:00";
};


//la función que haga que el cronómetro funcione, es decir,
//la que actualiza el tiempo del cronómetro cada 1 segundo
function updateTime() {
    elapsedTime = Date.now() - startTime;

    secs = Math.floor((elapsedTime / 1000) % 60);
    mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
    hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);
    
    secs = extraZero(secs);
    mins = extraZero(mins);
    hrs = extraZero(hrs);

    timeDisplay.textContent = `${hrs}:${mins}:${secs}`;
};


//antepone un "0" extra a la unidad de tiempo si este es de
//solo dígito
function extraZero(unit) {
    return (("0") + unit).length > 2 ? unit : "0" + unit;
};

export {
    playClicked,
    pauseClicked,
    stopClicked
};