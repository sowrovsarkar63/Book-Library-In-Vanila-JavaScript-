
/* ------get input value  function 
 */
const getInputValue = input =>{
    const inputById =  document.getElementById(input);
    return inputById;
}
/* ========================
search book fucntiond
=================
*/
const searchBook = () => {
    // get search input value 
   const inputFieldText = getInputValue("search-text");
   const removeResult = getInputValue("SearchResult");
   const numberOfResult = getInputValue("numberOfResult");
   const resultNotFound =  getInputValue("not-found");
   const showspinner = getInputValue("showspinner");

/* ========================
remove and hide element 
=================
*/
removeResult.textContent = "";
numberOfResult.classList.add("d-none");//hide number of result when new search 
resultNotFound.innerText = "";
removeResult.innerText = "";


   const searchText =  inputFieldText.value;
   /* ========================
empty input error 
=================
*/
   const ShowError = getInputValue("showError");
   if(searchText === ""){
       ShowError.innerText ="You din't write anything in the search box";
   }else{
    ShowError.innerText ="";
 

       // search book through api 
       const url = `https://openlibrary.org/search.json?q=${searchText}`;
       fetch(url)
       .then(res => res.json())
       .then(searchResult => DisplayResult(searchResult.docs)); 

 /* ========================
    show spinner 
=================
*/
       showspinner.classList.remove("d-none");

   }
   inputFieldText.value = "";
  

}

/* ========================
display result 
=================
*/
const DisplayResult  = (searchResult)=>{
    // get input value 
    const numberOfResult = getInputValue("numberOfResult");
    const showspinner = getInputValue("showspinner");
    // hide spinner after loading the page 
    showspinner.classList.add('d-none');

    // show search not found 
    const resultNotFound = getInputValue("not-found");
    if (searchResult.length === 0){
        resultNotFound.innerText = "Result Not Found !! ";
    }else{
        // display number of search 
        numberOfResult.classList.remove("d-none");
        numberOfResult.innerText =  `${searchResult.length} results found `;
    }

    // disply 5 results in the page 
    const GetlimitedResult =  searchResult.slice(0,6);

    //display search  result 
   const ResultContainer =getInputValue("SearchResult");
    GetlimitedResult.forEach(result => {
        //create html element 
        const col = document.createElement("div");
        col.classList.add("col");
        col.innerHTML = `
        <div class="card">
     
        <img src=" https://covers.openlibrary.org/b/id/${result.cover_i}-M.jpg" class="card-img-top img-fluid"  >
     
        <div class="card-body">
            <h6 class="card-title">${result.title} By (${result.author_name[0]})</h6>
            <p class="card-text">Published at ${(result.first_publish_year )?result.first_publish_year : "Not found"}</p>
            <p class="card-text lead">Published by ${result.publisher[0] }</p>
            
           
        </div>
    </div>
        
        `;
        // append all the html element that created via js
ResultContainer.appendChild(col);

    });

}



/* ==================================

+++++++++++++++(((((((Md Sowrov Sarkar)))))))) ++++++++++++++++++++++++++++++++

=================================================*/