var currentUser;

//interfaces
interface PersonalDetails
{
    //properties
    userName : string,
    phone : string
}

interface IBalance
{
    balance : number,

    WalletRecharge();
    DeductBalance();
}

interface UserDetails extends PersonalDetails, IBalance
{
    cardNumber : number,
    balance : number,

    WalletRecharge();
    DeductBalance();
}

interface TravelDetails
{
    travelID : number,
    cardNumber : number,
    fromLocation : string,
    toLocation : string,
    date : Date,
    travelCost : number
}

interface TicketDetails
{
    ticketID : number,
    fromLocation : string,
    toLocation : string,
    ticketPrice : number
}