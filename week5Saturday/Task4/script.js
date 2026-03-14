let btn1 = document.getElementById("btn1");
let inc2 = document.getElementById("inc2");
let countTwo = 0;

btn1.addEventListener("click",function(){
    countTwo += 2;
    inc2.textContent = countTwo;
})

let btn2 = document.getElementById("btn2");
let inc5 = document.getElementById("inc5");
let countFive = 0;

btn2.addEventListener("click",function(){
    countFive += 5;
    inc5.textContent = countFive;
})


let btn3 = document.getElementById("btn3");
let inc10 = document.getElementById("inc10");
let countTen = 0;

btn3.addEventListener("click",function(){
    countTen += 10;
    inc10.textContent = countTen;
})

let btn4 = document.getElementById("btn4");
let dec5 = document.getElementById("dec5");
let subFive = 0;

btn4.addEventListener("click", function() {
    subFive -= 5;
    dec5.textContent = subFive;
});