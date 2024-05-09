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
var userIDAuto = undefined;
var bookIDAuto = undefined;
var borrowIDAuto = undefined;
//functions
var RegisterPage = function () {
    var registerPage = document.getElementById("registerPage");
    var loginPage = document.getElementById("loginPage");
    registerPage.style.display = "block";
    loginPage.style.display = "none";
};
var LoginPage = function () {
    var registerPage = document.getElementById("registerPage");
    var loginPage = document.getElementById("loginPage");
    loginPage.style.display = "block";
    registerPage.style.display = "none";
};
var Register = function () { return __awaiter(_this, void 0, void 0, function () {
    var nameInput, genderInput, deptInput, phoneInput, mailInput, balanceInput, passInput, userList, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                nameInput = document.getElementById("nameInput");
                genderInput = document.getElementById("genderInput");
                deptInput = document.getElementById("deptInput");
                phoneInput = document.getElementById("phoneInput");
                mailInput = document.getElementById("mailInput");
                balanceInput = document.getElementById("balanceInput");
                passInput = document.getElementById("passInput");
                return [4 /*yield*/, fetchUser()];
            case 1:
                userList = _a.sent();
                user = {
                    userID: userIDAuto,
                    userName: nameInput.value,
                    gender: genderInput.value,
                    department: deptInput.value,
                    phone: phoneInput.value,
                    mailID: mailInput.value,
                    balance: Number(balanceInput.value),
                    password: passInput.value
                };
                addUserDetails(user);
                userList.forEach(function (user) {
                    if (nameInput.value.toLowerCase() == user.userName.toLowerCase()) {
                        alert("Registration success. Your card number is ".concat(user.userID));
                    }
                });
                nameInput.value = "";
                phoneInput.value = "";
                balanceInput.value = "";
                return [2 /*return*/];
        }
    });
}); };
var CheckUser = function () { return __awaiter(_this, void 0, void 0, function () {
    var mailInput, passInput, mainPage, loginPage, messageBox, valid, userList;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                mailInput = document.getElementById("email");
                passInput = document.getElementById("pass");
                mainPage = document.getElementById("mainPage");
                loginPage = document.getElementById("loginPage");
                messageBox = document.getElementById("message");
                messageBox.style.display = "block";
                valid = false;
                return [4 /*yield*/, fetchUser()];
            case 1:
                userList = _a.sent();
                userList.forEach(function (user) {
                    if (user.mailID == mailInput.value) {
                        valid = true;
                        var menu = document.getElementById("menu");
                        mainPage.style.display = "none";
                        loginPage.style.display = "none";
                        menu.style.display = "flex";
                        currentUser = user;
                        /*
                        if(user.password == passInput.value)
                        {
                            
                        }
                        else alert("Wrong password");
                        */
                    }
                });
                if (!valid) {
                    alert("Invalid email");
                }
                return [2 /*return*/];
        }
    });
}); };
function RenderBookDetails() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            document.getElementById("showCount").style.display = "none";
            return [2 /*return*/];
        });
    });
}
function BorrowBook() {
    return __awaiter(this, void 0, void 0, function () {
        var messageBox, borrowBox, bookInput, avail, bookList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    messageBox = document.getElementById("message");
                    messageBox.innerText = "";
                    borrowBox = document.getElementById("borrowBook");
                    borrowBox.style.display = "block";
                    bookInput = document.getElementById("bookInput");
                    avail = false;
                    return [4 /*yield*/, fetchBook()];
                case 1:
                    bookList = _a.sent();
                    bookList.forEach(function (book) {
                        if (book.bookID == Number(bookInput.value)) {
                            avail = true;
                        }
                    });
                    if (!avail) {
                        alert("Invalid Book ID, Please enter valid ID");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function ShowBorrowHistory() {
    return __awaiter(this, void 0, void 0, function () {
        var borrowList, dataTable, tableBody, messageBox;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchBorrow()];
                case 1:
                    borrowList = _a.sent();
                    dataTable = document.getElementById("dataTable");
                    tableBody = document.getElementById("tableBody");
                    messageBox = document.getElementById("message");
                    messageBox.style.display = "none";
                    dataTable.style.display = "block";
                    tableBody.innerHTML = "";
                    borrowList.forEach(function (item) {
                        var row = document.createElement("tr");
                        row.innerHTML = "<td>".concat(item.borrowID, "</td>\n                             <td>").concat(item.bookID, "</td>\n                             <td>").concat(item.userID, "</td>\n                             <td>").concat(item.borrowedDate.split("T")[0].split("-").reverse().join("/"), "</td>\n                             <td>").concat(item.count, "</td>\n                             <td>").concat(item.status, "</td>\n                             <td>").concat(item.paidFineAmount, "</td>");
                        tableBody.appendChild(row);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
//API functions
function fetchUser() {
    return __awaiter(this, void 0, void 0, function () {
        var apiUrl, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiUrl = 'http://localhost:5052/api/UserDetails';
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
    });
}
function fetchBook() {
    return __awaiter(this, void 0, void 0, function () {
        var apiUrl, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiUrl = 'http://localhost:5052/api/BookDetails';
                    return [4 /*yield*/, fetch(apiUrl)];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to fetch book detail');
                    }
                    return [4 /*yield*/, response.json()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function fetchBorrow() {
    return __awaiter(this, void 0, void 0, function () {
        var apiUrl, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiUrl = 'http://localhost:5052/api/BorrowDetails';
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
    });
}
function addUserDetails(user) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('http://localhost:5052/api/UserDetails', {
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
function addBookDetails(book) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('http://localhost:5052/api/BookDetails', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(book)
                    })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to add book');
                    }
                    return [2 /*return*/];
            }
        });
    });
}
