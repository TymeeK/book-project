let myLibrary = [];
const titleForm = document.querySelector("#booktitle");
const authorForm = document.querySelector("#author");
const pageForm = document.querySelector("#page");
const newBookButton = document.querySelector("#new-book");
const divDisplay = document.querySelector("#book-display");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return `${this.title} by ${this.author} ${this.pages} pages ${this.read}`;
    }
}

function addBookToLibrary() {
    const book = new Book();
    book.title = titleForm.value;
    book.author = authorForm.value;
    book.pages = pageForm.value;
    myLibrary.push(book);
}

newBookButton.addEventListener("click", addBookToLibrary);