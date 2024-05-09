let currentUser : any;
let userIDAuto : any = undefined;
let productIDAuto : any = undefined;
let orderIDAuto : any = undefined;
let defaultBalance : number = 50;

//interfaces
interface UserDetails
{
    userID : number,
    userName : string,
    emailID : string,
    password : string,
    balance : number,
    phone : string,
    address : string
}

interface ProductDetails
{
    prodID : number,
    productName : string,
    quantityAvailable : number,
    unitPrice : number,
    purchaseDate : string,
    expiryDate : string,
    productImage : string[]
}

interface OrderDetails
{
    orderID : number,
    productName : string,
    dateOfPurchase : string,
    quantity : number,
    unitPrice : number,
    totalPrice : number
}


//functions
function LoginPage()
{
    const loginPage = document.getElementById("loginPage") as HTMLDivElement;
    loginPage.style.display = "block";
    const registerPage = document.getElementById("registerPage") as HTMLDivElement;
    registerPage.style.display = "none";
}

function RegisterPage()
{
    const registerPage = document.getElementById("registerPage") as HTMLDivElement;
    registerPage.style.display = "block";
    const loginPage = document.getElementById("loginPage") as HTMLDivElement;
    loginPage.style.display = "none";
}

function MenuPage()
{
    let mainPage = document.getElementById("mainPage") as HTMLDivElement;
    let menuPage = document.getElementById("menuPage") as HTMLDivElement;
    let messageBox = document.getElementById("messageBox") as HTMLDivElement;
    mainPage.style.display = "none";
    menuPage.style.display = "block";
    messageBox.style.display = "block";
    messageBox.innerHTML = "<h3>Hello User</h3>";
}

async function Login()
{
    let mailValue = document.getElementById("mailValue") as HTMLInputElement;
    let passValue = document.getElementById("passValue") as HTMLInputElement;
    let messageBox = document.getElementById("messageBox") as HTMLDivElement;
    let valid : boolean = false;
    const userList = await fetchUser();

    userList.forEach(user => {
        if(user.emailID == mailValue.value)
        {
            valid = true;
            if(user.password == passValue.value)
            {
                MenuPage();
                messageBox.innerHTML = `<h2>Hello ${currentUser.userName}</h2>`;
            }
            else alert("Wrong password");
        }
    })
    if(!valid)
    {
        alert("Enter valid email!");
    }

    mailValue.value = "";
    passValue.value = "";
}

function MainPage()
{
    let mainPage = document.getElementById("mainPage") as HTMLDivElement;
    let menuPage = document.getElementById("menuPage") as HTMLDivElement;
    let messageBox = document.getElementById("messageBox") as HTMLDivElement;
    let registerPage = document.getElementById("registerPage") as HTMLDivElement;
    let loginPage = document.getElementById("loginPage") as HTMLDivElement;
    loginPage.style.display = "block";
    mainPage.style.display = "block";
    menuPage.style.display = "none";
    messageBox.style.display = "none";
    registerPage.style.display = "none";
}

let form = document.getElementById("form") as HTMLFormElement;
form.addEventListener("submit", event => {
    event.preventDefault();

    let nameInput = document.getElementById("nameInput") as HTMLInputElement;
    let mailInput = document.getElementById("mailInput") as HTMLInputElement;
    let passInput = document.getElementById("passInput") as HTMLInputElement;
    let phoneInput = document.getElementById("phoneInput") as HTMLInputElement;
    let addressInput = document.getElementById("addressInput") as HTMLTextAreaElement;

    const user : UserDetails = {
        userID : userIDAuto,
        userName : nameInput.value,
        emailID : mailInput.value,
        password : passInput.value,
        balance : defaultBalance,
        phone : phoneInput.value,
        address : addressInput.value
    }
    addUser(user);
    MainPage();
})

//API functions
async function fetchUser() : Promise<UserDetails[]> 
{
    const apiUrl = 'http://localhost:5024/api/UserDetails';
    const response = await fetch(apiUrl);
    if(!response.ok)
    {
        throw new Error('cannot fetch user detail');
    }
    return await response.json();
}

async function addUser(user : UserDetails) : Promise<void>
{
    const response = await fetch('http://localhost:5024/api/UserDetails', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(user)
    })
    if(!response.ok)
    {
       throw new Error('cannot add product');
    }
}

async function addProduct(product : ProductDetails) : Promise<void>
{
    const response = await fetch('http://localhost:5024/api/ProductDetails', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(product)
    })
    if(!response.ok)
        {
            throw new Error('cannot add product');
        }
}

