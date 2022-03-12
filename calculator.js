const PLUS = '+'; 
const SUBTRACT = '-';
const DELETE = "delete";
const EQUAL = '=';
const DISPLAYzERO = `0`;
const EMPTYsTRING = "";
const EMPTYcHARACTER = '';
const BASE = 10;
const OUTCOME = document.querySelectorAll("input");
/*
 * I don´t know if the behavior of this object is like a struct:
 * Questions: 
 *  It has to be declared first as variable before use it or not?
 *  Also I dont't know if I can set the variables that are on it.
 *  Because of it's working, I'm not sure.
 */
let count = {
  term: EMPTYsTRING,
  firstTerm: EMPTYsTRING,
  secondTerm: EMPTYsTRING,
  operator: EMPTYsTRING,
  total: EMPTYsTRING,
  display: document.querySelector(".display")
}; 
/*
 *PRE: It took globals variables from the general scope. Theses variables has to be charged previously.
 *POST: It calculates the operation between two integers.
 *NOTE: I have to improve this function, It has to be able to calculate more operations. 
 */
function calculation() {
  let one = parseInt(count.firstTerm, BASE);
  let two = parseInt(count.secondTerm, BASE);
  let final = 0;
  if (count.operator === PLUS) {
      final = one + two;
  } else if (count.operator === SUBTRACT) {
      final = one - two;
  }
  return final;
}
/*
 *PRE: This function is activated if the eventListener is true.
 *POST: Store the elements selected in the calculator by the user.
 *NOTE: This function has to be modularized and scalable, so it has to improve.
 */
const SAVEcHARACTER = function(event) {  
  let character = event.target.value;
  if (character != SUBTRACT && character != PLUS && character != EQUAL && character != DELETE) {
      count.term += event.target.value;
      count.display.innerHTML = `${count.term}`;
  } else if (character === SUBTRACT || character === PLUS) {
      count.operator = character;
      count.firstTerm =  count.term;
      count.term = EMPTYcHARACTER;
      count.display.innerHTML = DISPLAYzERO;
  } else if (character === EQUAL) {
      count.secondTerm = count.term;
      final = calculation();
      count.display.innerHTML = `${final}`;
  } else if (character == DELETE) {
      count.firstTerm = EMPTYsTRING;
      count.secondTerm = EMPTYsTRING;
      count.term = EMPTYsTRING;
      count.display.innerHTML = DISPLAYzERO;
  }
}
/*
 *PRE: It took a bunch of elements from the DOM in this case inputs, to add a event listener to them. Because it is a calculator. 
 *POST: If de event is true, It executes process to get a solution.   
 */
OUTCOME.forEach(function(input){
  input.addEventListener("click", SAVEcHARACTER)
});