//Prime numbers below given number--LEET CODE
/*
let inp = prompt('Enter Number');


//console.log(`Remainder is ${inp%2}`);

//Calculate if number is prime

let calculatePrime= n=>{

let factorFound = false;

for(let i = 2; i<n;i++){
    
    
  if(n%i == 0){
      
      factorFound=true;
     
      break;
  }
}
    
    return factorFound;
}
//find prime numbers
let findPrimeNumbers = (num , calc)=>{
   
    
    
    let countOfPrimes=0;
    let arrOfPrimes =[];
    
    for(let i = 1; i<num;i++){
        
        if(i==1){
            
            continue;
        }else{
            
             let found =calc(i);
        if(!found){
            arrOfPrimes.push(i);
             //console.log(`${i} is  a Prime Number`);
            countOfPrimes+=1;
        }
        }
       
        
        
    }
    console.log(`Number of Primes below ${num} is ${countOfPrimes}`);
    return arrOfPrimes;
};
let primeArray =findPrimeNumbers(inp,calculatePrime);

//Display all primes
console.log('Below are the Prime numbers');
primeArray.forEach(cur=>{
    
    console.log(`${cur} is a prime number`);
    
});
*/

/*//leet code example - happy number
let inp = prompt('Enter Number');

let n =inp.toString();
//return digits
let calculateArray = n=>{
    let newArray=[];
    for(let i=0;i<n.length;i++){
        
        let digit = n.substr(i,1);
        newArray.push(digit);
        
    }
    
    //console.log(newArray);
    return newArray;
    
    
};
let numArray =calculateArray(n);

let calculateSquares = nArr=>{
   
    let squareSumOfDigits =0;
   nArr.forEach((cur)=>{
       
       squareSumOfDigits= squareSumOfDigits+(cur*cur);
       
   });
    
    try{ console.log(`Squared sum of digits is ${squareSumOfDigits}`);
   
    if(squareSumOfDigits!=1){
        
        
        let nextNumArray =calculateArray(squareSumOfDigits.toString());
    calculateSquares(nextNumArray);
        
    } else {
        
        console.log(`${n} is a happy number - True`);
        
    }
    }catch(error){
        
        alert(`${n} is not a happy number - False`);
        
    }
    
  
    
    
    
    
};

calculateSquares(numArray);

END OF LEET CODE question - happy number */

//n.forEach();

// Global app controller

/*
import str  from './models/Search';
//import {add as a,multiply as m, ID} from './views/searchView';

import * as searchView from './views/searchView'; //another way of doing named imports

console.log(`${str} and using imported functions ${searchView.add(searchView.ID,10)} and ${searchView.multiply(searchView.ID,10)}`);

*/

/*

import axios from 'axios';

async function getResults(query){
    
    
 try{
     
     const res = await axios(`https://forkify-api.herokuapp.com/api/search?q=${query}`); //res will contain the object from json format..so only one step compared to fetch method.
const recipes = res.data.recipes;
console.log(recipes);
 }catch (error){
     
     alert(error);
     
 }
    
 

    
    
    
};



getResults('pizza'); */



import Search from './models/Search';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import List from  './models/List';
import Likes from './models/Likes';
import {elements,renderLoader,clearLoader} from './views/base';
import Recipe from './models/Recipe';

//let search = new Search('pizza');
//console.log(search);

//search.getResults();



/**Global state of the app
 - search object
 -current recipe object
 -shopping list object
 -liked recipes

*/

const state ={};

//window.state=state;

const controlSearch =async () =>{
    //get query from the view
   // const query ='pizza'; // to do later..pizza for time being
    
       const query =searchView.getInput(); 
   // const query ='pizza';
     // console.log(query);
    
    if(query){
        
        //new search object and add to state
        state.search =   new Search(query);
        
        //prepare UI for results..like clear input field, load spinner etc
        
        searchView.clearFields();
        searchView.clearResults();
      renderLoader(elements.searchRes);
      try{
          
          
              //search for recipes
       await state.search.getResults();
        
        //Render Results to UI
        clearLoader(); 
        searchView.renderResults(state.search.result);
      
      }catch(error){
          
          alert(`${error} happened during search`);
          clearLoader();
          
      }
        
    
        
        
        
        
        
    }
    
    
};

elements.searchForm.addEventListener('submit', e => {
    
    e.preventDefault();
    controlSearch();
    
});

//Testing
/*
window.addEventListener('load', e => {
    
    e.preventDefault();
    controlSearch();
    
});*/

elements.searchResPages.addEventListener('click', e =>{
    const btn =  e.target.closest(`.btn-inline`);
   //console.log(btn); 
    
    if(btn){
        
        
        const goToPage = parseInt(btn.dataset.goto, 10);//base 10
        //console.log(goToPage);
       searchView.clearResults(); searchView.renderResults(state.search.result, goToPage);
    }
    
    
});

