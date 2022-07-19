const PLUS = '+'; 
const SUBTRACT = '-';
const MULTIPLY = '*';
const DIVIDE = '/';
const DELETE = 'e';
const EQUAL = '=';
const BASE = 10;
const CLEAR =  'c'
const DISPLAY_LENGTH = 17;
const numbers = document.querySelectorAll(".numbers");
const actions = document.querySelectorAll(".actions");
const equal = document.querySelector("#equal");
const operators = document.querySelectorAll(".operators");
let display = document.querySelector(".counts");
let livesResult = document.querySelector(".lives-result");
const signs = [PLUS, SUBTRACT, MULTIPLY, DIVIDE];

// Global variables
const calculator = {
  container:[],
  term: '',
  current: ''
};
/*
 *PRE-CONDITIONS: This function gets information from a event listener.
 *POST-CONDITIONS: It saves the numbers when are clicked.
 */
const saveNumber = function(event, element) {
  // This condition is a limit, therefore the screen cannot overflow.
  if (calculator.term.length < DISPLAY_LENGTH) {
    let character       =  element || event.target.value;
    calculator.term    += character;
    calculator.current += character;
    display.innerHTML   = calculator.term;

  }
}

/*
 *PRE-CONDITIONS: This function gets information from global variables filled previously.
 *POST-CONDITIONS: It Calculates a number.
 */
const operate = function(event, element) {

  let top     = calculator.container.length;
  const value = element || event.target.value;
  
  calculator.container[top]     = calculator.current;
  calculator.container[top + 1] = value;
  calculator.term              += value;
  calculator.current            = '';
  calculator.operator           = '';
  display.innerHTML             = calculator.term;
};

/*
 *PRE-CONDITIONS: This function gets information from global variables filled previously.
 *POST-CONDITIONS: It does three actions when it activates by event listener. 
 */
const wipeAction = function (event,element) {

  const character = element || event.target.value;

  if (character === CLEAR) {
    calculator.container.length = 0;
    calculator.current          = '';
    calculator.term             = '';
    display.innerHTML           = 0;
    livesResult.innerHTML       = 0;
  }
  
  if (character === DELETE && calculator.term.length > 0) {
    const firstTerm       = calculator.term;
    const number          = calculator.current;
    calculator.term       = firstTerm.slice(0,-1);
    calculator.current    = number.slice(0,-1);
    display.innerHTML     = calculator.term;
    
    if (calculator.current.length === 0) {
      display.innerHTML     = 0;
      livesResult.innerHTML = 0;
    }
  }
};

/*
 *PRE-CONDITIONS: It needed two terms.
 *POST-CONDITIONS:This function return the final result.
 */
function solution(first, second, operator) {

  const a = parseInt(first, BASE);
  const b = parseInt(second, BASE);
  let total;

  switch (operator) {
    case PLUS:
      total = a + b;
      break;
    case SUBTRACT:
      total = a - b;
      break;
    case MULTIPLY:
      total = a * b;
      break;
    case DIVIDE:
      if (b === 0) {
        total = "FATAL ERROR";
      } else {
        total = a / b;
      }
      break;
  }
  return total || first;
}

/*PRE-CONDITIONS:
 *POST-CONDITIONS: It Takes the elements from the global varables and solves the operations
 in order.
 */
const resolution = function() {
  let first, second, operator, total;
  let i = 0;
  calculator.container.push(calculator.current);

  for (i ; i < calculator.container.length; i++) {
    if (i === 0) {
      first    = calculator.container[i];
      i++;
      operator = calculator.container[i];
      i++;
      second   = calculator.container[i];
      total    = solution(first,second, operator);
    } else {
      first    = total;
      operator = calculator.container[i];
      i++;
      second   = calculator.container[i];
      total    = solution(first,second, operator);
    }
  }
  calculator.term            += calculator.current;
  livesResult.innerHTML       = total;
  display.innerHTML = ' ';
  calculator.term             = total;
  calculator.container.length = 0;
  calculator.current          = total;
}

numbers.forEach(function (input) {
  input.addEventListener("click", saveNumber)
});

operators.forEach(function (operators) {
  operators.addEventListener("click", operate)
});

actions.forEach(function (actions) {
  actions.addEventListener("click", wipeAction)
});

equal.addEventListener('click', resolution);

document.addEventListener('keydown', function (event) {
  let keyName = event.key;

  if (!isNaN(keyName)) {
    saveNumber(event, keyName);
  }
  if (keyName === 'Backspace') {
    event.preventDefault();
    keyName = DELETE;
    wipeAction(event,keyName);
  }
  if (keyName === CLEAR) {
    wipeAction(event,keyName);
  }
  if (keyName === 'Enter' || keyName === EQUAL) {
    resolution();
  }
  signs.forEach(element => {
    if (keyName === element) {
      operate(event, keyName);
   }
 });
});