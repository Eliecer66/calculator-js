const PLUS = '+'; 
const SUBTRACT = '-';
const MULTIPLY = '*';
const DIVIDE = '/';
const DELETE = 'x';
const EQUAL = 'Enter';
const DISPLAY_ZERO = '0';
const BASE = 10;
const CLEAR =  'c'
const numbers = document.querySelectorAll(".numbers");
const actions = document.querySelectorAll(".actions");
const operators = document.querySelectorAll(".operators");
/* Implement keyboard.
 * 1. Add the event listener to get the input.
 * 2. What level I can introduce the event listener?
 * 3. 
 * 4. 
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
 *NOTE: In the subtract's case is necessary the "if" because otherwise, the subtract can't be possible.  
 */
function calculation(total, current) {
  const one = parseInt(total, BASE);
  const two = parseInt(current, BASE);
  let final = 0;
  if (!total) {
    return current;
  }
  if (calculator.operator === PLUS) {
    final = one + two;
  } 
  if (calculator.operator === SUBTRACT) {
    final = one - two;
  }
  if (calculator.operator === MULTIPLY) {
    final = one * two;
  }
  if (calculator.operator === DIVIDE) {
    if (two === 0) {
      final = "FATAL ERROR";
    } else {
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
  const character = event.target.value || event.key;
  let number = character === "0" || character === "1" || character === "2" || character === "3" || character === "4" || character === "5" || character === "6" || character === "7" || character === "8"|| character === "9";
  if (number) {
    calculator.term += character;
    calculator.current += character;
    livesResult.innerHTML = calculator.current;
  }
}
/*
 *PRE-CONDITIONS: This function receive two variables that are going to be used to change two global variables.
 *POST-CONDITIONS: Change the state of the display.
 */
function showDisplay(stringOperations, total) {
  display.innerHTML = stringOperations;
  livesResult.innerHTML = total;
}
/*
 *PRE-CONDITIONS: Receive one variable.
 *POST-CONDITIONS: Change the state of two variables.
 */
function reassignedVariables(operator) {
  calculator.current = "";
  calculator.operator = operator;
}
/*
 *PRE-CONDITIONS: This function gets information from global variables filled previously.
 *POST-CONDITIONS: It Calculates a number.
 */
const operate = function (event) {
  const value = event.target.value || event.key;
  let operator = value === PLUS || value === SUBTRACT || value === MULTIPLY || value === DIVIDE;
  if (operator) {
    if (!calculator.operator) {
      calculator.operator = value;
      calculator.nextOperator = calculator.operator;
      calculator.term += calculator.operator;
      calculator.total = calculator.current;
      reassignedVariables(calculator.nextOperator);
      showDisplay(calculator.term, calculator.total);
    } else {
      calculator.nextOperator = value;
      calculator.term += calculator.nextOperator;
      calculator.total = calculation(calculator.total, calculator.current);
      reassignedVariables(calculator.nextOperator);
      showDisplay(calculator.term, calculator.total);
    }
  }
};
/*
 *PRE-CONDITIONS: This function gets information from global variables filled previously.
 *POST-CONDITIONS: It does three actions when it activates by event listener. 
 */
const doActions = function (event) {
  const character = event.target.value || event.key; 
  console.log(character);
  let action = character === CLEAR || character === EQUAL || character === DELETE;
  if (action) {
    if(character === EQUAL) {
      calculator.total = calculation(calculator.total, calculator.current);
      livesResult.innerHTML = calculator.total;
      display.innerHTML = "0";   
      calculator.current = 0;
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
      const firstTerm = calculator.term;
      const number = calculator.current;
      calculator.term = firstTerm.slice(0,-1);
      calculator.current = number.slice(0,-1);
      livesResult.innerHTML = calculator.current;
  
      if(calculator.current.length === 0) {
        livesResult.innerHTML = 0;
      }
    }
  }
};
numbers.forEach(function(input) {
  input.addEventListener("click", saveNumber);
  document.addEventListener("keypress",saveNumber);
});
operators.forEach(function(operators) {
  operators.addEventListener("click", operate)
  document.addEventListener('keypress', operate);
});
actions.forEach(function(actions) {
  actions.addEventListener("click", doActions)
  document.addEventListener('keypress', doActions);
});

