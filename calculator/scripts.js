// variables
let currentInput = document.querySelector('.current-input');
let answer = document.querySelector('.answer');
let buttons = document.querySelectorAll('button');
let erasebtn = document.querySelector('#erase');
let clearbtn = document.querySelector('#clear');
let evaluate = document.querySelector('#evaluate');

// function display
let realTimeScreenValue = [];

// clear
clearbtn.addEventListener("click", () => {
  realTimeScreenValue = [''];
  answer.innerHTML = 0;
});

// get value of any button clicked and display to the screen
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (!btn.id.match('erase')) {
      // to build formula
      realTimeScreenValue.push(btn.value);
      currentInput.innerHTML = realTimeScreenValue.join('');

      // evaluate
      if (btn.classList.contains('num-btn')) {
        // eval = js function that evaluates a formula string and outputs a number, or undefined if invalid
        answer.innerHTML = eval(realTimeScreenValue.join(''));
      }
    }
    if (btn.id.match('erase')) {
      realTimeScreenValue.pop();
      currentInput.innerHTML = realTimeScreenValue.join('');
      answer.innerHTML = eval(realTimeScreenValue.join(''));
    }

    // To prevent undefined error in screen
    if (typeof eval(realTimeScreenValue.join('')) == 'undefined') {
      answer.innerHTML = 0
    }
  });
});