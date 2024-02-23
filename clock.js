//HTML elementos del reloj
let timeDisplay = document.getElementById("clockDisplay");
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


//botón de start
let clockStarted = () => {
    if(paused) {
        paused = false;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 1000);
    }
};


//botón de pause
let clockPaused = () => {
    if(!paused) {
        paused = true;
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId);
    }
};


//botón de reset
let clockStopped = () => {
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
    
    secs = pad(secs);
    mins = pad(mins);
    hrs = pad(hrs);

    timeDisplay.textContent = `${hrs}:${mins}:${secs}`;
};


//antepone un "0" extra a la unidad de tiempo si este es de
//solo dígito
function pad(unit) {
    return (("0") + unit).length > 2 ? unit : "0" + unit;
};

export {
    clockStarted,
    clockPaused,
    clockStopped
};