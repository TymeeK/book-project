let myLibrary = [];
const titleForm = document.querySelector("#booktitle");
const authorForm = document.querySelector("#author");
const pageForm = document.querySelector("#page");
const displayFormButton = document.querySelector("#display-form");
const formPopUpDiv = document.querySelector("#form-popup");
const saveButton = document.querySelector("#save-book");
const checkBox = document.querySelector("#check-read");
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
    console.log(myLibrary);
    displayForm();
    clearFields();
}

function addBookCard() {
    const bookDisplayDiv = document.querySelector("#book-display");
    bookDisplayDiv.style.cssText = 
        `grid-template-columns: repeat(6, 1fr);` +
        `grid-template-rows: repeat(6, 1fr);`;
    
    for (let i = 0; i < 36; i++) {
        const cardDisplay = document.createElement("div");
        cardDisplay.className = "grid-div";
        cardDisplay.innerText = "Hello";
        cardDisplay.style.cssText = `border: 1px solid black;`;
        bookDisplayDiv.appendChild(cardDisplay);
    }
   
    
}

function clickSaveButton() {
    addBookToLibrary();
    
}


displayFormButton.addEventListener("click", displayForm);
saveButton.addEventListener("click", clickSaveButton);

addBookCard();