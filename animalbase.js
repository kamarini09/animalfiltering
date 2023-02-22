"use strict";

window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];

let settings = {
    filterBy:"*",
    sortBy: "name",
    sortDir: "asc"
}



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
        each.addEventListener("click", selectFilter);
    });

    document.querySelectorAll("[data-action=sort]").forEach((each) =>{
        each.addEventListener("click", sortClick);
    }); 
   
}
// ---------------------FILTERING---------------------------
function selectFilter(event){
    const filter = event.target.dataset.filter;
   //filterList(filter);
   setFilter(filter);
}

function setFilter(filter){
    settings.filterBy = filter;
    buildList();
}

function filterList(filteredList){

    if (settings.filterBy !== "*") {
        filteredList = allAnimals.filter(function whichAnimal(animal){ //its a differnet way with closure
            if (animal.type === settings.filterBy ){
                return true;
            }else{
                return false;
            }
        })
    }

    return filteredList;
   
}
  
// ---------------------SORTING---------------------------

function sortClick(event){

    const sortBy = event.target.dataset.sort;
    const sortDir = event.target.dataset.sortDirection;

    //find "old" sortby element and remove .sortBy
    const oldElement = document.querySelector(`[data-sort=${settings.sortBy}]`);
    oldElement.classList.remove("sortby");


    //indicate active sort
    event.target.classList.add("sortby");

    //toggle the direction
    if(sortDir === "asc"){
        event.target.dataset.sortDirection = "desc";
    }else{
        event.target.dataset.sortDirection = "asc";
    }
    console.log(`user selected ${sortBy} - ${sortDir}`)
    setSort(sortBy, sortDir);

    
    
}

function setSort(sortBy, sortDir){
    settings.sortBy = sortBy;
    settings.sortDir = sortDir;
    buildList();
}



function sortList(sortedList){
    
     let direction = 1;
     if(settings.sortDir === "desc"){
        direction = -1;
     } else {
        direction = 1;
     }
    
     sortedList = sortedList.sort(sortByInput);
     
      function sortByInput(animalA, animalB){
        console.log(`sorted by ${settings.sortBy}`)
        if(animalA[settings.sortBy]   < animalB[settings.sortBy]){
            return -1 * direction;
        }else{
            return 1 * direction;
        }
    }
     return sortedList;
    
       
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
    //displayList(allAnimals);
    buildList();
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
    const currentList = filterList(allAnimals);
    let sortedList = sortList(currentList);


    displayList(sortedList);
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






