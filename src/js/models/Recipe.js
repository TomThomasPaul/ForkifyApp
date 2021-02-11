import axios from 'axios';
import {key,proxy} from '../config';

export default class Recipe{
    
    
    constructor(id){
        
        this.id=id;
        
        
    }
    
    
    async getRecipe(){
        try{
            
         const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);  
            
        this.title = res.data.recipe.title;
        this.author = res.data.recipe.publisher;
        this.img = res.data.recipe.image_url;
        this.url = res.data.recipe.source_url;
        this.ingredients = res.data.recipe.ingredients;    
            
        //console.log(res);
            
            
            }catch(error){
            
            alert(error);
            
                     }              
        
        
                      }
    
    
    calcTime(){
        
        //Assuming it takes 15 mins for every 3 ingredients
        
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng/3);
        this.time = periods * 15;
        
        
    }
    
    
    calcServings(){
        
        this.servings=4;
        
    }
                         

    parseIngredients(){
        
        const unitsLong =['tablespoons','tablespoon','ounces', 'ounce','teaspoons','teaspoon','cups','pounds'];
        
        const unitsShort = ['tbsp','tbsp','oz','oz','tsp','tsp','cup','pound'];
        
        const units =[...unitsShort, 'kg', 'g'];
        
        const newIngredients = this.ingredients.map(el=>{
            
            //uniform units
            
            let ingredient = el.toLowerCase();
            unitsLong.forEach((cur,i)=>{
                
              ingredient= ingredient.replace(cur, unitsShort[i]); 
                
                
                
            });
            
            //Remove parenthesis
            ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");
            
            //parse ingredients into count,units and ingredients
            const arrIng = ingredient.split(' ');// SPLITS TEXT INTO ARRAY OF WORDS
             
            let unitIndex = arrIng.findIndex(el=>units.includes(el));
            
            let objIng;
            if(unitIndex >-1){
                //there is a unit
                
              const arrCount = arrIng.slice(0,unitIndex); //eg- 4 1/2 cups will be 4 and 1/2 in the array
                let count;
                if(arrCount.length==1){
                    
                    count = eval(arrIng[0].replace('-','+'));
                    
                    
                    }else{
                    
                    count = eval(arrCount.join('+'));
                    }
                
                objIng = {
                    
                    count,
                    
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex+1).join(' ')
                    
                    
                    
                }
            }else if(parseInt(arrIng[0],10)){
                     //no unit but there is a number in first position
                
                objIng ={
                    
                    count : parseInt(arrIng[0],10),
                    
                    unit : '',
                    ingredient : arrIng.slice(1).join(' ')
                    
                }
                
                
                     }else if (unitIndex ==-1){
                      //there is no unit and no number in frst pos
                    objIng={
                        
                        count : 1,
                        unit : '',
                        ingredient
                        
                    };    
                         
                         
                         
                         }
            
            return objIng;
            
        });
        
        this.ingredients=newIngredients;
    }
    
    updatServings(type){
        
        //servings
        
        const newServings = type=='dec'?this.servings-1:this.servings+1;
        
        
        //ingredients
        this.ingredients.forEach(ing=>{
            
            ing.count *= (newServings/this.servings);          
            
        });
        
        this.servings=newServings;
        
    }

}



