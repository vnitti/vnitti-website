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
let objBools = {
    removeLastLi: true
};

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
        console.log(objBools.removeLastLi);
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
        nextBtn.disabled = true;
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
            objBools.removeLastLi = true;
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
        if(!isFinish) {
            nextBtn.disabled = false;
        };
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
    objBools
}




//SIGUIENTES PASOS:
//number of sets visible en el display

//WARNING: generate workout btn no se activa incluso después de haber clickeado types, al parecer
//porque aun no ha terminado de cargar. Puede ser una buena manera de usar asincronía

//BUG: timerexe activo > quit > cuando inicias un nuevo workout, el ultimo li no desaparece
//en la última set