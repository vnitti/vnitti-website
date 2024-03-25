import {
    start as chronoStart,
    pause as chronoPause,
    stop as chronoStop
} from "./chrono.js";

import {
    timerExePause,
    timerExeStop,
    timerSerPause,
    timerSerStop,
    timerExeResume,
    timerSerResume,
    selectList,
    serieCreator,
    next,
    selectActiveItem,
    resumeSignalExe,
    resumeSignalSer,
    removeIdFromAll,
    emptyUl,
    unmarkRadioButton,
    disableInputs,
    enableInputs,
    types
} from "./workoutGenerator.js";


let startBtn = document.getElementById("start-btn");
let pauseBtn = document.getElementById("pause-btn");
let resumeBtn = document.getElementById("resume-btn");
let resetBtn = document.getElementById("reset-btn");
let nextBtn = document.getElementById("next-btn");
let generateBtn = document.getElementById("generate");
let eventt = null;
let isFinish = false;
let boolRemove = {value: true}

startBtn.disabled = true;
pauseBtn.disabled = true;
resetBtn.disabled = true;
resumeBtn.disabled = true;
nextBtn.disabled = true;
generateBtn.disabled = true;


types.addEventListener(
    'change',
    event => {
        eventt = event;
        generateBtn.disabled = false;
        console.log(eventt.target);
    }
);

generateBtn.addEventListener(
    'click',
    () => {
        console.log(eventt);
        selectList(eventt);
        serieCreator();
        startBtn.disabled = false;
    }
);

startBtn.addEventListener(
    'click',
    () => {
        if(!startBtn.disabled) {
            chronoStart();
            selectActiveItem(); 
            pauseBtn.disabled = false;
            resetBtn.disabled = false;
            nextBtn.disabled = false;
            startBtn.disabled = true;
            disableInputs();
        };
    }
);

nextBtn.addEventListener(
    'click',
    () => {
        console.log(boolRemove.value);
        next();
    }
);

pauseBtn.addEventListener(
    'click',
    () => {
        timerExePause();
        timerSerPause();
        chronoPause();
        resumeBtn.disabled = false;
        pauseBtn.disabled = true;
    }
);

resetBtn.addEventListener(
    'click',
    () => {       
        chronoStop();
        if (resumeSignalExe) timerExeStop();
        if (resumeSignalSer) timerSerStop();
        removeIdFromAll(); 
        startBtn.disabled = true;
        pauseBtn.disabled = true;
        resetBtn.disabled = true;
        resumeBtn.disabled = true;
        nextBtn.disabled = true;
        generateBtn.disabled = true;
        emptyUl();
        unmarkRadioButton(eventt.target);
        enableInputs();
        if(isFinish){
            resetBtn.innerText = "Quit";
            alert("=== You Made It!=== \nCongratulations on finishing the workout.\n:)");
            boolRemove.value = true;
            isFinish = false;
        };
    }
);

resumeBtn.addEventListener(
    'click',
    () => {
        chronoStart();
        if (resumeSignalExe) timerExeResume();      
        if (resumeSignalSer) timerSerResume();
        pauseBtn.disabled = false;
        resumeBtn.disabled = true;
    }
);

document.addEventListener('disablenext', () => {
    nextBtn.disabled = true;
})

document.addEventListener('finish', () => {
    resetBtn.innerText = "FINISH";
    isFinish = true;
});

export {
    boolRemove
}





//BOTÓN "START"
//bloqueado hasta que se haya generado el workout
//al pulsarlo, inicia/abilita el cronómetro, timers y mostrador de workout
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

//Siguientes pasos:
//number of sets visible en el display