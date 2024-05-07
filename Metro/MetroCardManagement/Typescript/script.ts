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
    balance : number
}

interface TravelDetails
{
    travelID : string;
    cardNumber : number;
    fromLocation : string;
    toLocation : string;
    date : Date;
    travelCost : number;
}

class TicketDetails
{
    ticketID : string;
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
    let registerPage = document.getElementById("registerPage") as HTMLDivElement;
    let loginPage = document.getElementById("loginPage") as HTMLDivElement;
    loginPage.style.display = "block";
    registerPage.style.display = "none";
}

const CheckUser = () => {
    let userInput = document.getElementById("userInput") as HTMLInputElement;
    let mainPage = document.getElementById("mainPage") as HTMLDivElement;
    let loginPage = document.getElementById("loginPage") as HTMLDivElement;
    if(userInput.value == "one")
    {
        let menu = document.getElementById("menu") as HTMLDivElement;
        mainPage.style.display = "none";
        loginPage.style.display = "none";
        menu.style.display = "flex";
    }
    else alert("Invalid Input!");
}

const fetchTravel = async () : Promise<TravelDetails[]> => {
    const apiUrl = 'http://localhost:5272/api/TravelDetails';
    const response = await fetch(apiUrl);
    if(!response.ok)
    {
        throw new Error('Failed to fetch travel detail');
    }
    return await response.json();
}
