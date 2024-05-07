var currentUser : any;

let userIDAuto : any = undefined;
let medicineIDAuto : any = undefined;
let orderIDAuto : any = undefined;
let defaultBalance : number= 5000;


//interface
interface User
{
    userID : number;
    userName : string;
    emailID : string;
    phone : string;
    password : string;
    confirmPassword : string;
    balance: number;
}

interface Medicine
{
    medicineID : number;
    medicineName : string;
    price : number;
    quantity : number;
}

interface Order
{
    orderID : number;
    medicineID : number;
    medicineName : string;
    count : number;
    totalAmount : number;
}


//array
/*
let UserArray : Array<NewUser> = new Array<NewUser>; //let UserArray : NewUser[]
let MedicineArray : Array<Medicines> = new Array<Medicines>;
let OrderArray : Array<Order> = new Array<Order>;
*/


//functions
function toRegister()
{
    let register = document.getElementById("register") as HTMLDivElement;
    register.style.display = "block";
    let login = document.getElementById("login") as HTMLDivElement;
    login.style.display = "none";
    let loginButton = document.getElementById("loginButton") as HTMLButtonElement;
    loginButton.style.backgroundColor = "white";
    let registerButton = document.getElementById("registerButton") as HTMLButtonElement;
    registerButton.style.backgroundColor = "rgb(174, 202, 255)";
}

function toLogin()
{
    let login = document.getElementById("login") as HTMLDivElement;
    login.style.display = "block";
    let register = document.getElementById("register") as HTMLDivElement;
    register.style.display = "none";
    let registerButton = document.getElementById("registerButton") as HTMLButtonElement;
    registerButton.style.backgroundColor = "white";
    let loginButton = document.getElementById("loginButton") as HTMLButtonElement;
    loginButton.style.backgroundColor = "rgb(174, 202, 255)";
}

async function SignInPage()
{
    let signIn = document.getElementById("signIn") as HTMLDivElement;
    let login = document.getElementById("loginPage") as HTMLDivElement;
    let exists = document.getElementById("existingUsers") as HTMLLabelElement;
    signIn.style.display = "block";   
    login.style.display = "none";

    exists.innerHTML = "<h2>Available Users</h2>";

    const UserArray = await fetchUser();

    for(let i=0; i<UserArray.length; i++)
    {
        exists.innerHTML += `Email: ${UserArray[i].emailID}     |     PhoneNumber: ${UserArray[i].phone}     |<br>`;
    }
}

function SignUpPage()
{
    let signUp = document.getElementById("signUp") as HTMLDivElement;
    let login = document.getElementById("loginPage") as HTMLDivElement;
    signUp.style.display = "block";
    login.style.display = "none";
}

function Back()
{
    let signUp = document.getElementById("signUp") as HTMLDivElement;
    var login = document.getElementById("loginPage") as HTMLDivElement;
    let medicine = document.getElementById("medicine") as HTMLLabelElement;
    medicine.style.display = "none";
    login.style.display = "block";
    signUp.style.display = "none";
}

function LogOut()
{
    let loginContainer = document.getElementById("loginContainer") as HTMLDivElement;
    loginContainer.style.display = "block";
    let login = document.getElementById("loginPage") as HTMLDivElement;
    let menu = document.getElementById("menu") as HTMLDivElement;
    let message = document.getElementById("medicine") as HTMLLabelElement;

    menu.style.display = "none";
    login.style.display = "block";
    message.innerText = "";
}

