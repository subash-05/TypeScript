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
var cardNumberAuto = undefined;
var travelIDAuto = undefined;
var ticketIDAuto = undefined;
var TicketDetails = /** @class */ (function () {
    function TicketDetails() {
    }
    return TicketDetails;
}());
//functions
var RegisterPage = function () {
    var registerPage = document.getElementById("registerPage");
    var loginPage = document.getElementById("loginPage");
    registerPage.style.display = "block";
    loginPage.style.display = "none";
};
var LoginPage = function () {
    var userTable = document.getElementById("userTable");
    userTable.style.display = "none";
    var registerPage = document.getElementById("registerPage");
    var loginPage = document.getElementById("loginPage");
    loginPage.style.display = "block";
    registerPage.style.display = "none";
};
var Register = function () { return __awaiter(_this, void 0, void 0, function () {
    var nameInput, phoneInput, balanceInput, photoInput, file, base64String, reader, userList;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                nameInput = document.getElementById("nameInput");
                phoneInput = document.getElementById("phoneInput");
                balanceInput = document.getElementById("balanceInput");
                photoInput = document.getElementById("fileInput");
                file = (_a = photoInput.files) === null || _a === void 0 ? void 0 : _a[0];
                base64String = "";
                if (file) {
                    reader = new FileReader();
                    reader.onload = function (event) {
                        var _a;
                        base64String = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result; //contains the base64 encoded string
                        var user = {
                            cardNumber: cardNumberAuto,
                            userName: nameInput.value,
                            phone: phoneInput.value,
                            balance: Number(balanceInput.value),
                            //email : emailInput.value,
                            //password : passInput.value,
                            photo: [base64String]
                        };
                        addUserDetails(user);
                    };
                    reader.readAsDataURL(file);
                }
                return [4 /*yield*/, fetchUser()];
            case 1:
                userList = _b.sent();
                userList.forEach(function (user) {
                    if (nameInput.value.toLowerCase() == user.userName.toLowerCase()) {
                        alert("Registration success. Your card number is ".concat(user.cardNumber));
                    }
                });
                UserTable();
                nameInput.value = "";
                phoneInput.value = "";
                balanceInput.value = "";
                return [2 /*return*/];
        }
    });
}); };
var CheckUser = function () { return __awaiter(_this, void 0, void 0, function () {
    var userTable, userInput, mainPage, loginPage, messageBox, flag, userList;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userTable = document.getElementById("userTable");
                userTable.style.display = "none";
                userInput = document.getElementById("userInput");
                mainPage = document.getElementById("mainPage");
                loginPage = document.getElementById("loginPage");
                messageBox = document.getElementById("message");
                messageBox.style.display = "block";
                flag = false;
                return [4 /*yield*/, fetchUser()];
            case 1:
                userList = _a.sent();
                userList.forEach(function (user) {
                    if (user.cardNumber == Number(userInput.value)) {
                        flag = true;
                        var menu = document.getElementById("menu");
                        mainPage.style.display = "none";
                        loginPage.style.display = "none";
                        menu.style.display = "flex";
                        currentUser = user;
                        console.log(user);
                    }
                });
                messageBox.innerHTML = "<h3>Welcome ".concat(currentUser.userName, "!</h3>");
                if (!flag) {
                    alert("User not available!");
                }
                return [2 /*return*/];
        }
    });
}); };
function BalanceCheck() {
    var userTable = document.getElementById("userTable");
    userTable.style.display = "none";
    var messageBox = document.getElementById("message");
    messageBox.style.display = "block";
    var travelTable = document.getElementById("travelTable");
    var ticketTable = document.getElementById("ticketTable");
    ticketTable.style.display = "none";
    travelTable.style.display = "none";
    messageBox.innerText = "Current Balance: ".concat(currentUser.balance);
}
function Recharge() {
    var travelTable = document.getElementById("travelTable");
    var ticketTable = document.getElementById("ticketTable");
    ticketTable.style.display = "none";
    travelTable.style.display = "none";
    var messageBox = document.getElementById("message");
    messageBox.style.display = "block";
    messageBox.innerText = "";
    messageBox.innerHTML = "<input id='amountInput' type ='text' placeholder='enter the amount'><button onclick='RechargeBalance()'>Recharge</button>";
}
function RechargeBalance() {
    return __awaiter(this, void 0, void 0, function () {
        var userTable, userList, messageBox, amountInput;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userTable = document.getElementById("userTable");
                    userTable.style.display = "none";
                    return [4 /*yield*/, fetchUser()];
                case 1:
                    userList = _a.sent();
                    messageBox = document.getElementById("message");
                    amountInput = document.getElementById("amountInput");
                    userList.forEach(function (user) {
                        if (user.cardNumber == currentUser.cardNumber) {
                            currentUser.balance += Number(amountInput.value);
                        }
                    });
                    messageBox.innerHTML += "Amount ".concat(amountInput, " is added to the account");
                    updateUserDetails(currentUser.cardNumber, currentUser);
                    return [2 /*return*/];
            }
        });
    });
}
function ShowTravelHistory() {
    return __awaiter(this, void 0, void 0, function () {
        var travelList, userTable, travelTable, ticketTable, tableBody, messageBox;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchTravel()];
                case 1:
                    travelList = _a.sent();
                    userTable = document.getElementById("userTable");
                    userTable.style.display = "none";
                    travelTable = document.getElementById("travelTable");
                    ticketTable = document.getElementById("ticketTable");
                    tableBody = document.getElementById("tableBody");
                    messageBox = document.getElementById("message");
                    messageBox.style.display = "none";
                    ticketTable.style.display = "none";
                    travelTable.style.display = "block";
                    tableBody.innerHTML = "";
                    travelList.forEach(function (item) {
                        if (item.cardNumber == currentUser.cardNumber) {
                            var row = document.createElement("tr");
                            row.innerHTML = "<td>".concat(item.travelID, "</td>\n                         <td>").concat(item.cardNumber, "</td>\n                         <td>").concat(item.fromLocation, "</td>\n                         <td>").concat(item.toLocation, "</td>\n                         <td>").concat(item.date.split("T")[0].split("-").reverse().join("/"), "</td>\n                         <td>").concat(item.travelCost, "</td>");
                            tableBody.appendChild(row);
                        }
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function UserTable() {
    return __awaiter(this, void 0, void 0, function () {
        var userList, userTable, userTableBody;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchUser()];
                case 1:
                    userList = _a.sent();
                    userTable = document.getElementById("userTable");
                    userTable.style.display = "block";
                    userTableBody = document.getElementById("userTableBody");
                    userTableBody.innerHTML = "";
                    userList.forEach(function (user) {
                        var row = document.createElement("tr");
                        row.innerHTML = "<td>".concat(user.cardNumber, "</td>\n                         <td>").concat(user.userName, "</td>\n                         <td>").concat(user.phone, "</td>\n                         <td>").concat(user.balance, "</td>\n                         <td><img id='image' src='").concat(user.photo, "'></td>");
                        userTableBody.append(row);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function Display() {
    UserTable();
}
function Travel() {
    return __awaiter(this, void 0, void 0, function () {
        var idInput, ticketList, valid;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idInput = document.getElementById("idInput");
                    return [4 /*yield*/, fetchTicket()];
                case 1:
                    ticketList = _a.sent();
                    valid = false;
                    ticketList.forEach(function (ticket) {
                        if (ticket.ticketID == Number(idInput.value)) {
                            valid = true;
                            if (currentUser.balance >= ticket.ticketPrice) {
                                currentUser.balance -= ticket.ticketPrice;
                                var travel = {
                                    travelID: travelIDAuto,
                                    cardNumber: currentUser.cardNumber,
                                    fromLocation: ticket.fromLocation,
                                    toLocation: ticket.toLocation,
                                    date: new Date(),
                                    travelCost: ticket.ticketPrice
                                };
                                addTravelDetails(travel);
                                alert("Booked");
                            }
                            else {
                                alert("Insufficient balance");
                            }
                        }
                    });
                    if (!valid) {
                        alert("Enter valid id");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function ShowTicketDetails() {
    return __awaiter(this, void 0, void 0, function () {
        var messageBox, ticketList, travelTable, ticketTable, ticketBody;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    messageBox = document.getElementById("message");
                    messageBox.style.display = "block";
                    messageBox.innerHTML = "<input type='text' id='idInput' placeholder='enter the travelid'><button onclick='Travel()'>Book</button>";
                    return [4 /*yield*/, fetchTicket()];
                case 1:
                    ticketList = _a.sent();
                    travelTable = document.getElementById("travelTable");
                    travelTable.style.display = "none";
                    ticketTable = document.getElementById("ticketTable");
                    ticketBody = document.getElementById("ticketBody");
                    ticketTable.style.display = "block";
                    ticketBody.innerHTML = "";
                    ticketList.forEach(function (ticket) {
                        var row = document.createElement("tr");
                        row.innerHTML = "<td>".concat(ticket.ticketID, "</td>\n                                <td>").concat(ticket.fromLocation, "</td>\n                                <td>").concat(ticket.toLocation, "</td>\n                                <td>").concat(ticket.ticketPrice, "</td>");
                        ticketBody.appendChild(row);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function Exit() {
    var travelTable = document.getElementById("travelTable");
    travelTable.style.display = "none";
    var ticketTable = document.getElementById("ticketTable");
    ticketTable.style.display = "none";
    var messageBox = document.getElementById("message");
    messageBox.style.display = "none";
    var menu = document.getElementById("menu");
    menu.style.display = "none";
    var mainPage = document.getElementById("mainPage");
    mainPage.style.display = "block";
}
function downloadCSVFile() {
    return __awaiter(this, void 0, void 0, function () {
        var datalist, output, i, CSVFile, temp_link, url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchTicket()];
                case 1:
                    datalist = _a.sent();
                    output = "";
                    output += "TicketID,FromLocation,ToLocation,TicketPrice\n";
                    for (i = 0; i < datalist.length; i++) {
                        output += datalist[i].ticketID + "," + datalist[i].fromLocation + "," + datalist[i].toLocation + "," + datalist[i].ticketPrice + "\n";
                    }
                    CSVFile = new Blob([output], { type: "text/csv" });
                    temp_link = document.createElement('a');
                    // Download csv file
                    temp_link.download = "TicketPriceDetails.csv";
                    url = window.URL.createObjectURL(CSVFile);
                    temp_link.href = url;
                    // This link should not be displayed
                    temp_link.style.display = "none";
                    document.body.appendChild(temp_link);
                    // Automatically click the link to trigger download 
                    temp_link.click();
                    document.body.removeChild(temp_link);
                    return [2 /*return*/];
            }
        });
    });
}
//API functions
var fetchTravel = function () { return __awaiter(_this, void 0, void 0, function () {
    var apiUrl, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                apiUrl = 'http://localhost:5272/api/TravelDetails';
                return [4 /*yield*/, fetch(apiUrl)];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error('Failed to fetch travel detail');
                }
                return [4 /*yield*/, response.json()];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var fetchUser = function () { return __awaiter(_this, void 0, void 0, function () {
    var apiUrl, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                apiUrl = 'http://localhost:5272/api/UserDetails';
                return [4 /*yield*/, fetch(apiUrl)];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error('Failed to fetch user detail');
                }
                return [4 /*yield*/, response.json()];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
function fetchTicket() {
    return __awaiter(this, void 0, void 0, function () {
        var apiUrl, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiUrl = 'http://localhost:5272/api/TicketDetails';
                    return [4 /*yield*/, fetch(apiUrl)];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to fetch ticket detail');
                    }
                    return [4 /*yield*/, response.json()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function addTravelDetails(travel) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('http://localhost:5272/api/TravelDetails', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(travel)
                    })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to add travel detail');
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function addUserDetails(user) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('http://localhost:5272/api/UserDetails', {
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
function updateUserDetails(id, user) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:5272/api/UserDetails/".concat(id), {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(user)
                    })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Failed to update user");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function updateTravelDetails(id, travel) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:5272/api/TravelDetails/".concat(id), {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(travel)
                    })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Failed to update travel detail");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
