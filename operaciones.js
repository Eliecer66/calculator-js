function set_term() {
  while (term != "+" || term != "-") {}
}

function calculation() {
  let firstTerm = document.querySelector("#button_1").value;
  let secondTerm = document.querySelector("#button_2").value;
  let operator = document.querySelector("#button_add").value;
  let one = parseInt(firstTerm, 10);
  let two = parseInt(secondTerm, 10);
  let final = 0;

  if (operator === "+") {
    final = one + two;
    //document.querySelector(".display").textContent = final;
    let display = document.querySelector(".display");
    display.innerHTML = `${final}`;
  } else if (operator === "-") {
    final = one - two;
    document.querySelector(".display").textContent = final;
  }
}

const inputs = document.querySelectorAll("form input");

const handleClick = function (event) {
  console.log(event.target.value);
};

inputs.forEach(function (input) {
  input.addEventListener("click", handleClick);
});

// function declaration
function name() {}

// anonymous function
// function() {}

// function assignment
var functionAA = function () {};

// inputs.addEventListener("click", function() {
//     // code
// });

// if (bloque) {
//     const myVar = 1;
// } else {
//     // code
// }

// for (let i = 0; i<algo; i++) {
//     // code
// }

// function miFunc() {
//     const myVar = 1;
//     function innerFunc() {
//         myVar
//     }

//     return innerFunc;
// }

// const myObject = {
//     name: 'jorge',
//     myMethod: function() { console.log('buu')}
// };
