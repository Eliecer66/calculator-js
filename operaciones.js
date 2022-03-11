/*
const number_1 = document.querySelector("#button_1").value;
const number_2 = document.querySelector("#button_2").value;
const number_3 = document.querySelector("#button_3").value;
const number_4 = document.querySelector("#button_4").value;
const number_5 = document.querySelector("#button_5").value;
const number_6 = document.querySelector("#button_6").value;
const number_7 = document.querySelector("#button_7").value;
const number_8 = document.querySelector("#button_8").value;
const number_9 = document.querySelector("#button_9").value;
const number_0 = document.querySelector("#button_0").value;
const add = document.querySelector("#button_add").value;
const subtract = document.querySelector("#button_subtract").value;

number_1.addEventListener("click", function(){
    first_value = number_1;
})
number_2.addEventListener("click", function(){
    first_value = number_2;
})
*/
function set_term() {
    while (term != '+' || term != '-') {

    }
}

function calculation() {
    let firstTerm = document.querySelector("#button_1").value;
    let secondTerm = document.querySelector("#button_2").value;
    let operator = document.querySelector("#button_add").value;
    let one = parseInt(firstTerm, 10);
    let two = parseInt(secondTerm, 10);
    let final = 0;

    if (operator === '+') {
        final = (one + two);
        //document.querySelector(".display").textContent = final;
        let display = document.querySelector(".display");
        display.innerHTML = `${final}`;
    } else if (operator === '-') {
        final = (one - two);
        document.querySelector(".display").textContent = final;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#button_0').onclick = calculation;
});
