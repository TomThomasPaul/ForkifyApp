export default class Likes{
    
    constructor(){
        
        this.likes=[];
        
    }
    
    addLike(id,title,author,img){
        
        const like = {
            
            id,
            title,
            author,
            img
            
        };
        
        this.likes.push(like);
        console.log('Added like');
        //console.log(this.likes);
        
        //Persist data with local storage
        this.persistData();
        return like;
    }
    
    
    
    
     deleteLike(id){
        
        const index = this.likes.findIndex(el=>el.id===id); //finds the index of the likes that has to be deleted
        this.likes.splice(index,1); //deletes the like at indx and 1 item
         
         //Persist data in local storage
        this.persistData();
    }  
    
     isLiked(id){
         
         
        return (this.likes.findIndex(el=>el.id==id) !==-1 );
         
     }
    
    getNumLikes(){
        
        
        return this.likes.length;
    }
    
    persistData(){
        console.log('Entered Persist Data');
        console.log(this.likes);
        localStorage.setItem('likes',JSON.stringify(this.likes));
        
    }
    
    readStorage(){
        
        const storage=JSON.parse(localStorage.getItem('likes'));
        
        if(storage){
            //restore the liked recipes from localstorage
            this.likes=storage;
        }
        
    }
    
}