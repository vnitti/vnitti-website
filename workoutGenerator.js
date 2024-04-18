import {
    generateWo,
    selectList //no será usado
} from "./exerciseGenerator.js";

import {
    start as timerExeStart,
    pause as timerExePause, //no será usado
    stop as timerExeStop, //no será usado
    resume as timerExeResume,
    restMin as restMinExe,
    restSec as restSecExe,
    resumeSignal as resumeSignalExe,
    pad
} from "./timerRestExercise.js";

import {
    start as timerSerStart,
    pause as timerSerPause, //no será usado
    stop as timerSerStop, //no será usado
    resume as timerSerResume,
    restMin as restMinSer,
    restSec as restSecSer,
    resumeSignal as resumeSignalSer
} from "./timerRestSerie.js";

import {
    objBools
} from "./index.js";


let exerciseArray = null;
let finalArray = Array();
let isExerciseLast = false;
let counterForNextBtn = 0;
let counterForSeries = 0;
let li = null;
let listOfLi = null;
let restSerie = null;
let restExercise = null;
let isTimerExe = false;
let isTimerSer = false;
let generateBtnEnabled = false;

const types = document.getElementById("fieldset-types");
let exercisesUl = document.getElementById("ul-wo");
const nextBtn = document.getElementById("next-btn");
const numberExercisesInput = document.getElementById("number-exercises");
const numberRoundsInput = document.getElementById("number-rounds");
let selects = document.querySelectorAll("select");
let roundsInput = document.getElementById("number-rounds");
const numberInputs = document.querySelectorAll('input[type="number"]');
let numberBool = true;
const radioBtns = document.querySelectorAll('input[name="types"]');
let radioBool = false;
let rounds = parseFloat(roundsInput.value);
let optionBool = false;
let selectExeBool = false;
let selectSetBool = false;

const finishEvent = new CustomEvent('finish');
const disableNextEvent = new CustomEvent('disablenext');
const unlockGenBtnEvent = new CustomEvent('boolchanged');


//llena el finalArray
function serieCreator() { 
    finalArray = Array();
    restartCounters();
    emptyUl();
    rounds = parseFloat(document.getElementById("number-rounds").value); 
    restSerie = `Rest: ${pad(restMinSer.value)}:${pad(restSecSer.value)}`;
    restExercise = `Rest: ${pad(restMinExe.value)}:${pad(restSecExe.value)}`;
    let j = 0;
    exerciseArray = generateWo();
    
    for (let i = 0; i < exerciseArray.length*2; i++) {
        if (!isExerciseLast) {
            finalArray.push(exerciseArray[j++]);
            isExerciseLast = true;
        } else {
            i === (exerciseArray.length*2)-1 ? finalArray.push(restSerie) : finalArray.push(restExercise);
            isExerciseLast = false;
        };
        generateLi(finalArray[finalArray.length-1], i);
    };

    listOfLi = exercisesUl.querySelectorAll('li');
};


//toma un elemento del finalArray y lo convierte en li y lo hace hijo de exerciseUl
function generateLi(item) {
    li = document.createElement('li');
    li.setAttribute("class", "exercise-li");
    li.textContent = item;
    exercisesUl.appendChild(li);
};


document.addEventListener('timeOutExe', () => next());
document.addEventListener('timeOutSer', () => next());

//determina cuál elemento de la lista es el active item
function next() {
    if (isTimerExe) {
        timerExeStop();
        isTimerExe = false;
        console.log("timerEXE was either out or skipped, it should be 00:00 now");
    };

    if (isTimerSer) {
        timerSerStop();
        isTimerSer = false;
        console.log("timerSer was either out or skipped, it should be 00:00 now");
    };
    
    console.log(`${counterForNextBtn} y ${counterForSeries}`);
    removeIdFromAll();
    selectActiveItem(listOfLi[++counterForNextBtn]);

    //si se esta en la última serie
    if (counterForSeries === rounds-1) {
        if(objBools.removeLastLi) {
            let lastLi = exercisesUl.lastElementChild;
            lastLi.remove();
            objBools.removeLastLi = false;
        };
        
        //si se está en la última serie y en la penúltima posicion de la lista
        if (counterForNextBtn === finalArray.length-2) {
            console.log("workout is over");
            document.dispatchEvent(disableNextEvent);
            document.dispatchEvent(finishEvent);
        };
    };

    //si el active item es un timer (múltiplo de 2), se tiene dos opciones:
    if (counterForNextBtn % 2 !== 0 && counterForNextBtn !== 0) {        
        if (counterForNextBtn === finalArray.length - 1) {
            //si está en la penúltima posición del array, empieza a correr el timer serie
            isTimerSer = true;
            counterForSeries++;
            timerSerStart();
            counterForNextBtn = -1;
        } else {
            //si no es timer serie, entonces es timer exercise
            isTimerExe = true;
            timerExeStart();
        };
    };
};


