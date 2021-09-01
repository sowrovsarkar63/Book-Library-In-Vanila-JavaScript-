const searchBook = ()=>{
    // get search input value 
   const inputFieldText = document.getElementById("search-text");
   const removeResult = document.getElementById("SearchResult");
   const numberOfResult = document.getElementById("numberOfResult");
    numberOfResult.classList.add("d-none");//hide number of result when new search 

   const searchText =  inputFieldText.value;
   //get error space 
   const ShowError =  document.getElementById("showError");
   if(searchText === ""){
       ShowError.innerText ="You din't write anything in the search box";
   }else{
    ShowError.innerText ="";
    removeResult.textContent = "";
       // search book through api 
       const url = `http://openlibrary.org/search.json?q=${searchText}`;
       fetch(url)
       .then(res => res.json())
       .then(searchResult => DisplayResult(searchResult.docs)); //debuging and understanding the api and the response 

   }
   inputFieldText.value = "";
}


const DisplayResult  = (searchResult)=>{
    // display number of search result 
    const numberOfResult = document.getElementById("numberOfResult");
    numberOfResult.classList.remove("d-none");
    numberOfResult.innerText =  `${searchResult.length} results found `;


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
        <img src="..." class="card-img-top" alt="">
        <div class="card-body">
            <h6 class="card-title">${result.title} By (${result.author_name[0]})</h6>

           
            
            <p class="card-text">Published at ${result.first_publish_year }</p>
            <p class="card-text lead">Published by ${result.publisher[0] }</p>
            
           
        </div>
    </div>
        
        `;
        // append all the html that created via js
ResultContainer.appendChild(col);
console.log(result);
    });

}