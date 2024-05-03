var currentUser;
let userIDAuto = 500;
let medicineIDAuto = 100;
let orderIDAuto = 200;
let defaultBalance : number= 5000;

//classes
class NewUser
{
    userID : string
    name : string
    mail : string
    phone : string
    newPass : string
    confirmPass : string
    balance: number

    constructor(name : string, mail : string, phone : string, newPass : string, confirmPass : string, balance : number)
    {
        userIDAuto++;
        this.userID = "UID" + userIDAuto; 
        this.name = name;
        this.mail = mail;
        this.phone = phone;
        this.newPass = newPass;
        this.confirmPass = confirmPass;
        this.balance = defaultBalance;
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
    totalAmount : number;

    constructor(medicineID : string, medicineName : string, count : number, total : number)
    {
        orderIDAuto++;

        this.orderID = "OID" + orderIDAuto;
        this.medicineID = medicineID;
        this.medicineName = medicineName;
        this.count = count;
        this.totalAmount = total;
    }
}


//array
let UserArray : Array<NewUser> = new Array<NewUser>; //let UserArray : NewUser[]

let user1 = new NewUser("Subash","ss", "9876543210", "abcd", "abcd",defaultBalance);
let user2 = new NewUser("Sally","sally@yahoo.com", "8765432190", "xyz", "xyz",defaultBalance);

UserArray.push(user1);
UserArray.push(user2);

let MedicineArray : Array<Medicines> = new Array<Medicines>;

MedicineArray.push(new Medicines("Paracetamol", 18, 20));
MedicineArray.push(new Medicines("Stepsils", 23, 10));
MedicineArray.push(new Medicines("Vicks", 13, 30));

let OrderArray : Array<Order> = new Array<Order>;

OrderArray.push(new Order(MedicineArray[0].medicineID, MedicineArray[0].medicineName, MedicineArray[0].quantity, 45));
OrderArray.push(new Order("MID102", "Stepsils", 2, 23));


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
    let name = (document.getElementById("name") as HTMLInputElement).value;
    let mail = (document.getElementById("newMail") as HTMLInputElement).value;
    let phone = (document.getElementById("phone") as HTMLInputElement).value;
    let newPass = (document.getElementById("newPassword") as HTMLInputElement).value;
    let confirmPass = (document.getElementById("confirmPassword") as HTMLInputElement).value;

    let user = new NewUser(name, mail, phone, newPass, confirmPass, defaultBalance);
    UserArray.push(user);
}

