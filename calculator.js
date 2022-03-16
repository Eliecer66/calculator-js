const PLUS = '+'; 
const SUBTRACT = '-';
const MULTIPLY = '*';
const DIVIDE = '/';
const DELETE = "⌂";
const EQUAL = '=';
const DISPLAY_ZERO = `0`;
const BASE = 10;
const CLEAR =  'C'
const NUMBERS = document.querySelectorAll(".numbers");
const ACTIONS = document.querySelectorAll(".actions");
const OPERATORS = document.querySelectorAll(".operators");
/* How the calculator works.
 * 1. When a number is joined, it saved into a string called term.
 * 2. Only we can delete a number if is in the join face. 
 * 3. The string shows how is going older terms. 
 * 4. The operators are limited by the current number that the user wants to join 
 */
let display = document.querySelector(".counts");
let livesResult = document.querySelector(".lives-result");
const calculator = {
  term: "",
  current: "",
  operator: "",
  nextOperator: "",
  total: 0,
}; 
/*
 *PRE-CONDITIONS: It needed two terms.
 *POST-CONDITIONS:This function return the final result. 
 */
function calculation(firstTerm, secondTerm) {
  let one = parseInt(firstTerm, BASE);
  let two = parseInt(secondTerm, BASE);
  let final = 0;
  if (calculator.operator === PLUS) {
    final = one + two;
  } 
  if (calculator.operator === SUBTRACT) {
    if (one === 0) {
      final = two;   
    }else {
      final = one - two;
    }
  }
  if (calculator.operator === MULTIPLY) {
    if (one === 0) {
      one = 1;
    }    
    final = one * two;
  }
  if (calculator.operator === DIVIDE) {
    if (one === 0) {
      final = two; 
    }else {
      final = one / two;
    }
  }
  return final;
}
/*
 *PRE-CONDITIONS: This function get information from a event listener.
 *POST-CONDITIONS: It Saves the numbers when are clicked.
 */
const saveNumber = function(event) {  
  let character = event.target.value;
  calculator.term += character;
  calculator.current += character;
  livesResult.innerHTML = calculator.current;
}
NUMBERS.forEach(function(input) {
  input.addEventListener("click", saveNumber)
});
/*
 *PRE-CONDITIONS: This function gets information from global variables filled previously.
 *POST-CONDITIONS: It Calculates a number.
 */
const operate = function (event) {
  if (calculator.operator === "") {
    calculator.operator = event.target.value;
    calculator.nextOperator = calculator.operator;
    calculator.term += calculator.operator;
  }else {
    calculator.nextOperator = event.target.value;
    calculator.term += calculator.nextOperator;
  }
  calculator.total = calculation(calculator.total, calculator.current);
  calculator.current = "";
  calculator.operator = calculator.nextOperator;
  display.innerHTML = calculator.term;
  livesResult.innerHTML = calculator.total;
};
/*
 *PRE-CONDITIONS: This function gets information from global variables filled previously.
 *POST-CONDITIONS: It does three actions when it activates by event listener. 
 */
const doActions = function (event) {
  let character = event.target.value; 
  if(character === EQUAL) {
    calculator.total = calculation(calculator.total, calculator.current);
    livesResult.innerHTML = calculator.total;
    display.innerHTML = "";   
  }
  if (character === CLEAR) {
    calculator.current = "";
    calculator.operator = "";
    calculator.nextOperator = "";
    calculator.term = "";
    calculator.total = 0;
    display.innerHTML = 0;
    livesResult.innerHTML = 0;
  }
  if (character === DELETE) {
    let firstTerm = calculator.term; 
    let number = calculator.current;
    let box = number.slice(0,-1); 
    let boxOne = firstTerm.slice(0,-1);
    calculator.term = boxOne; 
    calculator.current = box;
    livesResult.innerHTML = calculator.current;
  }
};
OPERATORS.forEach(function(operators) {
  operators.addEventListener("click", operate)
});
ACTIONS.forEach(function(actions) {
  actions.addEventListener("click", doActions)
});