//convierte el li dado en el active item dándole un atributo id = "active"
function selectActiveItem(activeItem) {
    if (activeItem == null) {
        console.log("hey! active item is null!");
        activeItem = listOfLi[0];
    };
    activeItem.setAttribute("id", "active");
};


//le quita el id="active" a todos los li
function removeIdFromAll() {
    listOfLi.forEach(item => item.removeAttribute('id'));
};


//reinicia los contadores del nextBtn y el de las series
function restartCounters() {
    counterForNextBtn = 0;
    counterForSeries = 0;
    console.log("counters restarted");
    console.log(`${counterForNextBtn} y ${counterForSeries}`);
};


//desmarca los radio buttons
function unmarkRadioButton(radio) {
    radio.checked = false;
};


//vacía la ul del workout display
function emptyUl() {
    while (exercisesUl.firstChild) {
        exercisesUl.removeChild(exercisesUl.firstChild);
    }
};


//desabilita todos los inputs
function disableInputs() {
    roundsInput.disabled = true;
    numberExercisesInput.disabled = true;
    restMinExe.disabled = true;
    restSecExe.disabled = true;
    restMinSer.disabled = true;
    restSecSer.disabled = true;

    const radioInputs = types.querySelectorAll('input[type="radio"]');
    radioInputs.forEach(input => {
        input.disabled = true;
    });
};


//habilita todos lo inputs
function enableInputs() {
    roundsInput.disabled = false;
    numberExercisesInput.disabled = false;
    restMinExe.disabled = false;
    restSecExe.disabled = false;
    restMinSer.disabled = false;
    restSecSer.disabled = false;

    const radioInputs = types.querySelectorAll('input[type="radio"]');
    radioInputs.forEach(input => {
        input.disabled = false;
    });
}


let popupBubble = document.getElementById('popup-msg');

function showPopup(msg) {
    popupBubble.textContent = msg;
    popupBubble.style.display = 'block';
    popupBubble.style.opacity = '1';

    setTimeout(() => {
        popupBubble.style.opacity = '0'; // Fade out by setting opacity to 0
        // Hide the popup bubble after the fade out animation completes
        setTimeout(() => {
            popupBubble.style.display = 'none';
        }, 1000); // Delay to match the transition duration
    }, 2500); // 3000 milliseconds = 3 seconds
};


//si un radio btn es marcado, radioBool se hace true, uno de
//los 4 booleanos requisitos para que el generate button se desbloquee
radioBtns.forEach(radio => {
    radio.addEventListener('change', ()=> {
        if(radio.checked) {
            console.log("radio btn has been changed");
            radioBool = true;
            document.dispatchEvent(unlockGenBtnEvent);
        } else {
            radioBool = false;
        }
    });
});


//si el input es número, selectBool se hace true, uno de
//los 4 booleanos requisitos para que el generate button se desbloquee
checkSelect(numberExercisesInput);
checkSelect(numberRoundsInput);

function checkSelect(select) {
    select.addEventListener('change', () => {
        const selectedOption = select.value;
        const currentSelect = null;
        //select === numberExercisesInput ? currentSelect = numberExercisesInput : currentSelect = numberRoundsInput;
    
        if (!isNaN(selectedOption) && selectedOption !== "") {
            if(select == numberExercisesInput) {
                selectExeBool = true;
                console.log(`selectExeBool is now ${selectExeBool}`);
            } else {
                selectSetBool = true;
                console.log(`selectSetBool is now ${selectSetBool}`);
            };

            document.dispatchEvent(unlockGenBtnEvent);
            
        } else {
            selectExeBool = false;
            selectSetBool = false;
            console.log(`selectExeBool is now ${selectExeBool}`);
        };
    });
};


