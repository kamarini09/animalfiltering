"use strict";

window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];
//let animalChosen = "";
//const  globalObjectInput = {filter: ""} // its better to create a global variable to store your inputs but we dont need it now

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
    if (event.target.dataset.filter !== "*") {
        filteredList = allAnimals.filter(function whichAnimal(animal){
            if (animal.type === event.target.dataset.filter ){
                return true;
            }else{
                return false;
            }
        })
    }
    else {
        filteredList = allAnimals;
    }
    displayList(filteredList);
}
    
//--------previous way--------------------------
// function filterClick(event){
//     let filteredList;
//     globalObjectInput.filter = event.target.dataset.filter;
//     //i could have that in a different function
//     if (globalObjectInput.filter !== "*") {
//         filteredList = allAnimals.filter(whichAnimal)
//     }
//     else {
//         filteredList = allAnimals;
//     }
    // if (globalObjectInput.filter === "cat") {
    //     filteredList = allAnimals.filter(whichAnimal);
    // }  else if (globalObjectInput.filter === "dog") {
    //     filteredList = allAnimals.filter(whichAnimal);
    // } else if (globalObjectInput.filter === "*") {
    //     filteredList = allAnimals;
    // };
//     displayList(filteredList);
// }
    
// function whichAnimal(animal){
//     if (animal.type === globalObjectInput.filter ){
//         return true;
//     }else{
//         return false;
//     }
// }
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
    allAnimals = jsonData.map( preapareObject ); //it can be done with foEach but it needs a different syntax
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






