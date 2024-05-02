"use strict";
let message = "Hello World";
let userid; //union
userid = "uid" + 12;
let arr = [1, 2, 3]; //arraay
let tuple = ["Benz", 2020, true]; //tuple
let tupleArray = [["KTM", 2021, true], ["Honda", 2016, false], ["Hero", 2019, true]]; //tuple array
var nums;
(function (nums) {
    nums["one"] = "car";
    nums["two"] = "bike";
    nums["three"] = "truck";
})(nums || (nums = {})); //enum
console.log(userid);
console.log(tupleArray);
console.log(nums.two);
let detail = { ID: 123, Name: "Sally", Passed: true };
//type assertion
let num = 5;
//let n = num as number;
let n = num;
console.log(n);
//functions
function Display(a, b) {
    return a + b;
}
console.log(Display(5, 3));
const prod = (x, y) => x * y;
console.log(prod(2, 5));
class Player {
    constructor(name, no) {
        this.name = name;
        this.jerseyNo = no;
    }
    Show() {
        return `His name is ${this.name}. Number ${this.jerseyNo}`;
    }
}
let player = new Player("Dhoni", 7);
console.log(player.Show());
