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
  buildCard: function(){
    // get container
    let container = document.getElementById("card-container");
    
    // create card el
    let card = document.createElement("div");
    card.classList.add("card");

    // assign card info using create text node rather than setting innerHTMl to avoid
    // malicious code being inserted
     let titleDiv = document.createElement("div");
    titleDiv.classList.add('card-title');
    titleDiv.appendChild(document.createTextNode(`"${this.title}"`));
    let authorDiv = document.createElement("div");
    authorDiv.appendChild(document.createTextNode(`${this.author}`));
    let pagesDiv = document.createElement("div");
    pagesDiv.appendChild(document.createTextNode(`${this.pages}`))
    let hasReadDiv = document.createElement("div");
    hasReadDiv.appendChild(document.createTextNode(`${this.hasRead ? `Read` : `Not Read`}`))
    let ratingDiv = document.createElement("div");
    ratingDiv.appendChild(document.createTextNode(`${this.rating}`));

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

  addBookToLibrary(newBook);
  buildLibrary(library);
  document.getElementById("addModal").classList.toggle("hidden");
})

// Add First Book Manually
const Lotr = Object.create(Book).init("Lord of the Rings", "Tolkien", 150, false, 5);
addBookToLibrary(Lotr);

// build library view
const buildLibrary = (array) => {
  clearContainer();
  array.forEach(book => {
    book.buildCard();
  });
}

buildLibrary(library);