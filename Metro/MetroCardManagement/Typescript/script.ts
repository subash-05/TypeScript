var currentUser : any;
let cardNumberAuto : any = undefined;
let travelIDAuto : any = undefined;
let ticketIDAuto : any = undefined;

//interfaces
interface UserDetails
{
    //properties
    userName : string,
    phone : string,
    cardNumber : number,
    balance : number,
    // email : string,
    // password : string,
    photo : string[]
}

interface TravelDetails
{
    travelID : number;
    cardNumber : number;
    fromLocation : string;
    toLocation : string;
    date : any;
    travelCost : number;
}

class TicketDetails
{
    ticketID : number;
    fromLocation : string;
    toLocation : string;
    ticketPrice : number;
}


//functions
const RegisterPage = () => {
    let registerPage = document.getElementById("registerPage") as HTMLDivElement;
    let loginPage = document.getElementById("loginPage") as HTMLDivElement;
    registerPage.style.display = "block";
    loginPage.style.display = "none";
}

const LoginPage = () => {
    let userTable = document.getElementById("userTable") as HTMLTableElement;
    userTable.style.display = "none";
    let registerPage = document.getElementById("registerPage") as HTMLDivElement;
    let loginPage = document.getElementById("loginPage") as HTMLDivElement;
    loginPage.style.display = "block";
    registerPage.style.display = "none";
}

 const Register = async () => {
    
    let nameInput = document.getElementById("nameInput") as HTMLInputElement;
    let phoneInput = document.getElementById("phoneInput") as HTMLInputElement;
    let balanceInput = document.getElementById("balanceInput") as HTMLInputElement;
    //let emailInput = document.getElementById("emailInput") as HTMLInputElement;
    //let passInput = document.getElementById("passInput") as HTMLInputElement;
    let photoInput = document.getElementById("fileInput") as HTMLInputElement;

    const file = photoInput.files?.[0];
    let base64String : any = "";
    if(file)
    {
        const reader = new FileReader();
        
        reader.onload = function (event) {
            base64String = event.target?.result; //contains the base64 encoded string
            const user : UserDetails = {
                cardNumber : cardNumberAuto,
                userName : nameInput.value,
                phone : phoneInput.value,
                balance : Number(balanceInput.value),
                //email : emailInput.value,
                //password : passInput.value,
                photo : [base64String]
            }
            addUserDetails(user);
            
        }
        reader.readAsDataURL(file);

    }
    
  
    const userList = await fetchUser();
    userList.forEach(user => {
        if(nameInput.value.toLowerCase() == user.userName.toLowerCase())
            {
                alert(`Registration success. Your card number is ${user.cardNumber}`);
            }
    })
    UserTable();

    nameInput.value = "";
    phoneInput.value = "";
    balanceInput.value = "";
}

const CheckUser = async () => {
    let userTable = document.getElementById("userTable") as HTMLTableElement;
    userTable.style.display = "none";
    let userInput = document.getElementById("userInput") as HTMLInputElement;
    let mainPage = document.getElementById("mainPage") as HTMLDivElement;
    let loginPage = document.getElementById("loginPage") as HTMLDivElement;
    let messageBox = document.getElementById("message") as HTMLDivElement;
    messageBox.style.display = "block";
    
    let flag : boolean = false;
    const userList = await fetchUser();
    userList.forEach(user => {
        if(user.cardNumber == Number(userInput.value))
        {
            flag = true;
            let menu = document.getElementById("menu") as HTMLDivElement;
            mainPage.style.display = "none";
            loginPage.style.display = "none";
            menu.style.display = "flex";

            currentUser = user;
            console.log(user);
        }
    })
    messageBox.innerHTML = `<h3>Welcome ${currentUser.userName}!</h3>`;
    if(!flag)
    {
        alert("User not available!");
    }
}

function BalanceCheck()
{
    let userTable = document.getElementById("userTable") as HTMLTableElement;
    userTable.style.display = "none";
    let messageBox = document.getElementById("message") as HTMLDivElement;
    messageBox.style.display = "block";
    let travelTable = document.getElementById("travelTable") as HTMLTableElement;
    let ticketTable = document.getElementById("ticketTable") as HTMLTableElement;
    ticketTable.style.display = "none";
    travelTable.style.display = "none";

    messageBox.innerText = `Current Balance: ${currentUser.balance}`;
}

