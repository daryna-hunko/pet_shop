import ControllerCards from "./ControllerCards.js";

//default lang
window.lang = 'en';
//window.productsStorage - to load data from json and use them later
//JSON.parse(localStorage.getItem("productsArr")); - to use data for buy operations

document.addEventListener('DOMContentLoaded', new ControllerCards());


//all that jQuery from Semantic UI
/*let searchDB = JSON.parse(localStorage.getItem("productsArr"));

$('.ui.search')
  .search({
    source: searchDB
  })
;*/