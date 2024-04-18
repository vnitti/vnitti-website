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
    types,
    radioBool,
    numberBool,
    selectExeBool,
    selectSetBool
} from "./workoutGenerator.js";

let startBtn = document.getElementById("start-btn");
let pauseBtn = document.getElementById("pause-btn");
let resumeBtn = document.getElementById("resume-btn");
let resetBtn = document.getElementById("reset-btn");
let nextBtn = document.getElementById("next-btn");
let generateBtn = document.getElementById("generate");

let selectedRadioBtn = null;
let isFinish = false;
let objBools = {
    removeLastLi: true,
    areSelectTrue: false
};

startBtn.disabled = true;
pauseBtn.disabled = true;
resetBtn.disabled = true;
resumeBtn.disabled = true;
nextBtn.disabled = true;
generateBtn.disabled = true;


/*Crear un addEventListener que chequee cuando workout type,
number of exercises,number of sets,rests 1 and rests 2 sean true.
Cuando se active, se desbloquee el generate button.

Creamos 7 addEventListener de tipo 'change', uno para cada input.
Cuando se activen, verificamos si el value de los inputs son true
Si todos son true


v2:
Agrupamos los 7 inputs en un inputArray.
Creamos un foreach que recorra inputArray y creamos un addEventListener para cada uno.
...

*/

//verifica que la haya cambiado un radio button del tipo de workput para así desbloquear el generate btn
types.addEventListener(
    'change',
    event => {
        selectedRadioBtn = event;
        //generateBtn.disabled = false;
        console.log(selectedRadioBtn.target);
    }
);

generateBtn.addEventListener(
    'click',
    () => {
        console.log(selectedRadioBtn);
        selectList(selectedRadioBtn);
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
        unmarkRadioButton(selectedRadioBtn.target);
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

document.addEventListener('boolchanged', () => {
    console.log("a bool has changed somewhere.");
    if(radioBool && numberBool && selectExeBool && selectSetBool) {
        console.log("generate btn should be enabled now")
        generateBtn.disabled = false;
    };
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