//Recipe Controller********

/*const r = new Recipe(47746);
r.getRecipe();
console.log(r);*/

const controlRecipe = async ()=>{
   //Get ID from url 
    const hashId= window.location.hash.replace('#', '');
   // console.log(hashId);
    
    if(hashId){
        
        //Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);
        
        //Highlight Recipe
        
       if(state.search) {searchView.highlightSelected(hashId);
                         
                        }
                       
        
        //create new recipe object
        
        state.recipe = new Recipe(hashId);
       //Testing
        //window.r =state.recipe;
        
        try{
            
            //get recipe and parse ingredient
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
        //calculate servings and time
        
        state.recipe.calcTime();
        state.recipe.calcServings();
        
        //render recipe
        
        //console.log(state.recipe);
          clearLoader();
          recipeView.renderRecipe(state.recipe, state.likes.isLiked(hashId));    
            
            
        }catch(error){
            
            alert(`${error} when fetching specific recipe`);
        }
       
    }
    
}

//window.addEventListener('hashchange', controlRecipe);
//add event listener for both selection of recipe and refresh of page
['hashchange','load'].forEach(event=>{
    
    window.addEventListener(event, controlRecipe);
    
});

const controlList = ()=>{
    
   //Create new List if none present 
    if(!state.list){
        
        state.list = new List();
    }
    
    //add EACH INGREDIENT TO LIST and UI
    
    state.recipe.ingredients.forEach(el=>{
    
     const item = state.list.addItem(el.count,el.unit,el.ingredient);
    
    listView.renderItem(item);
    
});
   
    
    
    
    
    
};


//Handle shoppin list delete and update count

elements.shoppingList.addEventListener('click', e=>{
   
    const id = e.target.closest('.shopping__item').dataset.itemid;
    
    
    //handle delete 
    
    if(e.target.matches(`.shopping__delete, .shopping__delete *`)){
        
        
        //Delte from state
        state.list.deleteItem(id);
        
        //delete from ui
        listView.deleteItem(id);
        
        
    }else if (e.target.matches(`.shopping__count-value`)){
              
             
              let val = parseFloat(e.target.value,10);
            
     /*   if(val<0) {
          val=0;  
            e.target.value=0;  //used min="0" in listView to restrict to 0
            
        }*/
              state.list.updateCount(id,val);
              
    }
    
});

/*Likes Controller*/

//Only for testing**********

//********************************
const controlLike=()=>{
    
//create new like if not present in likes list
    if(!state.likes) { state.likes = new Likes(); 
                     }
    const currId = state.recipe.id;
    
    //Check If the user has not liked the recipe
    
    if(!state.likes.isLiked(currId)){
        
        //Add like to state
        
        const newLike = state.likes.addLike(currId,state.recipe.title, state.recipe.author,state.recipe.img);
        //Toggle Like button
        likesView.toggleLikeBtn(true);
        //Add like to UI
        
        likesView.renderLike(newLike);
       // console.log(state.likes);
        
        
    //Check if the user has liked the recipe    
        
    }else{
        
        
        //Remove like from state
        
        state.likes.deleteLike(currId);
        
        //Toggle like button
          likesView.toggleLikeBtn(false);
        
        //Remove from UI List
        likesView.deleteLike(currId);
        //console.log(state.likes);
        
        
    }
    
    //console.log(state.likes.getNumLikes());
    likesView.toggleLikeMenu(state.likes.getNumLikes());


};

//restoreliked recipes on page load

window.addEventListener('load',()=>{
    
    state.likes = new Likes();
    
    //Restore Likes
    
    state.likes.readStorage();
    
    //Toggle Likes menu option
   likesView.toggleLikeMenu(state.likes.getNumLikes());
    
    
    //Render Existing Likes
    
    state.likes.likes.forEach(like=>likesView.renderLike(like));
});


//Handling recipe button clicks

elements.recipe.addEventListener('click', e=>{
    
    
   if(e.target.matches('.btn-decrease, .btn-decrease *')){
      //Decrease button is clicked
      
       if(state.recipe.servings>1){
           
            state.recipe.updatServings('dec');
           recipeView.updateServingsIngredients(state.recipe);
       }
      
      }else if (e.target.matches('.btn-increase, .btn-increase *')){
      //Increase button is clicked
      state.recipe.updatServings('inc');
        recipeView.updateServingsIngredients(state.recipe);  
      }else if(e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
          
          //add ingredients to shopping list
          
          controlList();
      }else if(e.target.matches('.recipe__love, .recipe__love *')){
          
          //call likes controller
          controlLike();
          
      }
    
    
    
    //console.log(state.recipe);
    
    
    
});

//window.r= new List();