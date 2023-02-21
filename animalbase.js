"use strict";

window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];

// The prototype for all animals: 
const Animal = {
    name: "",
    desc: "-unknown animal-",
    type: "",
    age: 0 ,
    star: false
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

    document.querySelectorAll("[data-action=sort]").forEach((each) =>{
        each.addEventListener("click", sortClick);
    }); 
   
}
// ---------------------FILTERING---------------------------
function filterClick(event){
    let filteredList;
    if (event.target.dataset.filter !== "*") {
        filteredList = allAnimals.filter(function whichAnimal(animal){ //its a differnet way with closure
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


// ---------------------SORTING---------------------------

function sortClick(event){

    const sortBy = event.target.dataset.sort;
    const sortDir = event.target.dataset.sortDirection;

    //toggle the direction
    if(sortDir === "asc"){
        event.target.dataset.sortDirection = "desc";
    }else{
        event.target.dataset.sortDirection = "asc";
    }
    console.log(`user selected ${sortBy} - ${sortDir}`)
    sortList(sortBy, sortDir)
    
    
}



function sortList(sortBy , sortDir){
     let sortedList = allAnimals;
     let direction = 1;
     if(sortDir === "desc"){
        direction = -1;
     } else {
        direction = 1;
     }
    
     sortedList = sortedList.sort(sortByInput);
    
      function sortByInput(animalA, animalB){
        console.log(`sorted by ${sortBy}`)
        if(animalA[sortBy]   < animalB[sortBy]){
            return -1 * direction;
        }else{
            return 1 * direction;
        }
    }
     displayList(sortedList);
    
       
}
    


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

function buildList() {
    const currentList = allAnimals; // FUTURE: Filter and sort currentList before displaying

    displayList( currentList );
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
    // TODO: Show star ⭐ or ☆
    if(animal.star){
        clone.querySelector("[data-field=star]").textContent = "⭐";

    }else{
        clone.querySelector("[data-field=star]").textContent = "☆";
    }
    clone.querySelector("[data-field=name]").textContent = animal.name;
    clone.querySelector("[data-field=desc]").textContent = animal.desc;
    clone.querySelector("[data-field=type]").textContent = animal.type;
    clone.querySelector("[data-field=age]").textContent = animal.age;

     // TODO: Add event listener to click on star
   
     clone.querySelector("[data-field=star]").addEventListener('click' ,changeStar);
    
   
     function changeStar(){
        animal.star =!animal.star;
        buildList();
        
     }

    // append clone to list
    document.querySelector("#list tbody").appendChild( clone );
}






