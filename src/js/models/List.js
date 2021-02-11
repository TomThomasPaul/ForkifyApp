import uniqid from 'uniqid';

export default class List{
    
    constructor(){
        
        
        this.items=[];
    }
    
    addItem(count,unit,ingredient){
        
        const item = {
            
            id : uniqid(),
            count,
            unit,
            ingredient  
            
        }
        
        this.items.push(item);
        return item;
    }
    
    
    deleteItem(id){
        
        const index = this.items.findIndex(el=>el.id===id); //finds the index of the item that has to be deleted
        this.items.splice(index,1); //deletes the item at indx and 1 item
        
    }       

    updateCount(id,newCount){
        
        
        this.items.find(el=>el.id===id).count=newCount;
        
    }


}




