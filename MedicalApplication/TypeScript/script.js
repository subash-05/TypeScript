var currentUser;
var userIDAuto = 500;
var medicineIDAuto = 100;
var orderIDAuto = 200;
var defaultBalance = 5000;
//classes
var NewUser = /** @class */ (function () {
    function NewUser(name, mail, phone, newPass, confirmPass, balance) {
        userIDAuto++;
        this.userID = "UID" + userIDAuto;
        this.name = name;
        this.mail = mail;
        this.phone = phone;
        this.newPass = newPass;
        this.confirmPass = confirmPass;
        this.balance = defaultBalance;
    }
    return NewUser;
}());
var Medicines = /** @class */ (function () {
    function Medicines(medicineName, price, quantity) {
        medicineIDAuto++;
        this.medicineID = "MID" + String(medicineIDAuto);
        this.medicineName = medicineName;
        this.price = price;
        this.quantity = quantity;
    }
    return Medicines;
}());
var Order = /** @class */ (function () {
    function Order(medicineID, medicineName, count, total) {
        orderIDAuto++;
        this.orderID = "OID" + orderIDAuto;
        this.medicineID = medicineID;
        this.medicineName = medicineName;
        this.count = count;
        this.totalAmount = total;
    }
    return Order;
}());
//array
var UserArray = new Array; //let UserArray : NewUser[]
var user1 = new NewUser("Subash", "ss", "9876543210", "abcd", "abcd", defaultBalance);
var user2 = new NewUser("Sally", "sally@yahoo.com", "8765432190", "xyz", "xyz", defaultBalance);
UserArray.push(user1);
UserArray.push(user2);
var MedicineArray = new Array;
MedicineArray.push(new Medicines("Paracetamol", 18, 20));
MedicineArray.push(new Medicines("Stepsils", 23, 10));
MedicineArray.push(new Medicines("Vicks", 13, 30));
var OrderArray = new Array;
OrderArray.push(new Order("MID101", "Paracetamol", 5, 90));
OrderArray.push(new Order("MID102", "Stepsils", 2, 46));
//functions
function SignInPage() {
    var signIn = document.getElementById("signIn");
    var login = document.getElementById("loginPage");
    var exists = document.getElementById("existingUsers");
    signIn.style.display = "block";
    login.style.display = "none";
    exists.innerHTML = "<h2>Available Users</h2>";
    for (var i = 0; i < UserArray.length; i++) {
        exists.innerHTML += "Email: ".concat(UserArray[i].mail, "     |     PhoneNumber: ").concat(UserArray[i].phone, "<br>");
    }
}
function SignUpPage() {
    var signUp = document.getElementById("signUp");
    var login = document.getElementById("loginPage");
    signUp.style.display = "block";
    login.style.display = "none";
}
function SignUp() {
    var name = document.getElementById("name").value;
    var mail = document.getElementById("newMail").value;
    var phone = document.getElementById("phone").value;
    var newPass = document.getElementById("newPassword").value;
    var confirmPass = document.getElementById("confirmPassword").value;
    var user = new NewUser(name, mail, phone, newPass, confirmPass, defaultBalance);
    UserArray.push(user);
}
function SignIn() {
    var mail = document.getElementById("email").value;
    var signInPage = document.getElementById("signIn");
    var pass = document.getElementById("pass").value;
    var menu = document.getElementById("menu");
    var valid = false;
    UserArray.forEach(function (element) {
        if (element.mail == mail) {
            valid = true;
            if (element.newPass.match(pass)) {
                currentUser = element;
                menu.style.display = "flex";
                signInPage.style.display = "none";
            }
            else {
                alert("Wrong password");
            }
        }
    });
    if (!valid) {
        alert("Enter valid email");
    }
    Menu();
}
function DisplayMedicine() {
    var medicine = document.getElementById("medicine");
    var toAdd = document.getElementById("toAdd");
    var menu = document.getElementById("menu");
    menu.style.display = "none";
    medicine.style.display = "block";
    medicine.innerHTML = "<h2>Medicine List</h2><br>";
    toAdd.style.display = "block";
    medicine.innerHTML += "<button onclick = 'Menu()'>Back</button> <br>";
    RenderTable();
}
function Purchase() {
    var medicine = document.getElementById("medicine");
    medicine.innerHTML = "";
    var purchase = document.getElementById("purchase");
    var menu = document.getElementById("menu");
    var topUp = document.getElementById("topUp");
    topUp.style.display = "none";
    menu.style.display = "none";
    purchase.style.display = "block";
    medicine.style.display = "block";
    MedicineArray.forEach(function (element) {
        medicine.innerHTML += "|   Medicine Name: ".concat(element.medicineName, "   |   Price: ").concat(element.price, "   |    Quantity: ").concat(element.quantity, "   |   <button onclick=\"PurchaseMedicine('").concat(element.medicineID, "')\">Buy</button><br><br>");
    });
}
function PurchaseMedicine(medicineInput) {
    var medicine = document.getElementById("medicine");
    var quantityInput = Number(document.getElementById("quantityInput").value);
    var flag = false;
    var balance;
    var total;
    if (currentUser.balance > 0 && quantityInput > 0) {
        MedicineArray.forEach(function (element) {
            if (medicineInput == (element.medicineID)) {
                flag = true;
                if (quantityInput <= element.quantity) {
                    if (currentUser.balance >= element.price * quantityInput) {
                        //medicine.innerHTML = "";
                        balance = true;
                        element.quantity -= quantityInput;
                        currentUser.balance -= element.price * quantityInput;
                        total = element.price * quantityInput;
                        OrderArray.push(new Order(element.medicineID, element.medicineName, quantityInput, total));
                        medicine.innerHTML = "<h2>".concat(element.medicineName, " Ordered Successfully!");
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
}
function Menu() {
    var menu = document.getElementById("menu");
    var purchase = document.getElementById("purchase");
    var medicine = document.getElementById("medicine");
    var dataTable = document.getElementById("dataTable");
    var toAdd = document.getElementById("toAdd");
    dataTable.style.display = "none";
    menu.style.display = "flex";
    purchase.style.display = "none";
    toAdd.style.display = "none";
    medicine.innerText = "Hello ".concat(currentUser.name);
    medicine.style.display = "block";
    var topUp = document.getElementById("topUp");
    topUp.style.display = "none";
}
function OrderHistory() {
    var topUp = document.getElementById("topUp");
    topUp.style.display = "none";
    //let menu = document.getElementById("menu") as HTMLDivElement;
    //menu.style.display = "none";
    var medicine = document.getElementById("medicine");
    medicine.style.display = "block";
    medicine.innerHTML = "<h2>Order History</h2>";
    OrderArray.forEach(function (element) {
        medicine.innerHTML += "MedicineName: ".concat(element.medicineName, "   |   Quantity: ").concat(element.count, "   |   Total: ").concat(element.totalAmount, "<br>");
    });
}
function TopUpPage() {
    var medicine = document.getElementById("medicine");
    medicine.style.display = "none";
    var topUp = document.getElementById("topUp");
    topUp.style.display = "block";
}
function AddAmount() {
    var amount = document.getElementById("amount").value;
    currentUser.balance += Number(amount);
    var medicine = document.getElementById("medicine");
    medicine.style.display = "block";
    medicine.innerHTML = "<h2>Amount ".concat(amount, " added to your account.</h2><h2>Current balance is ").concat(currentUser.balance, "</h2>");
}
function ShowBalance() {
    var topUp = document.getElementById("topUp");
    topUp.style.display = "none";
    var medicine = document.getElementById("medicine");
    medicine.style.display = "block";
    medicine.innerHTML = "<h2>Current balance is ".concat(currentUser.balance, "</h2>");
}
function Cancel() {
    var topUp = document.getElementById("topUp");
    topUp.style.display = "none";
    var medicine = document.getElementById("medicine");
    medicine.style.display = "block";
    medicine.innerHTML = "<h2>Order History</h2>";
    OrderArray.forEach(function (element) {
        medicine.innerHTML += "|   Medicine Name: ".concat(element.medicineName, "   |   Quantity: ").concat(element.count, "   |   Total: ").concat(element.totalAmount, "   |   <button onclick=\"CancelOrder('").concat(element.orderID, "','").concat(element.count, "')\">Cancel</button>  |<br><br>");
    });
}
function CancelOrder(orderID, quantity) {
    var medicine = document.getElementById("medicine");
    var _loop_1 = function (i) {
        if (OrderArray[i].orderID == orderID) {
            currentUser.balance += OrderArray[i].totalAmount;
            MedicineArray.forEach(function (element) {
                if (OrderArray[i].medicineID == element.medicineID) {
                    element.quantity += Number(quantity);
                }
            });
            OrderArray.splice(i, 1);
            medicine.innerHTML = "<h2>Order cancelled!</h2>";
        }
    };
    for (var i = 0; i < OrderArray.length; i++) {
        _loop_1(i);
    }
}
var AddItem = function () {
    var newMedicine = document.getElementById("newMedicine");
    var price = document.getElementById("price");
    var quantity = document.getElementById("quantity");
    if (newMedicine.value != "" && price.value != "" && quantity.value != "") {
        var exist_1 = false;
        MedicineArray.forEach(function (item) {
            if (item.medicineName.toLowerCase() == newMedicine.value.toLowerCase()) {
                exist_1 = true;
                item.price = Number(price.value);
                item.quantity += Number(quantity.value);
                alert("exist");
            }
        });
        if (!exist_1) {
            MedicineArray.push(new Medicines(newMedicine.value, parseInt(price.value), parseInt(quantity.value)));
        }
    }
    else
        alert("Enter the inputs");
    RenderTable();
    newMedicine.value = "";
    price.value = "";
    quantity.value = "";
};
var RenderTable = function () {
    var tableBody = document.querySelector("#dataTable tbody");
    var dataTable = document.getElementById("dataTable");
    dataTable.style.display = "block";
    tableBody.innerHTML = "";
    MedicineArray.forEach(function (item) {
        var row = document.createElement("tr");
        row.innerHTML = "<td>".concat(item.medicineName, "</td>\n                         <td>").concat(item.price, "</td>\n                         <td>").concat(item.quantity, "</td>");
        tableBody.appendChild(row);
    });
};
