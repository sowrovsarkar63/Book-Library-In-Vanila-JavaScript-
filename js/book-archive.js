const searchBook = ()=>{
    // get search input value 
   const inputFieldText = document.getElementById("search-text");
   const removeResult = document.getElementById("SearchResult");
   const numberOfResult = document.getElementById("numberOfResult");
   const resultNotFound =  document.getElementById("not-found");

//    removea and hide  element 
removeResult.textContent = "";
numberOfResult.classList.add("d-none");//hide number of result when new search 
resultNotFound.innerText = "";

    removeResult.innerText = "";
   const searchText =  inputFieldText.value;
   //get error space 
   const ShowError =  document.getElementById("showError");
   if(searchText === ""){
       ShowError.innerText ="You din't write anything in the search box";
   }else{
    ShowError.innerText ="";
 

       // search book through api 
       const url = `http://openlibrary.org/search.json?q=${searchText}`;
       fetch(url)
       .then(res => res.json())
       .then(searchResult => DisplayResult(searchResult.docs)); //debuging and understanding the api and the response 

   }
   inputFieldText.value = "";
}


const DisplayResult  = (searchResult)=>{
    // get number of search result 
    const numberOfResult = document.getElementById("numberOfResult");
   
    // show search not found 
    const resultNotFound =  document.getElementById("not-found");
    if (searchResult.length === 0){
        resultNotFound.innerText = "Result Not Found !! ";
    }else{
        numberOfResult.classList.remove("d-none");
        // display number of search 
        numberOfResult.innerText =  `${searchResult.length} results found `;
    }

    // disply 8 results in the page 
    const GetlimitedResult =  searchResult.slice(0,8);

    //display search  result 
   const ResultContainer = document.getElementById("SearchResult");
    GetlimitedResult.forEach(result => {
        //create html 
        const col = document.createElement("div");
        col.classList.add("col");
        col.innerHTML = `
        <div class="card h-20">
        <img src=" https://covers.openlibrary.org/b/id/${result.cover_i}-M.jpg" class="card-img-top img-thumbnail"  >
        <div class="card-body">
            <h6 class="card-title">${result.title} By (${result.author_name[0]})</h6>
            <p class="card-text">Published at ${(result.first_publish_year )?result.first_publish_year : "Not found"}</p>
            <p class="card-text lead">Published by ${result.publisher[0] }</p>
            
           
        </div>
    </div>
        
        `;
        // append all the html that created via js
ResultContainer.appendChild(col);

    });

}