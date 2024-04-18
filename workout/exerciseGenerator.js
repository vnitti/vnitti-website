//esta app genera 4 ejercicios aleatoriamente de una misma categoria,
//ya sea Push, Pull o Leg. Sabe detectar cuando un ejercicio ya fue
//agregado y evita agregarlo de nuevo
import { pullList, pushList, legList } from './lists.js';

//HTML elementos generales

//variales globales
let workOutList = Array;
let number = 0;

//=====FUNCIONES======

//determina el el id del radio que se marcó y luego, según eso,
//determina la lista a la que se igualará el array workOutList
function selectList(event) {
    switch(event.target.id) {
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
            console.error("ERROR: Please select a workout type.");
    };
};


//genera un número aleatorio entre 0 y la cantidad total de posiciones del array workOutList
function randomNumber() {
    return Math.floor(Math.random() * workOutList.length);
};


//genera y retorna el workout
function generateWo() {
    //console.log("generateWo activated");
    let rn = null;
    number = parseFloat(document.getElementById("number-exercises").value);
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
        console.log(`${i+1}: ${wo[i]}`);
    }
    return wo;
};


export { 
    generateWo,
    selectList
};