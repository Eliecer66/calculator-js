const PLUS = "+";
const SUBTRACT = "-";
const MULTIPLY = "*";
const DIVIDE = "/";
const DELETE = "x";
const EQUAL = "=";
const BASE = 10;
const CLEAR = "C";
const CALCULATE_ACTIONS = [EQUAL, "Enter"];
const DELETE_ACTIONS = [DELETE, "Backspace"];
const CLEAR_ACTIONS = [CLEAR, "Delete"];
const KEY_NUMBERS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const KEY_OPERATORS = [PLUS, SUBTRACT, MULTIPLY, DIVIDE];
const KEY_ACTIONS = ["Enter", "Backspace", "Delete", EQUAL];

const numbers = document.querySelectorAll(".numbers");
const actions = document.querySelectorAll(".actions");
const operators = document.querySelectorAll(".operators");
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
  total: "",
};
/*
 *PRE-CONDITIONS: It needed two terms.
 *POST-CONDITIONS:This function return the final result.
 *NOTE: In the subtract's case is necessary the "if" because otherwise, the subtract can't be possible.
 */
function calculation(firstTerm, secondTerm) {
  if (secondTerm === "") {
    return firstTerm;
  }

  const one = firstTerm === "" ? 0 : parseInt(firstTerm, BASE);
  const two = parseInt(secondTerm, BASE);
  const { operator } = calculator;

  if (operator === PLUS) {
    return one + two;
  }
  if (operator === SUBTRACT) {
    return one - two;
  }
  if (operator === MULTIPLY) {
    return one * two;
  }
  if (operator === DIVIDE) {
    if (two === 0) {
      return "ERROR";
    }
    return one / two;
  }

  return 0;
}
/*
 *PRE-CONDITIONS: This function get information from a event listener.
 *POST-CONDITIONS: It Saves the numbers when are clicked.
 */
const saveNumber = function (event) {
  const character = event.key ? event.key : event.target.value;
  calculator.term += character;
  calculator.current += character;
  livesResult.innerHTML = calculator.current;
};
/*
 *PRE-CONDITIONS: This function gets information from global variables filled previously.
 *POST-CONDITIONS: It Calculates a number.
 */
const operate = function (event) {
  const value = event.key ? event.key : event.target.value;
  const copyCalc = { ...calculator };
  const { operator, total, current, term } = copyCalc;

  const lastTermDigit = term.slice(-1);
  const isFirstOperator = !!(term || total);
  const isARepeatedOperator = KEY_OPERATORS.includes(lastTermDigit);

  if (!isFirstOperator || isARepeatedOperator) {
    return;
  }

  calculator.term += value;
  calculator.operator = operator === "" ? value : operator;

  calculator.total = total === "" ? current : calculation(total, current);

  if (operator !== value) {
    calculator.operator = value;
  }

  calculator.current = "";

  display.innerHTML = calculator.term;
  livesResult.innerHTML = calculator.total;
};
/*
 *PRE-CONDITIONS: This function gets information from global variables filled previously.
 *POST-CONDITIONS: It does three actions when it activates by event listener.
 */
const doActions = function (event) {
  const character = event.key ? event.key : event.target.value;
  const copyCalc = { ...calculator };
  const { total, current } = copyCalc;

  if (CALCULATE_ACTIONS.includes(character)) {
    calculator.total = calculation(total, current);

    livesResult.innerHTML = calculator.total;
    calculator.term = "";
    calculator.operator = "";
    display.innerHTML = 0;
    calculator.current = "";
  }

  if (CLEAR_ACTIONS.includes(character)) {
    calculator.current = "";
    calculator.operator = "";
    calculator.term = "";
    calculator.total = "";
    display.innerHTML = 0;
    livesResult.innerHTML = 0;
  }

  if (DELETE_ACTIONS.includes(character)) {
    const firstTerm = calculator.term;
    const number = calculator.current;
    const box = number.slice(0, -1);
    const boxOne = firstTerm.slice(0, -1);
    calculator.term = boxOne;
    calculator.current = box;
    livesResult.innerHTML = calculator.current;

    if (calculator.current.length === 0) {
      livesResult.innerHTML = 0;
    }
  }
};
numbers.forEach(function (input) {
  input.addEventListener("click", saveNumber);
});
operators.forEach(function (operators) {
  operators.addEventListener("click", operate);
});
actions.forEach(function (actions) {
  actions.addEventListener("click", doActions);
});

document.addEventListener("keydown", function (event) {
  const key = event.key;

  if (KEY_NUMBERS.includes(key)) {
    saveNumber(event);
  }

  if (KEY_OPERATORS.includes(key)) {
    operate(event);
  }

  if (keyActions.includes(key)) {
    doActions(event);
  }
});
