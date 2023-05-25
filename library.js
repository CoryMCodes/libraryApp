// Library Storage
let library = [];


//Book Factory Function
const bookFactory = (title, author, pages, hasRead, rating) => {
  
  //private function to toggle read state and view
  const toggleRead = () => {
    hasRead = !hasRead;
    return `${hasRead ? `Read` : `Not Read`}`
  }

  //public function to build book card view
  const buildCard = (id) => {
    // get container
    let container = document.getElementById("card-container");
    
    // create card el
    let card = document.createElement("div");
    card.classList.add("card");
    
    // Add X img and attach delete function to it.
    let xImg = document.createElement("img");
    xImg.classList.add("xImage");
    xImg.classList.add("grow");
    xImg.setAttribute("card-index", id)
    xImg.addEventListener("click", deleteBookFromLibrary);
    card.appendChild(xImg);
    
    // assign card info using create text node rather than setting innerHTMl to avoid
    // malicious code being inserted
     let titleDiv = document.createElement("div");
    titleDiv.classList.add('card-title');
    titleDiv.appendChild(document.createTextNode(`"${title}"`));
    let authorDiv = document.createElement("div");
    authorDiv.appendChild(document.createTextNode(`${author}`));
    let pagesDiv = document.createElement("div");
    pagesDiv.appendChild(document.createTextNode(`Pages: ${pages}`))
    
    // Has Read CheckBox Functionality 
    let hasReadLabel = document.createElement("label");
    hasReadLabel.setAttribute("for", "hasRead");
    hasReadLabel.appendChild(document.createTextNode(`${hasRead ? `Read` : `Not Read`}`))
    hasReadLabel.classList.add("checkbox-label")
    let hasReadInput = document.createElement('input');
    hasReadInput.setAttribute("type", "checkbox");
    hasReadInput.setAttribute("name", "hasRead");
    hasReadInput.classList.add("cardCheck");
    // set hasRead input to checked if initial value is true
    hasRead ? hasReadInput.setAttribute("checked", "") : null;
    // toggle read status on object if user interacts with checkbox input
    hasReadInput.onchange = () => {
      hasReadLabel.innerText = toggleRead();
      hasReadLabel.appendChild(hasReadInput);
    }
    hasReadLabel.appendChild(hasReadInput);
    let ratingDiv = document.createElement("div");
    ratingDiv.appendChild(document.createTextNode(`Rating: ${rating}/5`));

    // build card
    card.appendChild(titleDiv);
    card.appendChild(authorDiv);
    card.appendChild(pagesDiv);
    card.appendChild(ratingDiv);
    card.appendChild(hasReadLabel);

    // append card to container
    container.appendChild(card);
  }

  // return only function to build card element, all other information is private
  // to book object
return {buildCard}
}

// helper function to clear container before rebuild
const clearContainer  = () => {
  let container = document.getElementById("card-container");
  container.innerHTML = "";
}

// Add Book To library (attached to button)
function addBookToLibrary(Book) {
  library.push(Book);
}

// Delete Book From Library (attached to button on card)
function deleteBookFromLibrary(e){
  let cardIndex = e.target.getAttribute("card-index")
  library.splice(cardIndex,1);
  buildLibrary(library);
}

// button that shows new book modal
const addBookBtn = document.getElementById("addBookBtn");
addBookBtn.addEventListener('click', () => {
  document.getElementById("addModal").classList.toggle("hidden")
})

const cancelBtn = document.getElementById("cancelBtn");
cancelBtn.addEventListener('click', (e) =>{
  e.preventDefault();
  document.getElementById("addModal").classList.toggle("hidden");
  newBookForm.reset();
})

// get form - listen for submit, build new book object and rebuild library view
let newBookForm = document.getElementById("newBookForm");
newBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let title = newBookForm.elements["title"].value;
  let author = newBookForm.elements["author"].value;
  let pages = newBookForm.elements["pages"].value;
  let hasRead = newBookForm.elements["initHasRead"].value;
  let rating = newBookForm.elements["rating"].value;
  let newBook = bookFactory(title, author, pages, hasRead, rating);

  //reset form
  newBookForm.reset();

  // add book object to library array
  addBookToLibrary(newBook);
  // update view with new library
  buildLibrary(library);
  document.getElementById("addModal").classList.toggle("hidden");
})

// Add First Book Manually
const Lotr = bookFactory("Lord of the Rings", "Tolkien", 150, false, 5);
addBookToLibrary(Lotr);

// build library view
const buildLibrary = (array) => {
  clearContainer();
  array.forEach((book, index) => {
    book.buildCard(index);
  });
}

// Build first view on page load
buildLibrary(library);