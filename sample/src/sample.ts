let message : string = "Hello World";

let userid : string | number;  //union

userid = "uid"+12;

let arr : number[] = [1,2,3];   //arraay

let tuple : [string,number,boolean] = ["Benz",2020,true];  //tuple
let tupleArray : [string, number, boolean][] = [["KTM",2021,true], ["Honda",2016,false], ["Hero",2019,true]];   //tuple array

enum nums {
    one = "car", 
    two = "bike", 
    three = "truck"}   //enum

console.log(userid);
console.log(tupleArray);
console.log(nums.two);

//object
type obj = {ID : number, Name : string, Passed : boolean};

let detail : obj = {ID : 123, Name : "Sally", Passed : true};

//type assertion
let num : any = 5;
//let n = num as number;
let n = <number>num;
console.log(n);

//functions
function Display(a : number, b : number) : number
{
    return a+b;
}
console.log(Display(5,3));

//Interface - declaring function inside interface
interface MatFunc {
    (x: number, y: number) : number;
}

const prod : MatFunc = (x : number, y : number) => x*y;

console.log(prod(2,5));

class Player
{
    name : string;
    jerseyNo : number;

    constructor(name : string, no : number)
    {
        this.name = name;
        this.jerseyNo = no;
    }

    Show()
    {
        return `His name is ${this.name}. Number ${this.jerseyNo}`
    }
}

let player = new Player("Dhoni",7);

console.log(player.Show());