async function SignUp()
{
    let loginContainer = document.getElementById("loginContainer") as HTMLDivElement;

    let medicine = document.getElementById("medicine") as HTMLLabelElement;
    medicine.style.display = "block";
    medicine.innerHTML = "<button onclick = 'Back()'>Back</button> <br>";
    const UserArray = await fetchUser();

    let name = (document.getElementById("name") as HTMLInputElement).value;
    let mail = (document.getElementById("newMail") as HTMLInputElement).value;
    let phone = (document.getElementById("phone") as HTMLInputElement).value;
    let newPass = (document.getElementById("newPassword") as HTMLInputElement).value;
    let confirmPass = (document.getElementById("confirmPassword") as HTMLInputElement).value;

    //const user;
    let exist : boolean = false;

    UserArray.forEach(item => {
        if(item.emailID.toLowerCase() == mail.toLowerCase())
        {
            exist = true;
            alert("User exist");
        }
    })

    if(!exist)
    {
        const user : User = {
            userID: userIDAuto,
            userName: name,
            emailID: mail,
            phone: phone,
            password: newPass,
            confirmPassword: confirmPass,
            balance: defaultBalance
        }
        addUser(user);
        loginContainer.style.display = "none";
        alert("Registration success!");
    }
    //let user = new NewUser(name, mail, phone, newPass, confirmPass, defaultBalance);
    //UserArray.push(user);
    
}

