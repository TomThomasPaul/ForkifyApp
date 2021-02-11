import {elements} from './base';

export const getInput = () => elements.searchInput.value;

export const clearFields = ()=>{
    
    elements.searchInput.value = '';
    
};

export const clearResults =()=>{
    
    elements.searchResList.innerHTML='';
    elements.searchResPages.innerHTML = '';
    
};

export const highlightSelected = id=>{
    
    let resultsArr = Array.from(document.querySelectorAll(`.results__link--active`));
    
    resultsArr.forEach(el=>{
        
        el.classList.remove(`results__link--active`);
    });
    
    document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active');
    
    
    
};


export const limitRecipeTitle = (title, limit=21) =>{
   /* 
    if(title.length> limit){
        const newTitleWords =[];
        const  splitTitle = title.split(' ');
        splitTitle.reduce((acc , word)=>{
            
            if(acc + word.length <=17){
                
                newTitleWords.push(word);
                
                
            }
           return acc + word.length;
            
            
        },0);
    
    return `${newTitleWords.join(' ')}...`;
    
    }
    */
    
    //Make own method for limiting title length******
    
    //check length  of title
    if(title.length>limit){
        //if > limit, identify the last ' ' in string
         let limitTitle = title.substr(0,limit);
      
    let lastSpaceIndex=  limitTitle.lastIndexOf(' ');
     //remove the space for new title
        let newTitle = `${limitTitle.substr(0,lastSpaceIndex)} .....`;
     //add ... till end of limit
        
        
        
        return newTitle;
    }
    
    //else return same title
    
    
    
    return title;
    
    
}

const renderRecipe = (recipe)=>{
    const markup = `<li>
                    <a class="results__link" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="${recipe.title}">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>`;
    
    
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
    
    
    
};
//type is prev or next
const createButton = (page,type)=>`
<button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page-1 :page+1}>
 <span>Page ${type === 'prev' ? page-1 :page+1}</span>
                       <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
                    </svg>
                </button>








<!--
                <button class="btn-inline results__btn--prev">
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-left"></use>
                    </svg>
                    <span>Page 1</span>
                </button>
                <button class="btn-inline results__btn--next">
                    <span>Page 3</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>
                </button>
                -->`;

const renderButtons = (page,numResults, resPerPage)=>{
    
    let button;
    const pages = Math.ceil(numResults/resPerPage);
    
    if(page ===1 && pages>1){
        
        //button go to next page
       button= createButton(page, 'next');
    }
    else if (page< pages){
        
        //both buttons
        button= `${createButton(page, 'prev')}${createButton(page, 'next')}` ;
    }
    
    else if(page === pages){
        
        //go to prev page
        button= createButton(page, 'prev');
    }
    
    
   elements.searchResPages.insertAdjacentHTML('afterbegin' , button); 
    
};

export const renderResults = (recipes, page=1, resPerPage=10) =>{
    //render result of current page
    const start=(page-1)*resPerPage;
    const end=page * resPerPage;
    recipes.slice(start,end).forEach(renderRecipe);//just tneed to pass the function for foreach
    
    //render pagination buttons
    renderButtons(page,recipes.length, resPerPage);
}