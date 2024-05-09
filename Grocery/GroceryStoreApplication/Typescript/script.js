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
var currentUser;
var userIDAuto = undefined;
var productIDAuto = undefined;
var orderIDAuto = undefined;
var defaultBalance = 50;
//functions
function LoginPage() {
    var loginPage = document.getElementById("loginPage");
    loginPage.style.display = "block";
    var registerPage = document.getElementById("registerPage");
    registerPage.style.display = "none";
}
function RegisterPage() {
    var registerPage = document.getElementById("registerPage");
    registerPage.style.display = "block";
    var loginPage = document.getElementById("loginPage");
    loginPage.style.display = "none";
}
function MenuPage() {
    var mainPage = document.getElementById("mainPage");
    var menuPage = document.getElementById("menuPage");
    var messageBox = document.getElementById("messageBox");
    mainPage.style.display = "none";
    menuPage.style.display = "block";
    messageBox.style.display = "block";
    messageBox.innerHTML = "<h3>Hello User</h3>";
}
function Login() {
    return __awaiter(this, void 0, void 0, function () {
        var mailValue, passValue, messageBox, valid, userList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mailValue = document.getElementById("mailValue");
                    passValue = document.getElementById("passValue");
                    messageBox = document.getElementById("messageBox");
                    valid = false;
                    return [4 /*yield*/, fetchUser()];
                case 1:
                    userList = _a.sent();
                    userList.forEach(function (user) {
                        if (user.emailID == mailValue.value) {
                            valid = true;
                            if (user.password == passValue.value) {
                                MenuPage();
                                messageBox.innerHTML = "<h2>Hello ".concat(currentUser.userName, "</h2>");
                            }
                            else
                                alert("Wrong password");
                        }
                    });
                    if (!valid) {
                        alert("Enter valid email!");
                    }
                    mailValue.value = "";
                    passValue.value = "";
                    return [2 /*return*/];
            }
        });
    });
}
function MainPage() {
    var mainPage = document.getElementById("mainPage");
    var menuPage = document.getElementById("menuPage");
    var messageBox = document.getElementById("messageBox");
    var registerPage = document.getElementById("registerPage");
    var loginPage = document.getElementById("loginPage");
    loginPage.style.display = "block";
    mainPage.style.display = "block";
    menuPage.style.display = "none";
    messageBox.style.display = "none";
    registerPage.style.display = "none";
}
var form = document.getElementById("form");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    var nameInput = document.getElementById("nameInput");
    var mailInput = document.getElementById("mailInput");
    var passInput = document.getElementById("passInput");
    var phoneInput = document.getElementById("phoneInput");
    var addressInput = document.getElementById("addressInput");
    var user = {
        userID: userIDAuto,
        userName: nameInput.value,
        emailID: mailInput.value,
        password: passInput.value,
        balance: defaultBalance,
        phone: phoneInput.value,
        address: addressInput.value
    };
    addUser(user);
    MainPage();
});
//API functions
function fetchUser() {
    return __awaiter(this, void 0, void 0, function () {
        var apiUrl, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiUrl = 'http://localhost:5024/api/UserDetails';
                    return [4 /*yield*/, fetch(apiUrl)];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('cannot fetch user detail');
                    }
                    return [4 /*yield*/, response.json()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function addUser(user) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('http://localhost:5024/api/UserDetails', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(user)
                    })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('cannot add product');
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function addProduct(product) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('http://localhost:5024/api/ProductDetails', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(product)
                    })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('cannot add product');
                    }
                    return [2 /*return*/];
            }
        });
    });
}
