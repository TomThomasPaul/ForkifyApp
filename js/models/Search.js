import axios from 'axios';
import {key,proxy} from '../config';
export default class Search{
    
    constructor(query){  //function constructor for the class with query as property
        
        this.query = query;
        
    }
    
    
    async getResults(){ //prototype function for fetchin results
        
        
         try{
     
     const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`); //res will contain the object from json format..so only one step compared to fetch method.
this.result = res.data.recipes;
//console.log(this.result);
 }catch (error){
     
     alert(error);
     
 }
        
        
    }
     
}