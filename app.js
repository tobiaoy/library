//DOM stuff to get form values

// click add book button
// triggers form opening
// user fills form with data
// data is loaded from form to js
// data is used to make a book object
// book object is rendered into the shelf div
// shelf div renders each object as a card
// method should not re-render already rendered books
// use id to know what books have already been rendered
// book cards should have two buttons: delete and read
// delete button should delete the card and the actual book from storage (array)
// read button should toggle between read and unread status

let library = [];
const shelf = document.querySelector('#shelf');
const saveButton = document.querySelector('#save-book');

function readBool(readStatus){  
    if (readStatus.checked) {
    return true;
  } else {
    return false;
  }
}

function Book(title, author, pageCount, readStatus){
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.readStatus = readStatus;
  this.rendered = false;
}

function makeBook(){
	let bookTitle = document.querySelector('#title').value;
	let bookAuthor = document.querySelector('#author').value;
	let bookPcount = parseInt(document.querySelector('#page-count').value);
	let bookRead = readBool(document.querySelector('#read-status'))
	
    let titleValid = document.querySelector('#title').checkValidity();
    let authorValid = document.querySelector('#author').checkValidity();
    let pagesValid = document.querySelector('#page-count').checkValidity();
      
    if (titleValid && authorValid && pagesValid){
      return new Book(bookTitle, bookAuthor, bookPcount, bookRead)
    } else return;
  }


function clearForm(){
document.querySelector('#title').value = '';
document.querySelector('#author').value = '';
document.querySelector('#page-count').value = '';
document.querySelector('#read-status').checked = false;  
}

function clearEmpties(book){
return book !== undefined;
}

 function addBookToLibrary(){
  library.push(makeBook());
  library = library.filter(clearEmpties)
  clearForm();
 
 }

saveButton.addEventListener('click', () => {
    addBookToLibrary()
    library.forEach((book) => {
        if (book.rendered === false){
        renderBook(book);
        }
      })
});

function renderBook(book){
    let bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    
    //card title
    let cardTitle = document.createElement('h2');
    cardTitle.textContent = `${book.title}`;
    cardTitle.classList.add('card-title');
    
    //card author
    let cardAuthor = document.createElement('p');
    cardAuthor.textContent = `Author: ${book.author}`;
    cardAuthor.classList.add('card-author')
    
    //card page count
    let cardPages = document.createElement('p');
    cardPages.textContent = `Page Count: ${book.pageCount}`;
    cardPages.classList.add('card-pages')
    
    //read status toggle
    let cardRead = document.createElement('button');
    cardRead.setAttribute('id', 'read-toggle');
    if (book.readStatus === true){
    cardRead.classList.add('completed-book');
      cardRead.textContent = 'Read';
    } else {
      cardRead.classList.add('incomplete-book');
      cardRead.textContent = 'Unread';
    }
    
    //delete button
    const cardDelete = document.createElement('button');
    cardDelete.setAttribute('id', 'delete-card');
    cardDelete.textContent = `Delete`;
    
    bookCard.appendChild(cardTitle);
    bookCard.appendChild(cardAuthor);
    bookCard.appendChild(cardPages);
    bookCard.appendChild(cardRead);
    bookCard.appendChild(cardDelete);
    
    shelf.appendChild(bookCard);
    
    let findCardId = function(){
      for (let i = 0; i < library.length; i++){
        if ((library[i] === book)){
    return i;
          }
        }   
      }
    
  //activate delete button
    cardDelete.addEventListener('click', ()=>{
      shelf.removeChild(bookCard);
      library.splice(findCardId(), 1);
    })
    
    //activate read toggle
    function toggleReadStatus(){
      if(book.readStatus === true){
        cardRead.classList.remove('completed-book');
        cardRead.classList.add('incomplete-book');
        cardRead.textContent = `Unread`;
        library[findCardId()].readStatus = false;
      } else {
        cardRead.classList.remove('incomplete-book');
        cardRead.classList.add('completed-book');
        cardRead.textContent = `Read`;
        library[findCardId()].readStatus = true;
      }
    }
    
    cardRead.addEventListener('click', toggleReadStatus);

    //change rendered status
    book.rendered = true;
}

/*

library.forEach((book) => {
    if (book.rendered === false){
    renderBook(book);
    }
  })

  */