function Recharge()
{
    let travelTable = document.getElementById("travelTable") as HTMLTableElement;
    let ticketTable = document.getElementById("ticketTable") as HTMLTableElement;
    ticketTable.style.display = "none";
    travelTable.style.display = "none";
    let messageBox = document.getElementById("message") as HTMLDivElement;
    messageBox.style.display = "block";
    messageBox.innerText = "";
    messageBox.innerHTML = "<input id='amountInput' type ='text' placeholder='enter the amount'><button onclick='RechargeBalance()'>Recharge</button>";
}

async function RechargeBalance()
{
    let userTable = document.getElementById("userTable") as HTMLTableElement;
    userTable.style.display = "none";
    const userList = await fetchUser();
    let messageBox = document.getElementById("message") as HTMLDivElement;
    
    let amountInput = document.getElementById("amountInput") as HTMLInputElement;
    
    userList.forEach(user => {
        if(user.cardNumber == currentUser.cardNumber)
        {
            currentUser.balance += Number(amountInput.value);
        }
    })
    messageBox.innerHTML += `Amount ${amountInput} is added to the account`
    updateUserDetails(currentUser.cardNumber, currentUser);
}

async function ShowTravelHistory()
{
    const travelList = await fetchTravel();
    let userTable = document.getElementById("userTable") as HTMLTableElement;
    userTable.style.display = "none";
    let travelTable = document.getElementById("travelTable") as HTMLTableElement;
    let ticketTable = document.getElementById("ticketTable") as HTMLTableElement;
    let tableBody = document.getElementById("tableBody") as HTMLTableSectionElement;
    let messageBox = document.getElementById("message") as HTMLDivElement;
    messageBox.style.display = "none";
    ticketTable.style.display = "none";
    travelTable.style.display = "block";
    tableBody.innerHTML = "";
    travelList.forEach(item => {
        if(item.cardNumber == currentUser.cardNumber)
        {
            const row = document.createElement("tr");
        
            row.innerHTML = `<td>${item.travelID}</td>
                         <td>${item.cardNumber}</td>
                         <td>${item.fromLocation}</td>
                         <td>${item.toLocation}</td>
                         <td>${item.date.split("T")[0].split("-").reverse().join("/")}</td>
                         <td>${item.travelCost}</td>`

        tableBody.appendChild(row);
        }
    })
}

async function UserTable()
{
    const userList = await fetchUser();

    let userTable = document.getElementById("userTable") as HTMLTableElement;
    userTable.style.display = "block";
    let userTableBody = document.getElementById("userTableBody") as HTMLTableSectionElement;
    userTableBody.innerHTML = "";

    userList.forEach(user => {
        const row = document.createElement("tr");

        row.innerHTML = `<td>${user.cardNumber}</td>
                         <td>${user.userName}</td>
                         <td>${user.phone}</td>
                         <td>${user.balance}</td>
                         <td><img id='image' src='${user.photo}'></td>`
        userTableBody.append(row);
    })
}

function Display()
{
    UserTable();
}

async function Travel()
{
    let idInput = document.getElementById("idInput") as HTMLInputElement;
    const ticketList = await fetchTicket();
    let valid : boolean = false;

    ticketList.forEach(ticket => {
        if(ticket.ticketID == Number(idInput.value))
        {
            valid = true;
            if(currentUser.balance >= ticket.ticketPrice)
            {
                currentUser.balance -= ticket.ticketPrice;
                const travel : TravelDetails = {
                    travelID : travelIDAuto,
                    cardNumber : currentUser.cardNumber,
                    fromLocation : ticket.fromLocation,
                    toLocation : ticket.toLocation,
                    date : new Date(),
                    travelCost : ticket.ticketPrice
                }
                addTravelDetails(travel);
                alert("Booked");
            }
            else
            {
                alert("Insufficient balance");
            }
        }
    })
    if(!valid)
    {
        alert("Enter valid id");
    }
}