numberInputs.forEach(input => {

    //impide que se introduzcan mas de dos caracteres en los input de tipo number
    input.addEventListener('input', () => {
        let inputValue = input.value;
        if (inputValue.length > 2) {
            inputValue = inputValue.slice(0, 2);
            console.log("more than two characters!");
            input.value = inputValue;
        };    
    });

    input.addEventListener('blur', () => {
        const min = parseInt(input.getAttribute('min'));
        const max = parseInt(input.getAttribute('max'));
        let value = parseInt(input.value);
        let id = input.id;
        let messageArray = null;
        let message = "";

        //si el input es número, selectExeBool o selectSetBool se hace true, uno de
        //los 4 booleanos requisitos para que el generate button se desbloquee
        if(!isNaN(input.value) && input.value > input.getAttribute('min') && input.value < input.getAttribute('max')) {
            console.log("an input number has been 'blured'");
            numberBool = true;
            document.dispatchEvent(unlockGenBtnEvent);
        } else {
            numberBool = false;
            console.log("requirements weren't met. Please insert a valid input number");
        };
        
        //muestra un popup message cuando se insertan valores menores/mayores a los límites
        const pleaseMsg =  `Please set a number between ${min} and ${max}.`;
        const invalidMsg = `Please set a valid number.`;

        const secMaxMsg = `The max number of seconds is ${max}.`;
        const secMinMsg = `The min number of seconds ${min}.`;
        const secArray = [secMinMsg, secMaxMsg];

        const minMaxMsg = `The max number of minutes is ${max}.`;
        const minMinMsg = `The min number of minutes is ${min}.`;
        const minArray = [minMinMsg, minMaxMsg];

        switch (id) {
            case "input-exe-min":
                messageArray = minArray;
                break;
            case "input-ser-min":
                messageArray = minArray;
                break;
            case "input-exe-sec":
                messageArray = secArray;
                break;
            case "input-ser-sec":
                messageArray = secArray;
        };

        if (value < min) {
            value = min;
            message = messageArray[0];
            showPopup(message + pleaseMsg);
        } else if (value > max) {
            value = max;
            message = messageArray[1];
            showPopup(message + pleaseMsg);
        } else if (isNaN(value)) {
            value = min;
            showPopup(invalidMsg);
        };
        
        input.value = pad(value);
    });
});



export {
    timerExeStart,
    timerExePause,
    timerExeStop,
    timerSerStart,
    timerSerPause,
    timerSerStop,
    timerExeResume,
    timerSerResume,
    selectList,
    serieCreator,
    next,
    selectActiveItem,
    resumeSignalSer,
    resumeSignalExe,
    removeIdFromAll,
    emptyUl,
    unmarkRadioButton,
    disableInputs,
    enableInputs,
    types,
    isTimerExe,
    isTimerSer,
    radioBool,
    numberBool,
    selectExeBool,
    selectSetBool
};


//Aquí hay que importar start, pause y stop de los dos timers. workoutGenerator.js es padre de
//los timers e hijo de index. Pause y stop probablemente no se usen para funciones de
//este módulo, asi que solo serán importdos para exportárselos a index.

//No es necesario importar nada de chrono, eso puede ir directamente a index. Es decir, chrono
//es hijo de index, y tío de los timers.

//Cuando el highlight repose sobre rest exercise timer o rest serie timer, el timer se acciona
//y cuando el timer llegue a 0, se activa la nextFunction y el highlight pasará a estar en el
//siguiente elemento del ul.

//Se necesita un método de autoNext para cuando el timer llegue a 0 y el highligh avance.
//if (timer === 0) {nextFunction()}
//ya que workoutGenerator.js se encarga del paginator, esta función puede ir aquí.

//selectList() tampoco será usado aquí, sólo se importó para exportarlo a index