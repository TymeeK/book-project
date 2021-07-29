class Book {
    #title;
    #author;
    #pages;
    #read;

    constructor(title, author, pages, read) {
        this.#title = title;
        this.#author = author;
        this.#pages = pages;
        this.#read = read;
    }

    get title() {
        return this.#title;
    }

    get author() {
        return this.#author;
    }

    get pages() {
        return this.#pages;
    }
    get read() {
        return this.#read;
    }

    set read(read) {
        this.#read = read;
    }

    addBookCard() {
    //    console.log(this.title);
    }
    
}

class Form {
    #formIsDisplayed = false;
    #displayFormButton = document.querySelector("#display-form");
    #formPopUpDiv = document.querySelector("#form-popup");
    #titleForm = document.querySelector("#booktitle");
    #authorForm = document.querySelector("#author");
    #pageForm = document.querySelector("#page");
    #bookDisplayDiv = document.querySelector("#book-display");
    #saveButton = document.querySelector("#save-book");
    #checkBox = document.querySelector("#check-read");
    #library = [];
    constructor() {
        this.clickNewBookButton();
        this.clickSaveButton();
    }

    displayForm() {
        if (!this.#formIsDisplayed) {
            this.#displayFormButton.remove();
            this.#formPopUpDiv.style.display = "block";
            this.#formIsDisplayed = true;
        }
        else {
            this.#formPopUpDiv.style.display = "none";
            const newBookDiv = document.querySelector("#button-display");
            newBookDiv.appendChild(this.#displayFormButton);
            this.#formIsDisplayed = false;
        }
    }
    clearFields() {
        this.#titleForm.value = "";
        this.#authorForm.value = "";
        this.#pageForm.value = "";
    }

    addBookToLibrary() {
        if (!this.#titleForm.value || !this.#authorForm.value || !this.#pageForm.value) {
            alert("Please enter a value for all fields");
            return; 
        }
        if (!parseInt(this.#pageForm.value)) {
            alert("Please enter a number in the pages field");
            return;
        }
        //TODO: Set the book title, author, pages, read values here
        const book = new Book(this.#titleForm.value, this.#authorForm.value, 
            this.#pageForm.value, this.#checkBox.checked);
        this.#library.push(book);
        this.displayForm();
    }

    addBookCard() {
        //Check to see if bookDisplayDiv has childnodes to remove
        while (this.#bookDisplayDiv.hasChildNodes()) {
            this.#bookDisplayDiv.removeChild(this.#bookDisplayDiv.firstChild);
        }
       
        this.#bookDisplayDiv.style.cssText = 
            `grid-template-rows: repeat(${this.#library.length}, 1fr);`;
        
        for (let i = 0; i < this.#library.length; i++) {
            const book = this.#library[i];
            const cardDisplay = document.createElement("div");
            const readButton = document.createElement("button");
            const removeButton = document.createElement("button");
            const readStatus = document.createElement("label");
    
            readButton.innerHTML = "Change read status"
            removeButton.innerHTML = "Remove book";
            cardDisplay.className = "grid-div";
         
            cardDisplay.dataset.number = i;
            const dataNumber = cardDisplay.dataset.number;
            this.changeReadStatus(book, cardDisplay);
            this.#bookDisplayDiv.appendChild(cardDisplay);
            cardDisplay.appendChild(readButton);
            cardDisplay.appendChild(removeButton);
            
            removeButton.addEventListener("click", () => {
                const allCards = document.querySelectorAll(".grid-div")
                
                allCards.forEach((card) => {
                    const cardToRemove = parseInt(card.getAttribute("data-number"));
                    if (parseInt(dataNumber) === cardToRemove) {
                        this.#library.splice(cardToRemove, 1);
                        card.remove();
                    }
                });
            });
    
            readButton.addEventListener("click", () => {
                const readBook = document.querySelectorAll(".grid-div");
                readBook.forEach(book => {
                    const bookIndex = parseInt(book.getAttribute("data-number"));
                    if (parseInt(dataNumber) === bookIndex) {
                        const libraryIndex = this.#library[dataNumber];
                        const bookStatus = libraryIndex.read ? false : true; 
                        libraryIndex.read = bookStatus;
                        cardDisplay.innerHTML = ""
                        this.changeReadStatus(libraryIndex, cardDisplay);
                        cardDisplay.appendChild(readButton);
                        cardDisplay.appendChild(removeButton);
                    }
                })
            });
        }
    }

    changeReadStatus(book, cardDisplay) {

        cardDisplay.innerHTML = 
        `<b>Title:</b> ${book.title}<br><b>Author:</b> ${book.author}<br>
        <b>Pages:</b> ${book.pages}`;  
        cardDisplay.style.cssText = `border-bottom: 1px solid black;
        font-size: 25px; background-color: #555; color: white;`;
        
        if (book.read) {
            cardDisplay.innerHTML += `<br><b>Status:</b> Read<br>`;
        }
        else {
            cardDisplay.innerHTML += `<br><b>Status:</b> Not read<br>`;
        }
    }

    clickNewBookButton() {
        this.#displayFormButton.addEventListener("click", () => {
            this.displayForm();
        });
    }

    clickSaveButton() {
        const titleForm = document.querySelector("#booktitle");
        const authorForm = document.querySelector("#author");
        const pageForm = document.querySelector("#page");
        this.#saveButton.addEventListener("click", () => {
            this.addBookToLibrary();
            this.clearFields();
            this.addBookCard();
        })
    }

    
}


const form = new Form();