async function ShowTicketDetails()
{
    let messageBox = document.getElementById("message") as HTMLInputElement;
    messageBox.style.display = "block";
    messageBox.innerHTML = "<input type='text' id='idInput' placeholder='enter the travelid'><button onclick='Travel()'>Book</button>";

    const ticketList = await fetchTicket();

    let travelTable = document.getElementById("travelTable") as HTMLTableElement;
    travelTable.style.display = "none";
    let ticketTable = document.getElementById("ticketTable") as HTMLDivElement;
    let ticketBody = document.getElementById("ticketBody") as HTMLTableSectionElement;
    ticketTable.style.display = "block";
    ticketBody.innerHTML = "";
    
    ticketList.forEach(ticket => {
        const row = document.createElement("tr");

        row.innerHTML = `<td>${ticket.ticketID}</td>
                                <td>${ticket.fromLocation}</td>
                                <td>${ticket.toLocation}</td>
                                <td>${ticket.ticketPrice}</td>`
        ticketBody.appendChild(row);
    })
}

function Exit()
{
    let travelTable = document.getElementById("travelTable") as HTMLTableElement;
    travelTable.style.display = "none";
    let ticketTable = document.getElementById("ticketTable") as HTMLTableElement;
    ticketTable.style.display = "none";
    let messageBox = document.getElementById("message") as HTMLInputElement;
    messageBox.style.display = "none";
    let menu = document.getElementById("menu") as HTMLDivElement;
    menu.style.display = "none";

    let mainPage = document.getElementById("mainPage") as HTMLDivElement;
    mainPage.style.display = "block";
}



async function downloadCSVFile() {
 const datalist = await fetchTicket();

 
 let output ="";
 output += "TicketID,FromLocation,ToLocation,TicketPrice\n";
 for(let i=0;i<datalist.length;i++)
    {
        output+=datalist[i].ticketID+","+datalist[i].fromLocation+","+datalist[i].toLocation+","+datalist[i].ticketPrice+"\n";
    }
    // Create CSV file object and feed our
    // csv_data into it
    const CSVFile = new Blob([output], { type: "text/csv" });
 
    // Create to temporary link to initiate
    // download process
    let temp_link = document.createElement('a');
 
    // Download csv file
    temp_link.download = "TicketPriceDetails.csv";
    let url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;
 
    // This link should not be displayed
    temp_link.style.display = "none";
    document.body.appendChild(temp_link);
 
    // Automatically click the link to trigger download 
    temp_link.click();
    document.body.removeChild(temp_link);
}

//API functions
const fetchTravel = async () : Promise<TravelDetails[]> => {
    const apiUrl = 'http://localhost:5272/api/TravelDetails';
    const response = await fetch(apiUrl);
    if(!response.ok)
    {
        throw new Error('Failed to fetch travel detail');
    }
    return await response.json();
}

const fetchUser = async () : Promise<UserDetails[]> => {
    const apiUrl = 'http://localhost:5272/api/UserDetails';
    const response = await fetch(apiUrl);
    if(!response.ok)
    {
        throw new Error('Failed to fetch user detail');
    }
    return await response.json();
}

async function fetchTicket() : Promise<TicketDetails[]> 
{
    const apiUrl = 'http://localhost:5272/api/TicketDetails';
    const response = await fetch(apiUrl);
    if(!response.ok)
    {
        throw new Error('Failed to fetch ticket detail');
    }
    return await response.json();
}

async function addTravelDetails(travel : TravelDetails) : Promise<void>
{
    const response = await fetch('http://localhost:5272/api/TravelDetails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(travel)
    });
    if(!response.ok)
    {
        throw new Error('Failed to add travel detail');
    }
}

async function addUserDetails(user : UserDetails) : Promise<void>
{
    const response = await fetch('http://localhost:5272/api/UserDetails', {
        method : 'POST',
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

async function updateUserDetails(id: number, user : UserDetails) : Promise<void>
{
    const response = await fetch(`http://localhost:5272/api/UserDetails/${id}`, {

        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    if(!response.ok)
    {
        throw new Error("Failed to update user");
    }
}

async function updateTravelDetails(id: number, travel : TravelDetails) : Promise<void>
{
    const response = await fetch(`http://localhost:5272/api/TravelDetails/${id}`, {

        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(travel)
    });
    if(!response.ok)
    {
        throw new Error("Failed to update travel detail");
    }
}
