const searchBook = ()=>{
    // get search input value 
   const searchText = document.getElementById("search-text").value;
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
}


const DisplayResult  = (searchResult)=>{
    console.log("Number of result", searchResult.length)
    const GetlimitedResult =  searchResult.slice(0,4);
    GetlimitedResult.forEach(result => {
     //show the search result in the html 
    });

}