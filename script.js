let myLibrary = [];
const titleForm = document.querySelector("#booktitle");
const authorForm = document.querySelector("#author");
const pageForm = document.querySelector("#page");
const displayFormButton = document.querySelector("#display-form");
const formPopUpDiv = document.querySelector("#form-popup");
const saveButton = document.querySelector("#save-book");
const checkBox = document.querySelector("#check-read");
const bookDisplayDiv = document.querySelector("#book-display");
let formIsDisplayed = false;

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return `${this.title} by ${this.author} ${this.pages} pages ${this.read}`;
    }
}

function displayForm() {
    if (!formIsDisplayed) {
        displayFormButton.remove();
        formPopUpDiv.style.display = "block";
        formIsDisplayed = true;
    }
    else {
        formPopUpDiv.style.display = "none";
        const newBookDiv = document.querySelector("#button-display");
        newBookDiv.appendChild(displayFormButton);
        formIsDisplayed = false;
    }    
}


function clearFields() {
    titleForm.value = "";
    authorForm.value = "";
    pageForm.value = "";
}

function addBookToLibrary() {
    if (!titleForm.value || !authorForm.value || !pageForm.value) {
        alert("Please enter a value for all fields");
        return;
    }
    if (!parseInt(pageForm.value)) {
        alert("Please enter a number in the pages field");
        return;
    }
    
    const book = new Book();
    book.title = titleForm.value;
    book.author = authorForm.value;
    book.pages = pageForm.value;
    book.read = checkBox.checked;
    myLibrary.push(book);
    displayForm();
    clearFields();
}

function addBookCard() {
    //Check to see if bookDisplayDiv has childnodes to remove
    while (bookDisplayDiv.hasChildNodes()) {
        bookDisplayDiv.removeChild(bookDisplayDiv.firstChild);
    }
   
    bookDisplayDiv.style.cssText = 
        `grid-template-rows: repeat(${myLibrary.length}, 1fr);`;
    
    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];
        const cardDisplay = document.createElement("div");
        const readButton = document.createElement("button");
        const removeButton = document.createElement("button");

        readButton.innerHTML = "Change read status"
        removeButton.innerHTML = "Remove book";
        cardDisplay.className = "grid-div";
        cardDisplay.innerHTML = 
            `<b>Title:</b> ${book.title}<br><b>Author:</b> ${book.author}<br>
            <b>Pages:</b> ${book.pages}`;  

        if (book.read) {
            cardDisplay.innerHTML += `<br><b>Status:</b> Read<br>`;
        }
        else {
            cardDisplay.innerHTML += `<br><b>Status:</b> Not read<br>`;
        }
        cardDisplay.style.cssText = `border-bottom: 1px solid black;
            font-size: 25px; background-color: #555; color: white;`;
        cardDisplay.dataset.number = i;
        const dataNumber = cardDisplay.dataset.number;
        
        bookDisplayDiv.appendChild(cardDisplay);
        cardDisplay.appendChild(readButton);
        cardDisplay.appendChild(removeButton);
        
        removeButton.addEventListener("click", () => {
            const allCards = document.querySelectorAll(".grid-div")
            
            allCards.forEach((card) => {
                const cardToRemove = parseInt(card.getAttribute("data-number"));
                if (parseInt(dataNumber) === cardToRemove) {
                    myLibrary.splice(cardToRemove, 1);
                    card.remove();
                }
            });
        });

        readButton.addEventListener("click", () => {
            const readBook = document.querySelectorAll(".grid-div");
            readBook.
        });
    }
}



function clickSaveButton() {
    addBookToLibrary();
    addBookCard();
}

displayFormButton.addEventListener("click", displayForm);
saveButton.addEventListener("click", clickSaveButton);