function SignIn()
{
    let mail = (document.getElementById("email") as HTMLInputElement).value;
    let signInPage = document.getElementById("signIn") as HTMLDivElement;
    let pass = (document.getElementById("pass") as HTMLInputElement).value;
    let menu = document.getElementById("menu") as HTMLDivElement;
    let valid : boolean = false;

    UserArray.forEach(element => {
        if(element.mail == mail)
        {
            valid = true;
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
    if(!valid)
    {
        alert("Enter valid email");
    }
    Menu();
}

function DisplayMedicine()
{
    let medicine = document.getElementById("medicine") as HTMLDivElement;
    
    let menu = document.getElementById("menu") as HTMLDivElement;

    menu.style.display = "none";
    medicine.style.display = "block";
    medicine.innerHTML = "<h2>Medicine List</h2><br>";
    MedicineArray.forEach(element => {
        medicine.innerHTML += `Medicine Name: ${element.medicineName}   |   Price: ${element.price}   |    Quantity: ${element.quantity}<br>`
    })

    medicine.innerHTML += "<button onclick = 'Menu()'>Back</button>";
}

function Purchase()
{
    let medicine = document.getElementById("medicine") as HTMLDivElement;
    medicine.innerHTML = "";

    let purchase = document.getElementById("purchase") as HTMLDivElement;
    let menu = document.getElementById("menu") as HTMLDivElement;
    let topUp = document.getElementById("topUp") as HTMLDivElement;

    topUp.style.display = "none";
    menu.style.display = "none";
    purchase.style.display = "block";
    

    medicine.style.display = "block";

    MedicineArray.forEach(element => {
    medicine.innerHTML += `|   Medicine Name: ${element.medicineName}   |   Price: ${element.price}   |    Quantity: ${element.quantity}   |   <button onclick="PurchaseMedicine('${element.medicineID}')">Buy</button><br><br>`
    }) 
}

function PurchaseMedicine(medicineInput)
{
    let medicine = document.getElementById("medicine") as HTMLLabelElement;

    let quantityInput = Number((document.getElementById("quantityInput") as HTMLInputElement).value);
    let flag : boolean = false;
    let balance : boolean;
    let total : number;
        if(currentUser.balance > 0 && quantityInput > 0)
        {
            MedicineArray.forEach(element => {
                if(medicineInput == (element.medicineID))
                {
                    flag = true;
                    
                    if(quantityInput <= element.quantity)
                    {
                        if(currentUser.balance >= element.price * quantityInput)
                        {
                            //medicine.innerHTML = "";
                            balance = true;
                            alert("Medicine ordered successfully!");
                            element.quantity -= quantityInput;
                            currentUser.balance -= element.price * quantityInput;
                            total = element.price * quantityInput;
                            OrderArray.push(new Order(element.medicineID, element.medicineName, quantityInput,total));
                            medicine.innerHTML = "";
                            MedicineArray.forEach(element => {
                                medicine.innerHTML += `|   Medicine Name: ${element.medicineName}   |   Price: ${element.price}   |    Quantity: ${element.quantity}   |   <button onclick="PurchaseMedicine('${element.medicineID}')">Buy</button><br><br>`
                            }) 
                            
                        }
                        else if(!balance)
                        {
                            //alert("Insufficient balance");
                        }
                    }
                    else
                    {
                        alert("Quantity not available!");
                    }
                }
            })
            if(!flag)
            {
                    alert("Invalid input");
            }
        }
        else
        {
            alert("Enter quantity");
        }
}

function Menu()
{
    let menu = document.getElementById("menu") as HTMLDivElement;
    let purchase = document.getElementById("purchase") as HTMLDivElement;
    let medicine = document.getElementById("medicine") as HTMLDivElement;
    menu.style.display = "flex";
    purchase.style.display = "none";
    
    medicine.innerText = `Hello ${currentUser.name}`;
    medicine.style.display = "block";
    let topUp = document.getElementById("topUp") as HTMLDivElement;
    topUp.style.display = "none";
}

function OrderHistory()
{
    let topUp = document.getElementById("topUp") as HTMLDivElement;
    topUp.style.display = "none";

    //let menu = document.getElementById("menu") as HTMLDivElement;
    //menu.style.display = "none";

    let medicine = document.getElementById("medicine") as HTMLDivElement;
    medicine.style.display = "block";
    medicine.innerHTML = "<h2>Order History</h2>";

    OrderArray.forEach(element => {
        medicine.innerHTML += `OrderID: ${element.orderID}   |   MedicineID: ${element.medicineID}   |   MedicineName: ${element.medicineName}   |   Quantity: ${element.count}<br>`;
    })
}

function TopUpPage()
{
    let medicine = document.getElementById("medicine") as HTMLDivElement;
    
    medicine.style.display = "none";

    let topUp = document.getElementById("topUp") as HTMLDivElement;

    topUp.style.display = "block";
}

function AddAmount()
{
    let amount = (document.getElementById("amount") as HTMLInputElement).value;

    currentUser.balance += Number(amount);

    let medicine = document.getElementById("medicine") as HTMLDivElement;
    medicine.style.display = "block";

    medicine.innerHTML = `<h2>Amount ${amount} added to your account.</h2><h2>Current balance is ${currentUser.balance}</h2>`;
}

function ShowBalance()
{
    let topUp = document.getElementById("topUp") as HTMLDivElement;
    topUp.style.display = "none";

    let medicine = document.getElementById("medicine") as HTMLDivElement;
    medicine.style.display = "block";

    medicine.innerHTML = `<h2>Current balance is ${currentUser.balance}</h2>`;
}

function Cancel()
{
    let topUp = document.getElementById("topUp") as HTMLDivElement;
    topUp.style.display = "none";

    let medicine = document.getElementById("medicine") as HTMLDivElement;
    medicine.style.display = "block";
    medicine.innerHTML = "<h2>Order History</h2>";

    OrderArray.forEach(element => {
        medicine.innerHTML += `OrderID: ${element.orderID}   |   Medicine Name: ${element.medicineName}   |   Quantity: ${element.count}   |   <button onclick="CancelOrder('${element.orderID}','${element.count}')">Cancel</button>  |<br><br>`;
    })
}

function CancelOrder(orderID, quantity)
{
    for(let i=0; i<OrderArray.length; i++)
    {
        if(OrderArray[i].orderID == orderID)
        {
            currentUser.balance += OrderArray[i].totalAmount;
            MedicineArray.forEach(element => {
                if(OrderArray[i].medicineID == element.medicineID)
                {
                    element.quantity += Number(quantity);
                }
            })
            delete(OrderArray[i]);
        }
    }
}
