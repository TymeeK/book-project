let myLibrary = [];
const titleForm = document.querySelector("#booktitle");
const authorForm = document.querySelector("#author");
const pageForm = document.querySelector("#page");
const displayFormButton = document.querySelector("#display-form");
const formPopUpDiv = document.querySelector("#form-popup");
const saveButton = document.querySelector("#save-book");
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
        alert("Please enter a value");
    }
    
    const book = new Book();
    book.title = titleForm.value;
    book.author = authorForm.value;
    book.pages = pageForm.value;
    myLibrary.push(book);
    console.log(myLibrary);
    displayForm();
    clearFields();
}

function clickSaveButton() {
    addBookToLibrary();
    
}

displayFormButton.addEventListener("click", displayForm);
saveButton.addEventListener("click", clickSaveButton);