async function SignIn()
{
    let loginContainer = document.getElementById("loginContainer") as HTMLDivElement;
    
    let medicine = document.getElementById("medicine") as HTMLDivElement;
    let mail = (document.getElementById("email") as HTMLInputElement);
    let signInPage = document.getElementById("signIn") as HTMLDivElement;
    let pass = (document.getElementById("pass") as HTMLInputElement);
    let menu = document.getElementById("menu") as HTMLDivElement;
    let valid : boolean = false;

    const UserArray = await fetchUser();
    UserArray.forEach(element => {
        if(element.emailID == mail.value)
        {
            valid = true;
            
            if(element.password == pass.value)
            {
                loginContainer.style.display = "none";
                currentUser = element;
                menu.style.display = "flex";
                signInPage.style.display = "none";
                medicine.innerHTML = `<h2>Welcome ${currentUser.userName}</h2>`;
                medicine.style.display = "block";
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
    //Menu();
    mail.value = "";
    pass.value = "";
}

function DisplayMedicine()
{
    let medicine = document.getElementById("medicine") as HTMLDivElement;
    let toAdd = document.getElementById("toAdd") as HTMLDivElement;
    let menu = document.getElementById("menu") as HTMLDivElement;

    menu.style.display = "none";
    medicine.style.display = "block";

    medicine.innerHTML = "<h2>Medicine List</h2><br>";
    toAdd.style.display = "block";
    medicine.innerHTML += "<button onclick = 'Menu()'>Back</button> <br>";
    
    RenderTable();
}

async function Purchase()
{
    let medicine = document.getElementById("medicine") as HTMLDivElement;
    medicine.innerHTML = "";

    const MedicineArray = await fetchMedicine();

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

async function PurchaseMedicine(medicineInput : number)
{
    let medicine = document.getElementById("medicine") as HTMLLabelElement;
    const MedicineArray = await fetchMedicine();
    //const OrderArray = await fetchOrder();

    let quantityInput = (document.getElementById("quantityInput") as HTMLInputElement);
    let flag : boolean = false;
    let balance : boolean;
    let total : number;
        if(currentUser.balance > 0 && Number(quantityInput.value) > 0)
        {
            MedicineArray.forEach(element => {
                if(medicineInput == (element.medicineID))
                {
                    flag = true;
                    
                    if(Number(quantityInput.value) <= element.quantity)
                    {
                        if(currentUser.balance >= element.price * Number(quantityInput.value))
                        {
                            //medicine.innerHTML = "";
                            balance = true;
                            element.quantity -= Number(quantityInput.value);
                            currentUser.balance -= element.price * Number(quantityInput.value);
                            total = element.price * Number(quantityInput.value);

                            const order: Order = {
                                orderID : orderIDAuto,
                                medicineID : element.medicineID,
                                medicineName : element.medicineName,
                                count : Number(quantityInput.value),
                                totalAmount : total
                            };

                            const med : Medicine = {
                                medicineID : element.medicineID,
                                medicineName : element.medicineName,
                                price : element.price,
                                quantity : element.quantity
                            }
                            updateMedicine(element.medicineID, med);

                            updateUser(currentUser.userID, currentUser);

                            //OrderArray.push(new Order(element.medicineID, element.medicineName, quantityInput,total));
                            addOrder(order);

                            medicine.innerHTML = `<h2>${element.medicineName} Ordered Successfully!`;
                        }
                        else if(!balance)
                        {
                            alert("Insufficient balance");
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
        quantityInput.value = "";
}

function Menu()
{
    let menu = document.getElementById("menu") as HTMLDivElement;
    let purchase = document.getElementById("purchase") as HTMLDivElement;
    let medicine = document.getElementById("medicine") as HTMLDivElement;
    const dataTable = document.getElementById("dataTable") as HTMLTableElement;
    let toAdd = document.getElementById("toAdd") as HTMLDivElement;

    medicine.innerText = "none";

    dataTable.style.display = "none";
    menu.style.display = "flex";
    purchase.style.display = "none";
    toAdd.style.display = "none";
    
    medicine.innerHTML = `<h2>Hello ${currentUser.userName}</h2>`;
    medicine.style.display = "block";
    let topUp = document.getElementById("topUp") as HTMLDivElement;
    topUp.style.display = "none";
}

async function OrderHistory()
{
    const OrderArray = await fetchOrder();
    let topUp = document.getElementById("topUp") as HTMLDivElement;
    topUp.style.display = "none";

    //let menu = document.getElementById("menu") as HTMLDivElement;
    //menu.style.display = "none";

    let medicine = document.getElementById("medicine") as HTMLDivElement;
    medicine.style.display = "block";
    medicine.innerHTML = "<h2>Order History</h2>";

    OrderArray.forEach(element => {
        medicine.innerHTML += `MedicineName: ${element.medicineName}   |   Quantity: ${element.count}   |   Total: ${element.totalAmount}<br>`;
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

    updateUser(currentUser.userID, currentUser);
    

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

async function Cancel()
{
    let topUp = document.getElementById("topUp") as HTMLDivElement;
    topUp.style.display = "none";
    const OrderArray = await fetchOrder();
    let medicine = document.getElementById("medicine") as HTMLLabelElement;
    medicine.style.display = "block";
    medicine.innerHTML = "<h2>Order History</h2>";

    OrderArray.forEach(element => {
        medicine.innerHTML += `|   Medicine Name: ${element.medicineName}   |   Quantity: ${element.count}   |   Total: ${element.totalAmount}   |   <button onclick="CancelOrder('${element.orderID}','${element.count}')">Cancel</button>  |<br><br>`;
    })
}

async function CancelOrder(orderID : number, quantity : number)
{
    let medicine = document.getElementById("medicine") as HTMLLabelElement;
    const OrderArray = await fetchOrder();
    const MedicineArray = await fetchMedicine();

    for(let i=0; i<OrderArray.length; i++)
    {
        if(OrderArray[i].orderID == orderID)
        {
            currentUser.balance += OrderArray[i].totalAmount;
            MedicineArray.forEach(item => {
                if(OrderArray[i].medicineID == item.medicineID)
                {
                    item.quantity += Number(quantity);
                }
            });
            deleteOrder(OrderArray[i].orderID, OrderArray[i]);
            //OrderArray.splice(i,1);
            
            medicine.innerHTML = "<h2>Order cancelled!</h2>";
        }
    }  
}


const AddItem = async () => {
    let newMedicine = (document.getElementById("newMedicine") as HTMLInputElement);
    let price = (document.getElementById("price") as HTMLInputElement);
    let quantity = (document.getElementById("quantity") as HTMLInputElement);

    const MedicineArray = await fetchMedicine();

    if(newMedicine.value != "" && price.value != "" && quantity.value != "")
    {
        let exist : boolean = false;
        let name : any;
        let id : number = 0;
        let quant : number = 0;

        MedicineArray.forEach(item => {
            if(item.medicineName.toLowerCase() == newMedicine.value.toLowerCase())
            {
                alert("medicine exist");
                name = item.medicineName;
                id = item.medicineID;
                quant = item.quantity + Number(quantity.value);
                exist = true;
            }
        })
        if(exist)
        {
            const editMedicine : Medicine = {
                medicineID: id,
                medicineName: name,
                price: parseInt(price.value),
                quantity: quant
            }
            updateMedicine(editMedicine.medicineID, editMedicine);
            RenderTable();
        }
        if(!exist)
        {
            const medicine : Medicine = {
                medicineID: medicineIDAuto,
                medicineName: newMedicine.value,
                price: Number(price.value),
                quantity: Number(quantity.value)
            }
            //MedicineArray.push(new Medicine(newMedicine.value, parseInt(price.value), parseInt(quantity.value)));
            addMedicine(medicine);
        }
    }
    else alert("Enter the inputs");
    
    newMedicine.value = "";
    price.value = "";
    quantity.value = "";
}

async function DeleteItem(medID : number)
{
    const MedicineArray = await fetchMedicine();

    MedicineArray.forEach(item => {
        if(item.medicineID == medID)
        {
            deleteMedicine(item.medicineID, item);
        }
    })
}

async function RenderTable()
{
    const tableBody = document.querySelector("#dataTable tbody") as HTMLTableSectionElement;
    const dataTable = document.getElementById("dataTable") as HTMLTableElement;
    dataTable.style.display = "block";
    tableBody.innerHTML = "";

    const MedicineArray = await fetchMedicine();

    MedicineArray.forEach(item => {
        const row = document.createElement("tr");

        row.innerHTML = `<td>${item.medicineName}</td>
                         <td>${item.price}</td>
                         <td>${item.quantity}</td>
                         <td><button class="delButton" onclick="DeleteItem('${item.medicineID}')">Delete</button>`;

        tableBody.appendChild(row);
    });
};

async function addUser(user: User): Promise<void> {
    const response = await fetch('http://localhost:5238/api/User', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    if(!response.ok) {
        throw new Error('Failed to add user');
    }
}

async function addMedicine(medicine:Medicine): Promise<void> {
    const response = await fetch('http://localhost:5238/api/Medicine', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(medicine)
    });
    if(!response.ok) {
        throw new Error('Failed to add medicine');
    }
    RenderTable();
}

async function addOrder(order:Order): Promise<void> {
    const response = await fetch('http://localhost:5238/api/Order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    });
    if(!response.ok) {
        throw new Error('Failed to add order');
    }
}

async function updateMedicine(id: number, medicine: Medicine): Promise<void> {
    const response = await fetch(`http://localhost:5238/api/Medicine/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(medicine)
    });
    if(!response.ok)
    {
        throw new Error('Failed to update medicine');
    }
    //RenderTable();
}

async function updateUser(id: number, user: User): Promise<void> {
    const response = await fetch(`http://localhost:5238/api/User/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    if(!response.ok)
    {
        throw new Error('Failed to update medicine');
    }
}

async function deleteMedicine(id: number, medicine: Medicine): Promise<void> {
    const response = await fetch(`http://localhost:5238/api/Medicine/${id}` , {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(medicine)
    });
    if(!response.ok) {
        throw new Error('Failed to delete medicine');
    }
    RenderTable();
}

async function deleteOrder(id: number, order: Order): Promise<void> {
    const response = await fetch(`http://localhost:5238/api/Order/${id}` , {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(order)
    });
    if(!response.ok) {
        throw new Error('Failed to delete order');
    }
}

async function fetchMedicine(): Promise<Medicine[]> {
    const apiUrl = 'http://localhost:5238/api/Medicine';
    const response = await fetch(apiUrl);
    if(!response.ok) {
        throw new Error('Failed to fetch medicine');
    }
    return await response.json();
}

async function fetchUser(): Promise<User[]> {
    const apiUrl = 'http://localhost:5238/api/User';
    const response = await fetch(apiUrl);
    if(!response.ok) {
        throw new Error('Failed to fetch user');
    }
    return await response.json();
}

async function fetchOrder(): Promise<Order[]> {
    const apiUrl = 'http://localhost:5238/api/Order';
    const response = await fetch(apiUrl);
    if(!response.ok) {
        throw new Error('Failed to fetch order');
    }
    return await response.json();
}


