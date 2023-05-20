// Library Storage
let library = [];

// Book Object
const Book = {
  init: function(title, author, pages, hasRead, rating){
    this.title = title
    this.author = author
    this.pages = pages
    this.hasRead = hasRead
    this.rating = rating
    return this;
  },
  toggleRead: function(){
    this.hasRead = !this.hasRead;
    return `${this.hasRead ? `Read` : `Not Read`}`
  },
  buildCard: function(id){
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
    titleDiv.appendChild(document.createTextNode(`"${this.title}"`));
    let authorDiv = document.createElement("div");
    authorDiv.appendChild(document.createTextNode(`${this.author}`));
    let pagesDiv = document.createElement("div");
    pagesDiv.appendChild(document.createTextNode(`Pages: ${this.pages}`))
    // Has Read CheckBox Functionality 
    let hasReadDiv = document.createElement("div");
    let hasReadLabel = document.createElement("label");
    hasReadLabel.setAttribute("for", "hasRead");
    hasReadLabel.appendChild(document.createTextNode(`${this.hasRead ? `Read` : `Not Read`}`))
    hasReadDiv.appendChild(hasReadLabel);
    let hasReadInput = document.createElement('input');
    hasReadInput.setAttribute("type", "checkbox")
    hasReadInput.setAttribute("name", "hasRead");
    hasReadInput.onchange = () => {
      hasReadLabel.innerText = this.toggleRead();
    }
    hasReadDiv.appendChild(hasReadInput);
    let ratingDiv = document.createElement("div");
    ratingDiv.appendChild(document.createTextNode(`Rating: ${this.rating}/5`));

    // build card
    card.appendChild(titleDiv);
    card.appendChild(authorDiv);
    card.appendChild(pagesDiv);
    card.appendChild(ratingDiv);
    card.appendChild(hasReadDiv);

    // append card to container
    container.appendChild(card);
  }
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

// get form - listen for submit, build new book object and rebuild library view
let newBookForm = document.getElementById("newBookForm");
newBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let title = newBookForm.elements["title"].value;
  let author = newBookForm.elements["author"].value;
  let pages = newBookForm.elements["pages"].value;
  let newBook = Object.create(Book).init(title, author, pages, false, 5);

  //reset form
  newBookForm.reset();

  // add book object to library array
  addBookToLibrary(newBook);
  // update view with new library
  buildLibrary(library);
  document.getElementById("addModal").classList.toggle("hidden");
})

// Add First Book Manually
const Lotr = Object.create(Book).init("Lord of the Rings", "Tolkien", 150, false, 5);
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