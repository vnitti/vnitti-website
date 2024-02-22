//esta app genera 4 ejercicios aleatoriamente de una misma categoria,
//ya sea Push, Pull o Leg. Sabe detectar cuando un ejercicio ya fue
//agregado y evita agregarlo de nuevo
import { pullList, pushList, legList } from './lists.js';

//HTML elementos generales
let types = document.getElementById("ul-types");
let startUnlocked = false;

//variales globales
let workOutList = Array;

//=====FUNCIONES=====

//determina el el id del radio que se marcó y luego, según eso,
//determina la lista a la que se igualará el array workOutList
//v2
let selectList = () => {
    let selected;
    const clickedRadio = event.target;
    startUnlocked = true;
    
    if (clickedRadio.checked) {
        selected =  clickedRadio.id;
    }

    switch(selected) {
        case "pull-input":
            workOutList = pullList;
            break;
        case "push-input":
            workOutList = pushList;
            break;
        case "leg-input":
            workOutList = legList;
            break;
        default:
            console.log("Please select a workout type.");
    }
};


//v1
/*
let selectList = () => {
    let selected;
    types.addEventListener('change', event => {
        const clickedRadio = event.target;
        startUnlocked = true;
    
        if (clickedRadio.checked) {
            selected =  clickedRadio.id;
        }

        switch(selected) {
            case "pull-input":
                workOutList = pullList;
                break;
            case "push-input":
                workOutList = pushList;
                break;
            case "leg-input":
                workOutList = legList;
                break;
            default:
                console.log("Please select a workout type.");
        }
    })
};
*/
selectList();

//genera un número aleatorio entre 0 y la cantidad total de posiciones del array workOutList
let randomNumber = () => {
    return Math.floor(Math.random() * workOutList.length);
};


//genera y retorna el workout
let generateWo = () => {
    let rn;
    let number = parseFloat(document.getElementById("number-exercises").value);
    let wo = Array(number);
    
    for (let i=0; i<number; i++) {
        rn = randomNumber();
        //este condicional es para evitar ejercicios duplicados
        if(wo.some(exercise => workOutList[rn] === exercise)) {           
            do {
                rn = randomNumber();
            } while (wo.some(exercise => workOutList[rn] === exercise));
        }
        wo[i] = workOutList[rn];
        //console.log(`${i+1}: ${wo[i]}`);
    }
    return wo;
};

export { 
    generateWo,
    selectList,
    startUnlocked,
    pullList,
    pushList,
    legList
};