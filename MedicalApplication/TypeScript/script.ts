var currentUser;
let medicineIDAuto = 100;
let orderIDAuto = 200;

//classes
class NewUser
{
    mail : string
    phone : string
    newPass : string
    confirmPass : string

    constructor(mail : string, phone : string, newPass : string, confirmPass : string)
    {
        this.mail = mail;
        this.phone = phone;
        this.newPass = newPass;
        this.confirmPass = confirmPass;
    }
}

class Medicines
{
    medicineID : string;
    medicineName : string;
    price : number;
    quantity : number;

    constructor(medicineName : string, price : number, quantity : number)
    {
        medicineIDAuto++;

        this.medicineID = "MID" + String(medicineIDAuto);
        this.medicineName = medicineName;
        this.price = price;
        this.quantity = quantity;
    }
}

class Order
{
    orderID : string;
    medicineID : string;
    medicineName : string;
    count : number;

    constructor(medicineID : string, medicineName : string, count : number)
    {
        orderIDAuto++;

        this.orderID = "OID" + orderIDAuto;
        this.medicineID = medicineID;
        this.medicineName = medicineName;
        this.count = count;
    }
}

//array
let UserArray : Array<NewUser> = new Array<NewUser>; //let UserArray : NewUser[]

let user1 = new NewUser("subash@gmail.com", "9876543210", "abcd", "abcd");
let user2 = new NewUser("sally@yahoo.com", "8765432190", "xyz", "xyz");

UserArray.push(user1);
UserArray.push(user2);

let MedicineArray : Array<Medicines> = new Array<Medicines>;

MedicineArray.push(new Medicines("Paracetamol", 18, 20));
MedicineArray.push(new Medicines("Stepsil", 23, 10));
MedicineArray.push(new Medicines("Vicks", 13, 30));

let OrderArray : Array<Order> = new Array<Order>;



//functions
function SignInPage()
{
    let signIn = document.getElementById("signIn") as HTMLDivElement;
    var login = document.getElementById("loginPage") as HTMLDivElement;
    let exists = document.getElementById("existingUsers") as HTMLLabelElement;
    signIn.style.display = "block";   
    login.style.display = "none";

    exists.innerHTML = "<h2>Available Users</h2>";

    for(let i=0; i<UserArray.length; i++)
    {
        exists.innerHTML += `Email: ${UserArray[i].mail}     |     PhoneNumber: ${UserArray[i].phone}<br>`;
    }
}

function SignUpPage()
{
    let signUp = document.getElementById("signUp") as HTMLDivElement;
    var login = document.getElementById("loginPage") as HTMLDivElement;
    signUp.style.display = "block";
    login.style.display = "none";
}

function SignUp()
{
    let mail = (document.getElementById("newMail") as HTMLInputElement).value;
    let phone = (document.getElementById("phone") as HTMLInputElement).value;
    let newPass = (document.getElementById("newPassword") as HTMLInputElement).value;
    let confirmPass = (document.getElementById("confirmPassword") as HTMLInputElement).value;

    let user = new NewUser(mail, phone, newPass, confirmPass);
    UserArray.push(user);
}

function SignIn()
{
    let mail = (document.getElementById("email") as HTMLInputElement).value;
    let signInPage = document.getElementById("signIn") as HTMLDivElement;
    let pass = (document.getElementById("pass") as HTMLInputElement).value;
    let menu = document.getElementById("menu") as HTMLDivElement;

    UserArray.forEach(element => {
        if(element.mail == mail)
        {
            if(element.newPass.match(pass))
            {
                currentUser = element;
                menu.style.display = "flex";
                signInPage.style.display = "none";
            }
            else
            {
                alert("Wrong password");
            }
        }       
    })
}

function DisplayMedicine()
{
    let medicine = document.getElementById("medicine") as HTMLDivElement;
    
    let menu = document.getElementById("menu") as HTMLDivElement;

    menu.style.display = "none";
    medicine.style.display = "block";
    medicine.innerHTML = "<h2>Medicine List</h2><br>";
    MedicineArray.forEach(element => {
        medicine.innerHTML += `Medicine ID: ${element.medicineID}   |   Medicine Name: ${element.medicineName}   |   Price: ${element.price}   |    Quantity: ${element.quantity}<br>`
    })
}

function Purchase()
{
    let medicine = document.getElementById("medicine") as HTMLDivElement;
    let purchase = document.getElementById("purchase") as HTMLDivElement;
    let menu = document.getElementById("menu") as HTMLDivElement;
    menu.style.display = "none";
    purchase.style.display = "block";
    medicine.style.display = "block";
    MedicineArray.forEach(element => {
        medicine.innerHTML += `Medicine ID: ${element.medicineID}   |   Medicine Name: ${element.medicineName}   |   Price: ${element.price}   |    Quantity: ${element.quantity}<br>`
    })   
}

function PurchaseMedicine()
{
    let medicineInput = (document.getElementById("medicineInput") as HTMLInputElement).value;
    let quantityInput = (document.getElementById("quantityInput") as HTMLInputElement).value;

    MedicineArray.forEach(element => {
        if(medicineInput.toUpperCase().match(element.medicineID))
        {
            if(Number(quantityInput) <= element.quantity)
            {
                alert("Medicine ordered successfully!");
                element.quantity -= Number(quantityInput);
                OrderArray.push(new Order(element.medicineID, element.medicineName, Number(quantityInput)));
            }
            else
            {
                alert("Quantity not available!");
            }
        }
    })
}

function Menu()
{
    let menu = document.getElementById("menu") as HTMLDivElement;
    let purchase = document.getElementById("purchase") as HTMLDivElement;
    let medicine = document.getElementById("medicine") as HTMLDivElement;
    menu.style.display = "flex";
    purchase.style.display = "none";
    medicine.style.display = "none";
}

function OrderHistory()
{
    let menu = document.getElementById("menu") as HTMLDivElement;
    menu.style.display = "none";

    let medicine = document.getElementById("medicine") as HTMLDivElement;
    medicine.style.display = "block";
    medicine.innerHTML = "<h2>Order History</h2>";

    OrderArray.forEach(element => {
        medicine.innerHTML += `OrderID: ${element.orderID}   |   MedicineID: ${element.medicineID}   |   MedicineName: ${element.medicineName}   |   Quantity: ${element.count}`;
    })
}

