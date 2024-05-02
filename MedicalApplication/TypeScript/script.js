var currentUser;
var medicineIDAuto = 100;
var orderIDAuto = 200;
//classes
var NewUser = /** @class */ (function () {
    function NewUser(mail, phone, newPass, confirmPass) {
        this.mail = mail;
        this.phone = phone;
        this.newPass = newPass;
        this.confirmPass = confirmPass;
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
    function Order(medicineID, medicineName, count) {
        orderIDAuto++;
        this.orderID = "OID" + orderIDAuto;
        this.medicineID = medicineID;
        this.medicineName = medicineName;
        this.count = count;
    }
    return Order;
}());
//array
var UserArray = new Array; //let UserArray : NewUser[]
var user1 = new NewUser("subash@gmail.com", "9876543210", "abcd", "abcd");
var user2 = new NewUser("sally@yahoo.com", "8765432190", "xyz", "xyz");
UserArray.push(user1);
UserArray.push(user2);
var MedicineArray = new Array;
MedicineArray.push(new Medicines("Paracetamol", 18, 20));
MedicineArray.push(new Medicines("Stepsil", 23, 10));
MedicineArray.push(new Medicines("Vicks", 13, 30));
var OrderArray = new Array;
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
    var mail = document.getElementById("newMail").value;
    var phone = document.getElementById("phone").value;
    var newPass = document.getElementById("newPassword").value;
    var confirmPass = document.getElementById("confirmPassword").value;
    var user = new NewUser(mail, phone, newPass, confirmPass);
    UserArray.push(user);
}
function SignIn() {
    var mail = document.getElementById("email").value;
    var signInPage = document.getElementById("signIn");
    var pass = document.getElementById("pass").value;
    var menu = document.getElementById("menu");
    UserArray.forEach(function (element) {
        if (element.mail == mail) {
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
}
function DisplayMedicine() {
    var medicine = document.getElementById("medicine");
    var menu = document.getElementById("menu");
    menu.style.display = "none";
    medicine.style.display = "block";
    medicine.innerHTML = "<h2>Medicine List</h2><br>";
    MedicineArray.forEach(function (element) {
        medicine.innerHTML += "Medicine ID: ".concat(element.medicineID, "   |   Medicine Name: ").concat(element.medicineName, "   |   Price: ").concat(element.price, "   |    Quantity: ").concat(element.quantity, "<br>");
    });
}
function Purchase() {
    var medicine = document.getElementById("medicine");
    var purchase = document.getElementById("purchase");
    var menu = document.getElementById("menu");
    menu.style.display = "none";
    purchase.style.display = "block";
    medicine.style.display = "block";
    MedicineArray.forEach(function (element) {
        medicine.innerHTML += "Medicine ID: ".concat(element.medicineID, "   |   Medicine Name: ").concat(element.medicineName, "   |   Price: ").concat(element.price, "   |    Quantity: ").concat(element.quantity, "<br>");
    });
}
function PurchaseMedicine() {
    var medicineInput = document.getElementById("medicineInput").value;
    var quantityInput = document.getElementById("quantityInput").value;
    MedicineArray.forEach(function (element) {
        if (medicineInput.toUpperCase().match(element.medicineID)) {
            if (Number(quantityInput) <= element.quantity) {
                alert("Medicine ordered successfully!");
                element.quantity -= Number(quantityInput);
                OrderArray.push(new Order(element.medicineID, element.medicineName, Number(quantityInput)));
            }
            else {
                alert("Quantity not available!");
            }
        }
    });
}
function Menu() {
    var menu = document.getElementById("menu");
    var purchase = document.getElementById("purchase");
    var medicine = document.getElementById("medicine");
    menu.style.display = "flex";
    purchase.style.display = "none";
    medicine.style.display = "none";
}
function OrderHistory() {
    var menu = document.getElementById("menu");
    menu.style.display = "none";
    var medicine = document.getElementById("medicine");
    medicine.style.display = "block";
    medicine.innerHTML = "<h2>Order History</h2>";
    OrderArray.forEach(function (element) {
        medicine.innerHTML += "OrderID: ".concat(element.orderID, "   |   MedicineID: ").concat(element.medicineID, "   |   MedicineName: ").concat(element.medicineName, "   |   Quantity: ").concat(element.count);
    });
}
