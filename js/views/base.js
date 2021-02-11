export const elements = { //comment test 2
    
    searchForm :document.querySelector('.search'),
    searchInput : document.querySelector('.search__field'),
    searchResList :document.querySelector('.results__list'),
    searchRes : document.querySelector('.results'),
    searchResPages : document.querySelector('.results__pages'),
    recipe : document.querySelector('.recipe'),
    shoppingList : document.querySelector('.shopping__list'),
    likesMenu : document.querySelector('.likes__field'),
    likesList: document.querySelector('.likes__list')
   // loaderEl : document.querySelector('.loader') ***this will throw error at line 36 because the element is not loaded at the time the page is rendered. 
};

export const elementString = {
    
    loader : 'loader'
    
}

export const renderLoader = (parent)=>{
    
    const loader = `<div class="${elementString.loader}"> 
                     <svg> 
                             <use href="img/icons.svg#icon-cw"></use> 
                      </svg>
                      </div>` ;
    
    
    parent.insertAdjacentHTML('afterbegin', loader);
    
};

export const clearLoader = ()=>{
    
  //  elements.loaderEl.parentElement.removeChild(elements.loaderEl);// will throw error ..see line 12
    
   const loader = document.querySelector(`.${elementString.loader}`);
    //const loader = document.querySelector(`.loader2`); Add loder2 in the loader class list in renderLoader function to test classes. wE CAN QUERYSELECT any of the classes defined under div tag
    console.log(loader);
    
    if(loader){
        
        loader.parentElement.removeChild(loader);
        //loader.innerHTML=''; this will also work but the div area will be visible on top of the first recipe
        
    }
    
};