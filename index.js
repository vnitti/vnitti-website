import { generateWo, startUnlocked, selectList } from "./woGenerator.js";
import { clockStarted, clockPaused, clockStopped } from "./clock.js";
import {
    startTimer as timerStarted,
    pauseTimer as timerPaused,
    resumeTimer as timerResumed,
    stopTimer as timerStopped,
} from "./timer.js";

//let workOut;
/*
workOut = generateWo();

console.log(workOut);*/

let ul = document.getElementById("ul-wo");
let types = document.getElementById("ul-types");

let startBtn = document.getElementById("start-btn");

let pauseBtn = document.getElementById("pause-btn");
let resetBtn = document.getElementById("reset-btn");

let restExeSec = Math.floor(document.getElementById("rest-ex-sec").value);
let restExeMin = Math.floor(document.getElementById("rest-ex-min").value);
let restSerSec = Math.floor(document.getElementById("rest-se-sec").value);
let restSerMin = Math.floor(document.getElementById("rest-se-min").value);

let totalSecondsExe = (restExeMin * 60) + restExeSec;
let secondsExe = totalSecondsExe;
let totalSecondsSer = (restSerMin * 60) + restSerSec;
let secondsSer = totalSecondsSer;


console.log(totalSecondsExe);
console.log(totalSecondsSer);
console.log(secondsExe);
console.log(secondsSer);




//===FUNCIONES===
//vaciar ul-wo
let emptyUl = () => {
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
};

/*
//método que genera elementos <li>
let generateLi = () => {
    console.log("generating li's now")
    let li;
    workOut = generateWo();
    workOut.forEach((exercise, i) => {
        li = document.createElement("li");
        li.setAttribute("class","li-wo");
        li.setAttribute("id",`li-${i}`);
        li.textContent = exercise;
        ul.appendChild(li);     
    });
};*/


let startClicked = () => {
    if(startUnlocked) {
        emptyUl();
        clockStarted();
        timerStarted(secondsExe, totalSecondsExe, "timer1");
        timerStarted(secondsSer, totalSecondsSer, "timer2");
    }
};


let typesClicked = event => {
    selectList(event);
    generateWo();
};


types.addEventListener('click', event => typesClicked(event));
resetBtn.addEventListener('click', () => clockStopped());
pauseBtn.addEventListener('click', () => clockPaused());
startBtn.addEventListener('click', () => startClicked());


//BOTÓN "START"
//bloqueado hasta que se haya generado el workout
//al pulsarlo, inicia/abilita el cronómetro y mostrador de workout
//una vez pulsado, su nombre cambia a "Next"
//BOTÓN DE NEXT
//salta al siguiente elemento de la lista en el mostrador de workout
//sustituye al botón de "Start" una vez que este se haya pulsado
//al encontrarse en el último elemento de la lista del mostrador de
//workout, es sustituido por el botón de "=== FINISH ==="
//BOTÓN DE FINISH
//al pusarlo, el programa se reinicia por completo. Misma función del
//botón "Quit"


//MOSTRADOR DE WORKOUT
//indica la lista de ejercicios y descansos y en cuál de ellos nos 
//encontramos actualmente. Para ello, el código pone en highlight dicho
//elemento


//BOTÓN "QUIT"
//al pusarlo, el programa se reinicia por completo

