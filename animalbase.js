"use strict";

window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];
let animalChosen = "";

// The prototype for all animals: 
const Animal = {
    name: "",
    desc: "-unknown animal-",
    type: "",
    age: 0
};

function start( ) {
    console.log("ready");
    clickButtons();
    loadJSON();
}

// add eventListeners to the buttons
function clickButtons(){
    document.querySelectorAll(".filter").forEach((each) =>{
        each.addEventListener("click", filterClick);
    });
   
}
// ---------------------FILTERING---------------------------
function filterClick(event){
    let filteredList;
    animalChosen = event.target.dataset.filter;
    if (animalChosen === "cat") {
        filteredList = allAnimals.filter(whichAnimal);
    }  else if (animalChosen === "dog") {
        filteredList = allAnimals.filter(whichAnimal);
    } else if (animalChosen === "*") {
        filteredList = allAnimals;
    };
    displayList(filteredList);
}
    
function whichAnimal(animal){
    if (animal.type === animalChosen ){
        return true;
    }else{
        return false;
    }
}
//instead of this for each animal i did the previous function
// function isCat(animal){
//     if (animal.type === "cat" ){
//         return true;
//     }else{
//         return false;
//     }
// }


//-------------------------- OBJECT FROM DATABASE ---------------
async function loadJSON() {
    const response = await fetch("animals.json");
    const jsonData = await response.json();
    
    // when loaded, prepare data objects
    prepareObjects( jsonData );
}

function prepareObjects( jsonData ) {
    allAnimals = jsonData.map( preapareObject );
    displayList(allAnimals);
}

function preapareObject( jsonObject ) {
    const animal = Object.create(Animal);
    const texts = jsonObject.fullname.split(" ");
    animal.name = texts[0];
    animal.desc = texts[2];
    animal.type = texts[3];
    animal.age = jsonObject.age;
    return animal;
}

//--------------------------DISPLAY-----------------------------
function displayList(animals) {
    // clear the list
    document.querySelector("#list tbody").innerHTML = "";

    // build a new list
    animals.forEach( displayAnimal );
}

function displayAnimal( animal ) {
    // create clone
    const clone = document.querySelector("template#animal").content.cloneNode(true);

    // set clone data
    clone.querySelector("[data-field=name]").textContent = animal.name;
    clone.querySelector("[data-field=desc]").textContent = animal.desc;
    clone.querySelector("[data-field=type]").textContent = animal.type;
    clone.querySelector("[data-field=age]").textContent = animal.age;

    // append clone to list
    document.querySelector("#list tbody").appendChild( clone );
}






