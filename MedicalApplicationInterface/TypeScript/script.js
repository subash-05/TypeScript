var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var currentUser;
var userIDAuto = 2;
var medicineIDAuto = 303;
//let orderIDAuto = 200;
var defaultBalance = 5000;
//array
/*
let UserArray : Array<NewUser> = new Array<NewUser>; //let UserArray : NewUser[]
let MedicineArray : Array<Medicines> = new Array<Medicines>;
let OrderArray : Array<Order> = new Array<Order>;
*/
//const UserArray = await fetchUser();
//const MedicineArray = await fetchMedicine();
//functions
function SignInPage() {
    return __awaiter(this, void 0, void 0, function () {
        var signIn, login, exists, UserArray, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    signIn = document.getElementById("signIn");
                    login = document.getElementById("loginPage");
                    exists = document.getElementById("existingUsers");
                    signIn.style.display = "block";
                    login.style.display = "none";
                    exists.innerHTML = "<h2>Available Users</h2>";
                    return [4 /*yield*/, fetchUser()];
                case 1:
                    UserArray = _a.sent();
                    for (i = 0; i < 1; i++) {
                        exists.innerHTML += "Email: ".concat(UserArray[i].mail, "     |     PhoneNumber: ").concat(UserArray[i].phone, "     |<br>");
                    }
                    alert("message2");
                    return [2 /*return*/];
            }
        });
    });
}
function SignUpPage() {
    var signUp = document.getElementById("signUp");
    var login = document.getElementById("loginPage");
    signUp.style.display = "block";
    login.style.display = "none";
}
function Back() {
    var signUp = document.getElementById("signUp");
    var login = document.getElementById("loginPage");
    var medicine = document.getElementById("medicine");
    medicine.style.display = "none";
    login.style.display = "block";
    signUp.style.display = "none";
}
function SignUp() {
    return __awaiter(this, void 0, void 0, function () {
        var medicine, UserArray, name, mail, phone, newPass, confirmPass, exist, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    medicine = document.getElementById("medicine");
                    medicine.style.display = "block";
                    medicine.innerHTML = "<button onclick = 'Back()'>Back</button> <br>";
                    return [4 /*yield*/, fetchUser()];
                case 1:
                    UserArray = _a.sent();
                    name = document.getElementById("name").value;
                    mail = document.getElementById("newMail").value;
                    phone = document.getElementById("phone").value;
                    newPass = document.getElementById("newPassword").value;
                    confirmPass = document.getElementById("confirmPassword").value;
                    exist = false;
                    UserArray.forEach(function (item) {
                        if (item.mail.toLowerCase() == mail.toLowerCase()) {
                            exist = true;
                            alert("User exist");
                        }
                    });
                    if (!exist) {
                        user = {
                            userID: -1,
                            name: name,
                            mail: mail,
                            phone: phone,
                            newPass: newPass,
                            confirmPass: confirmPass,
                            balance: defaultBalance
                        };
                        addUser(user);
                        alert("Registration success!");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function SignIn() {
    return __awaiter(this, void 0, void 0, function () {
        var mail, signInPage, pass, menu, valid, UserArray, medicine;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mail = document.getElementById("email").value;
                    signInPage = document.getElementById("signIn");
                    pass = document.getElementById("pass").value;
                    menu = document.getElementById("menu");
                    valid = false;
                    return [4 /*yield*/, fetchUser()];
                case 1:
                    UserArray = _a.sent();
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
                    medicine = document.getElementById("medicine");
                    medicine.innerHTML = "<h2>Welcome ".concat(currentUser.name, "</h2>");
                    medicine.style.display = "block";
                    return [2 /*return*/];
            }
        });
    });
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
    return __awaiter(this, void 0, void 0, function () {
        var medicine, MedicineArray, purchase, menu, topUp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    medicine = document.getElementById("medicine");
                    medicine.innerHTML = "";
                    return [4 /*yield*/, fetchMedicine()];
                case 1:
                    MedicineArray = _a.sent();
                    purchase = document.getElementById("purchase");
                    menu = document.getElementById("menu");
                    topUp = document.getElementById("topUp");
                    topUp.style.display = "none";
                    menu.style.display = "none";
                    purchase.style.display = "block";
                    medicine.style.display = "block";
                    MedicineArray.forEach(function (element) {
                        medicine.innerHTML += "|   Medicine Name: ".concat(element.medicineName, "   |   Price: ").concat(element.price, "   |    Quantity: ").concat(element.quantity, "   |   <button onclick=\"PurchaseMedicine('").concat(element.medicineID, "')\">Buy</button><br><br>");
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function PurchaseMedicine(medicineInput) {
    return __awaiter(this, void 0, void 0, function () {
        var medicine, MedicineArray, OrderArray, quantityInput, flag, balance, total;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    medicine = document.getElementById("medicine");
                    return [4 /*yield*/, fetchMedicine()];
                case 1:
                    MedicineArray = _a.sent();
                    return [4 /*yield*/, fetchOrder()];
                case 2:
                    OrderArray = _a.sent();
                    quantityInput = Number(document.getElementById("quantityInput").value);
                    flag = false;
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
                                        var order = {
                                            orderID: -1,
                                            medicineID: element.medicineID,
                                            medicineName: element.medicineName,
                                            count: quantityInput,
                                            totalAmount: total
                                        };
                                        //OrderArray.push(new Order(element.medicineID, element.medicineName, quantityInput,total));
                                        addOrder(order);
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
                    return [2 /*return*/];
            }
        });
    });
}
function Menu() {
    var menu = document.getElementById("menu");
    var purchase = document.getElementById("purchase");
    var medicine = document.getElementById("medicine");
    var dataTable = document.getElementById("dataTable");
    var toAdd = document.getElementById("toAdd");
    medicine.innerText = "none";
    dataTable.style.display = "none";
    menu.style.display = "flex";
    purchase.style.display = "none";
    toAdd.style.display = "none";
    medicine.innerHTML = "<h2>Hello ".concat(currentUser.name, "</h2>");
    medicine.style.display = "block";
    var topUp = document.getElementById("topUp");
    topUp.style.display = "none";
}
function OrderHistory() {
    return __awaiter(this, void 0, void 0, function () {
        var OrderArray, topUp, medicine;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchOrder()];
                case 1:
                    OrderArray = _a.sent();
                    topUp = document.getElementById("topUp");
                    topUp.style.display = "none";
                    medicine = document.getElementById("medicine");
                    medicine.style.display = "block";
                    medicine.innerHTML = "<h2>Order History</h2>";
                    OrderArray.forEach(function (element) {
                        medicine.innerHTML += "MedicineName: ".concat(element.medicineName, "   |   Quantity: ").concat(element.count, "   |   Total: ").concat(element.totalAmount, "<br>");
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function TopUpPage() {
    var medicine = document.getElementById("medicine");
    medicine.style.display = "none";
    var topUp = document.getElementById("topUp");
    topUp.style.display = "block";
}
function AddAmount() {
    return __awaiter(this, void 0, void 0, function () {
        var amount, medicine;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    amount = document.getElementById("amount").value;
                    currentUser.balance += Number(amount);
                    return [4 /*yield*/, updateUser(currentUser.userID, currentUser)];
                case 1:
                    _a.sent();
                    medicine = document.getElementById("medicine");
                    medicine.style.display = "block";
                    medicine.innerHTML = "<h2>Amount ".concat(amount, " added to your account.</h2><h2>Current balance is ").concat(currentUser.balance, "</h2>");
                    return [2 /*return*/];
            }
        });
    });
}
function ShowBalance() {
    var topUp = document.getElementById("topUp");
    topUp.style.display = "none";
    var medicine = document.getElementById("medicine");
    medicine.style.display = "block";
    medicine.innerHTML = "<h2>Current balance is ".concat(currentUser.balance, "</h2>");
}
function Cancel() {
    return __awaiter(this, void 0, void 0, function () {
        var topUp, OrderArray, medicine;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    topUp = document.getElementById("topUp");
                    topUp.style.display = "none";
                    return [4 /*yield*/, fetchOrder()];
                case 1:
                    OrderArray = _a.sent();
                    medicine = document.getElementById("medicine");
                    medicine.style.display = "block";
                    medicine.innerHTML = "<h2>Order History</h2>";
                    OrderArray.forEach(function (element) {
                        medicine.innerHTML += "|   Medicine Name: ".concat(element.medicineName, "   |   Quantity: ").concat(element.count, "   |   Total: ").concat(element.totalAmount, "   |   <button onclick=\"CancelOrder('").concat(element.orderID, "','").concat(element.count, "')\">Cancel</button>  |<br><br>");
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function CancelOrder(orderID, quantity) {
    return __awaiter(this, void 0, void 0, function () {
        var medicine, OrderArray, MedicineArray, _loop_1, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    medicine = document.getElementById("medicine");
                    return [4 /*yield*/, fetchOrder()];
                case 1:
                    OrderArray = _a.sent();
                    return [4 /*yield*/, fetchMedicine()];
                case 2:
                    MedicineArray = _a.sent();
                    _loop_1 = function (i) {
                        if (OrderArray[i].orderID == orderID) {
                            currentUser.balance += OrderArray[i].totalAmount;
                            MedicineArray.forEach(function (item) {
                                if (OrderArray[i].medicineID == item.medicineID) {
                                    item.quantity += Number(quantity);
                                }
                            });
                            OrderArray.splice(i, 1);
                            medicine.innerHTML = "<h2>Order cancelled!</h2>";
                        }
                    };
                    for (i = 0; i < OrderArray.length; i++) {
                        _loop_1(i);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
var AddItem = function () { return __awaiter(_this, void 0, void 0, function () {
    var newMedicine, price, quantity, MedicineArray, exist_1, name_1, id_1, quant_1, editMedicine, medicine;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newMedicine = document.getElementById("newMedicine");
                price = document.getElementById("price");
                quantity = document.getElementById("quantity");
                return [4 /*yield*/, fetchMedicine()];
            case 1:
                MedicineArray = _a.sent();
                if (newMedicine.value != "" && price.value != "" && quantity.value != "") {
                    exist_1 = false;
                    MedicineArray.forEach(function (item) {
                        if (item.medicineName.toLowerCase() == newMedicine.value.toLowerCase()) {
                            alert("medicine exist");
                            name_1 = item.medicineName;
                            id_1 = item.medicineID;
                            quant_1 = item.quantity + Number(quantity.value);
                            exist_1 = true;
                        }
                    });
                    if (exist_1) {
                        editMedicine = {
                            medicineID: ++medicineIDAuto,
                            medicineName: name_1,
                            price: parseInt(price.value),
                            quantity: quant_1
                        };
                        updateMedicine(id_1, editMedicine);
                    }
                    if (!exist_1) {
                        medicine = {
                            medicineID: ++medicineIDAuto,
                            medicineName: newMedicine.value,
                            price: parseInt(price.value),
                            quantity: Number(quantity.value)
                        };
                        //MedicineArray.push(new Medicine(newMedicine.value, parseInt(price.value), parseInt(quantity.value)));
                        addMedicine(medicine);
                    }
                }
                else
                    alert("Enter the inputs");
                RenderTable();
                newMedicine.value = "";
                price.value = "";
                quantity.value = "";
                return [2 /*return*/];
        }
    });
}); };
function RenderTable() {
    return __awaiter(this, void 0, void 0, function () {
        var tableBody, dataTable, MedicineArray;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tableBody = document.querySelector("#dataTable tbody");
                    dataTable = document.getElementById("dataTable");
                    dataTable.style.display = "block";
                    tableBody.innerHTML = "";
                    return [4 /*yield*/, fetchMedicine()];
                case 1:
                    MedicineArray = _a.sent();
                    MedicineArray.forEach(function (item) {
                        var row = document.createElement("tr");
                        row.innerHTML = "<td>".concat(item.medicineName, "</td>\n                         <td>").concat(item.price, "</td>\n                         <td>").concat(item.quantity, "</td>\n                         <td><button onclick=\"Delete()\">Delete</button>");
                        tableBody.appendChild(row);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
;
function addUser(user) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('http://localhost:5238/api/User', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(user)
                    })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to add user');
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function addMedicine(medicine) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('http://localhost:5238/api/Medicine', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(medicine)
                    })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to add medicine');
                    }
                    RenderTable();
                    return [2 /*return*/];
            }
        });
    });
}
function addOrder(order) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('http://localhost:5238/api/Order', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(order)
                    })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to add order');
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function updateMedicine(id, medicine) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:5238/api/Medicine/".concat(id), {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(medicine)
                    })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to update medicine');
                    }
                    RenderTable();
                    return [2 /*return*/];
            }
        });
    });
}
function updateUser(id, user) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:5238/api/User/".concat(id), {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(user)
                    })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to update medicine');
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function DeleteMedicine(id, medicine) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('http://localhost:5238/api/Medicine', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application.json'
                        },
                        body: JSON.stringify(medicine)
                    })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to delete medicine');
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function fetchMedicine() {
    return __awaiter(this, void 0, void 0, function () {
        var apiUrl, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiUrl = 'http://localhost:5238/api/Medicine';
                    return [4 /*yield*/, fetch(apiUrl)];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to fetch medicine');
                    }
                    return [4 /*yield*/, response.json()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function fetchUser() {
    return __awaiter(this, void 0, void 0, function () {
        var apiUrl, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiUrl = 'http://localhost:5238/api/User';
                    return [4 /*yield*/, fetch(apiUrl)];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to fetch user');
                    }
                    return [4 /*yield*/, response.json()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function fetchOrder() {
    return __awaiter(this, void 0, void 0, function () {
        var apiUrl, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiUrl = 'http://localhost:5238/api/Order';
                    return [4 /*yield*/, fetch(apiUrl)];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to fetch order');
                    }
                    return [4 /*yield*/, response.json()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
