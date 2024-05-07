"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var currentUser;
let userIDAuto = undefined;
let medicineIDAuto = undefined;
let orderIDAuto = undefined;
let defaultBalance = 5000;
//array
/*
let UserArray : Array<NewUser> = new Array<NewUser>; //let UserArray : NewUser[]
let MedicineArray : Array<Medicines> = new Array<Medicines>;
let OrderArray : Array<Order> = new Array<Order>;
*/
//functions
function toRegister() {
    let register = document.getElementById("register");
    register.style.display = "block";
    let login = document.getElementById("login");
    login.style.display = "none";
    let loginButton = document.getElementById("loginButton");
    loginButton.style.backgroundColor = "white";
    let registerButton = document.getElementById("registerButton");
    registerButton.style.backgroundColor = "rgb(174, 202, 255)";
}
function toLogin() {
    let login = document.getElementById("login");
    login.style.display = "block";
    let register = document.getElementById("register");
    register.style.display = "none";
    let registerButton = document.getElementById("registerButton");
    registerButton.style.backgroundColor = "white";
    let loginButton = document.getElementById("loginButton");
    loginButton.style.backgroundColor = "rgb(174, 202, 255)";
}
function SignInPage() {
    return __awaiter(this, void 0, void 0, function* () {
        let signIn = document.getElementById("signIn");
        let login = document.getElementById("loginPage");
        let exists = document.getElementById("existingUsers");
        signIn.style.display = "block";
        login.style.display = "none";
        exists.innerHTML = "<h2>Available Users</h2>";
        const UserArray = yield fetchUser();
        for (let i = 0; i < UserArray.length; i++) {
            exists.innerHTML += `Email: ${UserArray[i].emailID}     |     PhoneNumber: ${UserArray[i].phone}     |<br>`;
        }
    });
}
function SignUpPage() {
    let signUp = document.getElementById("signUp");
    let login = document.getElementById("loginPage");
    signUp.style.display = "block";
    login.style.display = "none";
}
function Back() {
    let signUp = document.getElementById("signUp");
    var login = document.getElementById("loginPage");
    let medicine = document.getElementById("medicine");
    medicine.style.display = "none";
    login.style.display = "block";
    signUp.style.display = "none";
}
function LogOut() {
    let loginContainer = document.getElementById("loginContainer");
    loginContainer.style.display = "block";
    let login = document.getElementById("loginPage");
    let menu = document.getElementById("menu");
    let message = document.getElementById("medicine");
    menu.style.display = "none";
    login.style.display = "block";
    message.innerText = "";
}
function SignUp() {
    return __awaiter(this, void 0, void 0, function* () {
        let loginContainer = document.getElementById("loginContainer");
        let medicine = document.getElementById("medicine");
        medicine.style.display = "block";
        medicine.innerHTML = "<button onclick = 'Back()'>Back</button> <br>";
        const UserArray = yield fetchUser();
        let name = document.getElementById("name").value;
        let mail = document.getElementById("newMail").value;
        let phone = document.getElementById("phone").value;
        let newPass = document.getElementById("newPassword").value;
        let confirmPass = document.getElementById("confirmPassword").value;
        //const user;
        let exist = false;
        UserArray.forEach(item => {
            if (item.emailID.toLowerCase() == mail.toLowerCase()) {
                exist = true;
                alert("User exist");
            }
        });
        if (!exist) {
            const user = {
                userID: userIDAuto,
                userName: name,
                emailID: mail,
                phone: phone,
                password: newPass,
                confirmPassword: confirmPass,
                balance: defaultBalance
            };
            addUser(user);
            loginContainer.style.display = "none";
            alert("Registration success!");
        }
        //let user = new NewUser(name, mail, phone, newPass, confirmPass, defaultBalance);
        //UserArray.push(user);
    });
}
function SignIn() {
    return __awaiter(this, void 0, void 0, function* () {
        let loginContainer = document.getElementById("loginContainer");
        let medicine = document.getElementById("medicine");
        let mail = document.getElementById("email");
        let signInPage = document.getElementById("signIn");
        let pass = document.getElementById("pass");
        let menu = document.getElementById("menu");
        let valid = false;
        const UserArray = yield fetchUser();
        UserArray.forEach(element => {
            if (element.emailID == mail.value) {
                valid = true;
                if (element.password == pass.value) {
                    loginContainer.style.display = "none";
                    currentUser = element;
                    menu.style.display = "flex";
                    signInPage.style.display = "none";
                    medicine.innerHTML = `<h2>Welcome ${currentUser.userName}</h2>`;
                    medicine.style.display = "block";
                }
                else {
                    alert("Wrong password");
                }
            }
        });
        if (!valid) {
            alert("Enter valid email");
        }
        //Menu();
        mail.value = "";
        pass.value = "";
    });
}
function DisplayMedicine() {
    let medicine = document.getElementById("medicine");
    let toAdd = document.getElementById("toAdd");
    let menu = document.getElementById("menu");
    menu.style.display = "none";
    medicine.style.display = "block";
    medicine.innerHTML = "<h2>Medicine List</h2><br>";
    toAdd.style.display = "block";
    medicine.innerHTML += "<button onclick = 'Menu()'>Back</button> <br>";
    RenderTable();
}
function Purchase() {
    return __awaiter(this, void 0, void 0, function* () {
        let medicine = document.getElementById("medicine");
        medicine.innerHTML = "";
        const MedicineArray = yield fetchMedicine();
        let purchase = document.getElementById("purchase");
        let menu = document.getElementById("menu");
        let topUp = document.getElementById("topUp");
        topUp.style.display = "none";
        menu.style.display = "none";
        purchase.style.display = "block";
        medicine.style.display = "block";
        MedicineArray.forEach(element => {
            medicine.innerHTML += `|   Medicine Name: ${element.medicineName}   |   Price: ${element.price}   |    Quantity: ${element.quantity}   |   <button onclick="PurchaseMedicine('${element.medicineID}')">Buy</button><br><br>`;
        });
    });
}
function PurchaseMedicine(medicineInput) {
    return __awaiter(this, void 0, void 0, function* () {
        let medicine = document.getElementById("medicine");
        const MedicineArray = yield fetchMedicine();
        //const OrderArray = await fetchOrder();
        let quantityInput = document.getElementById("quantityInput");
        let flag = false;
        let balance;
        let total;
        if (currentUser.balance > 0 && Number(quantityInput.value) > 0) {
            MedicineArray.forEach(element => {
                if (medicineInput == (element.medicineID)) {
                    flag = true;
                    if (Number(quantityInput.value) <= element.quantity) {
                        if (currentUser.balance >= element.price * Number(quantityInput.value)) {
                            //medicine.innerHTML = "";
                            balance = true;
                            element.quantity -= Number(quantityInput.value);
                            currentUser.balance -= element.price * Number(quantityInput.value);
                            total = element.price * Number(quantityInput.value);
                            const order = {
                                orderID: orderIDAuto,
                                medicineID: element.medicineID,
                                medicineName: element.medicineName,
                                count: Number(quantityInput.value),
                                totalAmount: total
                            };
                            const med = {
                                medicineID: element.medicineID,
                                medicineName: element.medicineName,
                                price: element.price,
                                quantity: element.quantity
                            };
                            updateMedicine(element.medicineID, med);
                            updateUser(currentUser.userID, currentUser);
                            //OrderArray.push(new Order(element.medicineID, element.medicineName, quantityInput,total));
                            addOrder(order);
                            medicine.innerHTML = `<h2>${element.medicineName} Ordered Successfully!`;
                        }
                        else if (!balance) {
                            alert("Insufficient balance");
                        }
                    }
                    else {
                        alert("Quantity not available!");
                    }
                }
            });
            if (!flag) {
                alert("Invalid input");
            }
        }
        else {
            alert("Enter quantity");
        }
        quantityInput.value = "";
    });
}
function Menu() {
    let menu = document.getElementById("menu");
    let purchase = document.getElementById("purchase");
    let medicine = document.getElementById("medicine");
    const dataTable = document.getElementById("dataTable");
    let toAdd = document.getElementById("toAdd");
    medicine.innerText = "none";
    dataTable.style.display = "none";
    menu.style.display = "flex";
    purchase.style.display = "none";
    toAdd.style.display = "none";
    medicine.innerHTML = `<h2>Hello ${currentUser.userName}</h2>`;
    medicine.style.display = "block";
    let topUp = document.getElementById("topUp");
    topUp.style.display = "none";
}
function OrderHistory() {
    return __awaiter(this, void 0, void 0, function* () {
        const OrderArray = yield fetchOrder();
        let topUp = document.getElementById("topUp");
        topUp.style.display = "none";
        //let menu = document.getElementById("menu") as HTMLDivElement;
        //menu.style.display = "none";
        let medicine = document.getElementById("medicine");
        medicine.style.display = "block";
        medicine.innerHTML = "<h2>Order History</h2>";
        OrderArray.forEach(element => {
            medicine.innerHTML += `MedicineName: ${element.medicineName}   |   Quantity: ${element.count}   |   Total: ${element.totalAmount}<br>`;
        });
    });
}
function TopUpPage() {
    let medicine = document.getElementById("medicine");
    medicine.style.display = "none";
    let topUp = document.getElementById("topUp");
    topUp.style.display = "block";
}
function AddAmount() {
    let amount = document.getElementById("amount").value;
    currentUser.balance += Number(amount);
    updateUser(currentUser.userID, currentUser);
    let medicine = document.getElementById("medicine");
    medicine.style.display = "block";
    medicine.innerHTML = `<h2>Amount ${amount} added to your account.</h2><h2>Current balance is ${currentUser.balance}</h2>`;
}
function ShowBalance() {
    let topUp = document.getElementById("topUp");
    topUp.style.display = "none";
    let medicine = document.getElementById("medicine");
    medicine.style.display = "block";
    medicine.innerHTML = `<h2>Current balance is ${currentUser.balance}</h2>`;
}
function Cancel() {
    return __awaiter(this, void 0, void 0, function* () {
        let topUp = document.getElementById("topUp");
        topUp.style.display = "none";
        const OrderArray = yield fetchOrder();
        let medicine = document.getElementById("medicine");
        medicine.style.display = "block";
        medicine.innerHTML = "<h2>Order History</h2>";
        OrderArray.forEach(element => {
            medicine.innerHTML += `|   Medicine Name: ${element.medicineName}   |   Quantity: ${element.count}   |   Total: ${element.totalAmount}   |   <button onclick="CancelOrder('${element.orderID}','${element.count}')">Cancel</button>  |<br><br>`;
        });
    });
}
function CancelOrder(orderID, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        let medicine = document.getElementById("medicine");
        const OrderArray = yield fetchOrder();
        const MedicineArray = yield fetchMedicine();
        for (let i = 0; i < OrderArray.length; i++) {
            if (OrderArray[i].orderID == orderID) {
                currentUser.balance += OrderArray[i].totalAmount;
                MedicineArray.forEach(item => {
                    if (OrderArray[i].medicineID == item.medicineID) {
                        item.quantity += Number(quantity);
                    }
                });
                deleteOrder(OrderArray[i].orderID, OrderArray[i]);
                //OrderArray.splice(i,1);
                medicine.innerHTML = "<h2>Order cancelled!</h2>";
            }
        }
    });
}
const AddItem = () => __awaiter(void 0, void 0, void 0, function* () {
    let newMedicine = document.getElementById("newMedicine");
    let price = document.getElementById("price");
    let quantity = document.getElementById("quantity");
    const MedicineArray = yield fetchMedicine();
    if (newMedicine.value != "" && price.value != "" && quantity.value != "") {
        let exist = false;
        let name;
        let id = 0;
        let quant = 0;
        MedicineArray.forEach(item => {
            if (item.medicineName.toLowerCase() == newMedicine.value.toLowerCase()) {
                alert("medicine exist");
                name = item.medicineName;
                id = item.medicineID;
                quant = item.quantity + Number(quantity.value);
                exist = true;
            }
        });
        if (exist) {
            const editMedicine = {
                medicineID: id,
                medicineName: name,
                price: parseInt(price.value),
                quantity: quant
            };
            updateMedicine(editMedicine.medicineID, editMedicine);
            RenderTable();
        }
        if (!exist) {
            const medicine = {
                medicineID: medicineIDAuto,
                medicineName: newMedicine.value,
                price: Number(price.value),
                quantity: Number(quantity.value)
            };
            //MedicineArray.push(new Medicine(newMedicine.value, parseInt(price.value), parseInt(quantity.value)));
            addMedicine(medicine);
        }
    }
    else
        alert("Enter the inputs");
    newMedicine.value = "";
    price.value = "";
    quantity.value = "";
});
function DeleteItem(medID) {
    return __awaiter(this, void 0, void 0, function* () {
        const MedicineArray = yield fetchMedicine();
        MedicineArray.forEach(item => {
            if (item.medicineID == medID) {
                deleteMedicine(item.medicineID, item);
            }
        });
    });
}
function RenderTable() {
    return __awaiter(this, void 0, void 0, function* () {
        const tableBody = document.querySelector("#dataTable tbody");
        const dataTable = document.getElementById("dataTable");
        dataTable.style.display = "block";
        tableBody.innerHTML = "";
        const MedicineArray = yield fetchMedicine();
        MedicineArray.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${item.medicineName}</td>
                         <td>${item.price}</td>
                         <td>${item.quantity}</td>
                         <td><button class="delButton" onclick="DeleteItem('${item.medicineID}')">Delete</button>`;
            tableBody.appendChild(row);
        });
    });
}
;
function addUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5238/api/User', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Failed to add user');
        }
    });
}
function addMedicine(medicine) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5238/api/Medicine', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(medicine)
        });
        if (!response.ok) {
            throw new Error('Failed to add medicine');
        }
        RenderTable();
    });
}
function addOrder(order) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5238/api/Order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });
        if (!response.ok) {
            throw new Error('Failed to add order');
        }
    });
}
function updateMedicine(id, medicine) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5238/api/Medicine/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(medicine)
        });
        if (!response.ok) {
            throw new Error('Failed to update medicine');
        }
        //RenderTable();
    });
}
function updateUser(id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5238/api/User/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Failed to update medicine');
        }
    });
}
function deleteMedicine(id, medicine) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5238/api/Medicine/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application.json'
            },
            body: JSON.stringify(medicine)
        });
        if (!response.ok) {
            throw new Error('Failed to delete medicine');
        }
        RenderTable();
    });
}
function deleteOrder(id, order) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5238/api/Order/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application.json'
            },
            body: JSON.stringify(order)
        });
        if (!response.ok) {
            throw new Error('Failed to delete order');
        }
    });
}
function fetchMedicine() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5238/api/Medicine';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch medicine');
        }
        return yield response.json();
    });
}
function fetchUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5238/api/User';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch user');
        }
        return yield response.json();
    });
}
function fetchOrder() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5238/api/Order';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch order');
        }
        return yield response.json();
    });
}
