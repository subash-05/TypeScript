var currentUser : any;
var userIDAuto : any = undefined;
var bookIDAuto : any = undefined;
var borrowIDAuto : any = undefined;
const base64string : any = undefined;

//interfaces
interface UserDetails
{
    //properties
    userID : number,
    userName : string,
    gender : string,
    department : string,
    phone : string,
    mailID : string,
    balance : number,
    password : string
}

interface BookDetails
{
    bookID : number,
    bookName : string,
    authorName : string, 
    bookCount : number,
}

interface BorrowDetails
{
    borrowID : number,
    bookID : number,
    userID : number,
    borrowedDate : any,
    count : number,
    status : string,
    paidFineAmount : number
}

let editingId : number = 0;
const form = document.getElementById("addBook") as HTMLFormElement;
const bookNameInput = document.getElementById("bookNameInput") as HTMLInputElement;
const bookCountInput = document.getElementById("bookCountInput");
const photoInput = document.getElementById("fileInput");


//functions
const RegisterPage = () => {
    let registerPage = document.getElementById("registerPage") as HTMLDivElement;
    let loginPage = document.getElementById("loginPage") as HTMLDivElement;
    registerPage.style.display = "block";
    loginPage.style.display = "none";
}

const LoginPage = () => {
    let registerPage = document.getElementById("registerPage") as HTMLDivElement;
    let loginPage = document.getElementById("loginPage") as HTMLDivElement;
    loginPage.style.display = "block";
    registerPage.style.display = "none";
}

const Register = async () => {
    let nameInput = document.getElementById("nameInput") as HTMLInputElement;
    let genderInput = document.getElementById("genderInput") as HTMLInputElement;
    let deptInput = document.getElementById("deptInput") as HTMLInputElement;
    let phoneInput = document.getElementById("phoneInput") as HTMLInputElement;
    let mailInput = document.getElementById("mailInput") as HTMLInputElement;
    let balanceInput = document.getElementById("balanceInput") as HTMLInputElement;
    let passInput = document.getElementById("passInput") as HTMLInputElement;
    let photoInput = document.getElementById("fileInput") as HTMLInputElement;

    const file = photoInput.files?.[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const base64string = event.target?.result as string;
    }

    const userList = await fetchUser();

    const user : UserDetails = {
        userID : userIDAuto,
        userName : nameInput.value,
        gender : genderInput.value,
        department : deptInput.value,
        phone : phoneInput.value,
        mailID : mailInput.value,
        balance : Number(balanceInput.value),
        password : passInput.value
    }
    addUserDetails(user);

    userList.forEach(user => {
        if(nameInput.value.toLowerCase() == user.userName.toLowerCase())
            {
                alert(`Registration success. Your card number is ${user.userID}`);
            }
    })

    nameInput.value = "";
    phoneInput.value = "";
    balanceInput.value = "";
}

const CheckUser = async() =>
{
    let mailInput = document.getElementById("email") as HTMLInputElement;
    let passInput = document.getElementById("pass") as HTMLInputElement;

    let mainPage = document.getElementById("mainPage") as HTMLDivElement;
    let loginPage = document.getElementById("loginPage") as HTMLDivElement;
    let messageBox = document.getElementById("message") as HTMLDivElement;
    messageBox.style.display = "block";

    let valid : boolean = false;
    const userList = await fetchUser();
    userList.forEach(user => {
        if(user.mailID == mailInput.value)
        {
            valid = true;
                let menu = document.getElementById("menu") as HTMLDivElement;
                mainPage.style.display = "none";
                loginPage.style.display = "none";
                menu.style.display = "flex";

                currentUser = user;
            /*
            if(user.password == passInput.value)
            {
                
            }
            else alert("Wrong password");
            */
        }
    })
    if(!valid)
    {
        alert("Invalid email");
    }
}

async function RenderBookDetails()
{
    (document.getElementById("showCount") as HTMLDivElement).style.display = "none";
}

async function BorrowBook()
{
    let messageBox = document.getElementById("message") as HTMLDivElement;
    messageBox.innerText = "";
    let borrowBox = document.getElementById("borrowBook") as HTMLDivElement;
    borrowBox.style.display = "block";
    let bookInput = document.getElementById("bookInput") as HTMLInputElement;
    let avail : boolean = false;

    const bookList = await fetchBook();
    
    bookList.forEach(book => {
        if(book.bookID == Number(bookInput.value))
        {
            avail = true;
        }
    })
    if(!avail)
    {
        alert("Invalid Book ID, Please enter valid ID");
    }
}

async function ShowBorrowHistory()
{
    
    const borrowList = await fetchBorrow();

    let dataTable = document.getElementById("dataTable") as HTMLTableElement;
    let tableBody = document.getElementById("tableBody") as HTMLTableElement;
    let messageBox = document.getElementById("message") as HTMLDivElement;
    messageBox.style.display = "none";

    dataTable.style.display = "block";
    tableBody.innerHTML = "";
    borrowList.forEach(item => {
        
            const row = document.createElement("tr");

            row.innerHTML = `<td>${item.borrowID}</td>
                             <td>${item.bookID}</td>
                             <td>${item.userID}</td>
                             <td>${item.borrowedDate.split("T")[0].split("-").reverse().join("/")}</td>
                             <td>${item.count}</td>
                             <td>${item.status}</td>
                             <td>${item.paidFineAmount}</td>`

            tableBody.appendChild(row);
        
    })
}



//API functions
async function fetchUser() : Promise<UserDetails[]> 
{
    const apiUrl = 'http://localhost:5052/api/UserDetails';
    const response = await fetch(apiUrl);
    if(!response.ok)
    {
        throw new Error('Failed to fetch user detail');
    }
    return await response.json();
}

async function fetchBook() : Promise<BookDetails[]> 
{
    const apiUrl = 'http://localhost:5052/api/BookDetails';
    const response = await fetch(apiUrl);
    if(!response.ok)
    {
        throw new Error('Failed to fetch book detail');
    }
    return await response.json();
}

async function fetchBorrow() : Promise<BorrowDetails[]> 
{
    const apiUrl = 'http://localhost:5052/api/BorrowDetails';
    const response = await fetch(apiUrl);
    if(!response.ok)
    {
        throw new Error('Failed to fetch user detail');
    }
    return await response.json();
}

async function addUserDetails(user : UserDetails) : Promise<void>
{
    const response = await fetch('http://localhost:5052/api/UserDetails', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(user)
    });
    if(!response.ok)
    {
        throw new Error('Failed to add user')
    }
}

async function addBookDetails(book : BookDetails) : Promise<void>
{
    const response = await fetch('http://localhost:5052/api/BookDetails', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(book)
    });
    if(!response.ok)
    {
        throw new Error('Failed to add book')
    }
}

