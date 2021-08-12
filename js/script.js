
// DOM Elements
const search = document.getElementById('search'); // search
const usernameFrom = document.getElementById('user-name'); // search
const usernameInput = document.getElementById('name'); // search

const container = document.querySelector('.container');
const resultContainer = document.querySelector('.result__container');
const formContainer = document.querySelector('.form__container');
const user__name = document.querySelector('.user__name');
const add__form = document.querySelector('.add_form');
const returnHome = document.querySelector('.fa-home');
const main = document.getElementById('main');

const bookForm = document.getElementById('book-form');
const title = document.getElementById('title');
const author = document.getElementById('author');
const isbn = document.getElementById('isbn');



// USER LOGIN 
usernameFrom.addEventListener('submit', (e) => {
    e.preventDefault();
    const usernameValue = usernameInput.value.trim();

    if (usernameValue == '') {
        setError(usernameInput, "Username cannot be blank!");
    }else{

        setSuccess(usernameInput)
        setStoreUsername(usernameValue);
        setTimeout(() => {
            resultContainer.classList.add('active');
            container.classList.add('active');
        }, 500);
    }

})


// SET ERROR MESSAGE
function setError(input,err){
    const inputEl = input.parentElement;
    const msg = inputEl.querySelector('small');
    inputEl.classList.add('error');
    msg.innerText = err;
}

// SET SUCCESS MESSAGE
function setSuccess(input){
    const inputEl = input.parentElement;
    inputEl.classList.add('success');
    inputEl.classList.remove('error');

    setTimeout(() => {
        inputEl.classList.remove('success')
    }, 500);
}


// RETURN LOGIN FORM THIS EVENT EXECUTE
user__name.addEventListener('click', () => {
    window.location.reload();
})


// WHEN YOU CLICK THE BUTTON SHOW BOOKLIST FORM 
add__form.addEventListener('click', () => {
    resultContainer.classList.remove('active')
    formContainer.classList.add('active')
    
})

// RETURN HOME PAGE
returnHome.addEventListener('click', () => {
    resultContainer.classList.add('active')
    formContainer.classList.remove('active')
})


// BOOKLIST FROM SUBMIT EVENT
bookForm.addEventListener('submit' , (e) => {
    e.preventDefault();

    const titleValue = title.value.trim();
    const authorValue = author.value.trim();
    const isbnValue = isbn.value.trim();

    if (titleValue == '') {
        setError(title, "Title cannot be blank!")
    }else{
        setSuccess(title)
    }
    if (authorValue == '') {
        setError(author, "Author cannot be blank!")
    }else{
        setSuccess(author)
    }
    if (isbnValue == '') {
        setError(isbn, "#ISBN cannot be blank!")
    }else{
        setSuccess(isbn)

        setStoreData(titleValue,authorValue,isbnValue);
        setTimeout(() => {
            formContainer.classList.remove('active');
            resultContainer.classList.add('active');
            title.value = "";
            author.value = "";
            isbn.value = "";
        }, 500);
    }
})


 // SET LOCAL STORAGE BOOKLIST VALUE
function setStoreData(title,author,isbn){

    let bookObj;

    if (localStorage.getItem('books') == null) {
        bookObj = [];
    }else{
        bookObj = JSON.parse(localStorage.getItem('books'))
    }

    // DATE & TIME
    let now = new Date();
    let amPm = now.toLocaleString('en-US',{hour:'numeric',minute:'numeric',hour12:true});
    let dateTime = `${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()} || ${amPm}`

    let bookTempObj = {bookTitle:title,bookAuthor:author,bookIsbn:isbn,isCreated:dateTime}
    bookObj.push(bookTempObj);

    localStorage.setItem('books', JSON.stringify(bookObj));

    getDisplayData();
}


// GET LOCAL STORAGE BOOKLIST VALUE
function getDisplayData(){

    let bookObj;

    if (localStorage.getItem('books') == null) {
        bookObj = [];
    }else{
        bookObj = JSON.parse(localStorage.getItem('books'))
    }

    let reverseObj = bookObj.reverse();

    let output = '';

    reverseObj.forEach((list,index) => {
        output += `
        <div class="table__container">
                <div>
                    <div class="title__div">
                        <span>Title:</span>
                        <p class="titlee">${list.bookTitle}</p>
                    </div>
                    <div class="author__div">
                        <span>Author:</span>
                        <div class="">${list.bookAuthor}</div>
                    </div>
                    <div class="isbn__div">
                        <span>ISBN#:</span>
                        <div class="titel">${list.bookIsbn}</div>
                    </div>
                </div>
                <div>
                    <button class="remove" id="${index}" onclick="deleteBook(this.id)"><i class="fas fa-trash"></i></button>
                </div>
                <div class="dateTime">${list.isCreated}</div>
            </div>
        
        `;

    });

    if (reverseObj != 0) {
        
        main.innerHTML = output;
    }else{
        main.innerHTML = `<div class="check">Nothing to display 🙁</div>`
    }

}
getDisplayData();


// DELETE TEH BOOKLIST
function deleteBook(index){
    let bookObj;
    
    if (localStorage.getItem('books') == null) {
        bookObj = [];
    }else{
        bookObj = JSON.parse(localStorage.getItem('books'));
    }
    
    let reverseObj = bookObj.reverse();
    
    reverseObj.splice(index ,1);
    localStorage.setItem('books', JSON.stringify(bookObj));
    getDisplayData();
}






// SET LOCAL STORAGE USERNAME
function setStoreUsername(username){

    localStorage.setItem('BookUsername', username);
    getDisplayUsername();
}
// GET LOCAL STORAGE USERNAME
function getDisplayUsername(){

    let names  = localStorage.getItem('BookUsername')
    user__name.innerHTML = `<i class="fas fa-user-alt"></i> ${names}`;
}
getDisplayUsername();








// SEARCH FUNCTION

search.addEventListener('keyup', searchFun);  // Keyup Events

function searchFun(){
    
    const searchValue = search.value.toUpperCase(); // Convert to upperCase

    const main = document.getElementById('main');  // Main element
    const tableContainer = main.querySelectorAll('div .table__container'); // main element inside the table__container class


    // ES6 --> forEach Loop

    tableContainer.forEach((data,index) => { 
        const title = data.getElementsByTagName('p')[0];
        
        if (title.innerHTML.toUpperCase().indexOf(searchValue) != -1) {
            tableContainer[index].style.display = "";
        }else{
            
            tableContainer[index].style.display = "none";
        }
    });

    // ES5 --> for Loop

    // for (let i = 0; i < tableContainer.length; i++) {
        
    //     let title = tableContainer[i].getElementsByTagName('p')[0];

    //     if (title.innerHTML.toUpperCase().indexOf(searchValue) != -1) {
    //         tableContainer[i].style.display = "";
    //     }else{
    //         tableContainer[i].style.display = "none";
    //     }

    // }
}
