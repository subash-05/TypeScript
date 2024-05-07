var currentUser;

let userIDAuto = 2;
let medicineIDAuto = 303;
//let orderIDAuto = 200;
let defaultBalance : number= 5000;


//interface
interface User
{
    userID : number;
    name : string;
    mail : string;
    phone : string;
    newPass : string;
    confirmPass : string;
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

//const UserArray = await fetchUser();
//const MedicineArray = await fetchMedicine();

//functions
async function SignInPage()
{
    let signIn = document.getElementById("signIn") as HTMLDivElement;
    var login = document.getElementById("loginPage") as HTMLDivElement;
    let exists = document.getElementById("existingUsers") as HTMLLabelElement;
    signIn.style.display = "block";   
    login.style.display = "none";

    exists.innerHTML = "<h2>Available Users</h2>";
    
    const UserArray = await fetchUser();

    for(let i=0; i<UserArray.length; i++)
    {
        exists.innerHTML += `Email: ${UserArray[i].mail}     |     PhoneNumber: ${UserArray[i].phone}     |<br>`;
    }
}

function SignUpPage()
{
    let signUp = document.getElementById("signUp") as HTMLDivElement;
    var login = document.getElementById("loginPage") as HTMLDivElement;
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

async function SignUp()
{
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
        if(item.mail.toLowerCase() == mail.toLowerCase())
        {
            exist = true;
            alert("User exist");
        }
    })

    if(!exist)
    {
        const user : User = {
            userID: -1,
            name: name,
            mail: mail,
            phone: phone,
            newPass: newPass,
            confirmPass: confirmPass,
            balance: defaultBalance
        }
        addUser(user);
        alert("Registration success!");
    }
    //let user = new NewUser(name, mail, phone, newPass, confirmPass, defaultBalance);
    //UserArray.push(user);
    
}

async function SignIn()
{
    let mail = (document.getElementById("email") as HTMLInputElement).value;
    let signInPage = document.getElementById("signIn") as HTMLDivElement;
    let pass = (document.getElementById("pass") as HTMLInputElement).value;
    let menu = document.getElementById("menu") as HTMLDivElement;
    let valid : boolean = false;

    const UserArray = await fetchUser();
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
    //Menu();
    let medicine = document.getElementById("medicine") as HTMLDivElement;
    medicine.innerHTML = `<h2>Welcome ${currentUser.name}</h2>`;
    medicine.style.display = "block";
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

async function PurchaseMedicine(medicineInput)
{
    let medicine = document.getElementById("medicine") as HTMLLabelElement;
    const MedicineArray = await fetchMedicine();
    const OrderArray = await fetchOrder();

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
                            element.quantity -= quantityInput;
                            currentUser.balance -= element.price * quantityInput;
                            total = element.price * quantityInput;

                            const order: Order = {
                                orderID : -1,
                                medicineID : element.medicineID,
                                medicineName : element.medicineName,
                                count : quantityInput,
                                totalAmount : total
                            };

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
    
    medicine.innerHTML = `<h2>Hello ${currentUser.name}</h2>`;
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

async function AddAmount()
{
    let amount = (document.getElementById("amount") as HTMLInputElement).value;

    currentUser.balance += Number(amount);

   await updateUser(currentUser.userID, currentUser);
    

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

async function CancelOrder(orderID, quantity)
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
            OrderArray.splice(i,1);
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
        let id;
        let quant;

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
                medicineID: ++medicineIDAuto,
                medicineName: name,
                price: parseInt(price.value),
                quantity: quant
            }
            updateMedicine(id, editMedicine);
        }
        if(!exist)
        {
            const medicine : Medicine = {
                medicineID: ++medicineIDAuto,
                medicineName: newMedicine.value,
                price: parseInt(price.value),
                quantity: Number(quantity.value)
            }
            //MedicineArray.push(new Medicine(newMedicine.value, parseInt(price.value), parseInt(quantity.value)));
            addMedicine(medicine);
        }
    }
    else alert("Enter the inputs");
    RenderTable();
    newMedicine.value = "";
    price.value = "";
    quantity.value = "";
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
                         <td><button onclick="Delete()">Delete</button>`;

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
    RenderTable();
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

async function DeleteMedicine(id: number, medicine: Medicine): Promise<void> {
    const response = await fetch('http://localhost:5238/api/Medicine' , {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(medicine)
    });
    if(!response.ok) {
        throw new Error('Failed to delete medicine');
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


