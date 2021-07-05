const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');
const guessLessZero = document.getElementById('less-than-zero');
const guessGreatHundred = document.getElementById('great-than-hundred');

let targetNumber;
let attempts = 0;
const maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);
  attempts = attempts + 1;

  hideAllMessages();

  if (guess < 0 || guess > 99) {
    if (guess < 0) {
      guessLessZero.style.display = '';
    } else {
      guessGreatHundred.style.display = '';
    }
  } else {
    if (guess === targetNumber) {
      numberOfGuessesMessage.style.display = '';
      numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

      correctMessage.style.display = '';

      submitButton.disabled = true;
      guessInput.disabled = true;
    } else {
      if (guess < targetNumber) {
        tooLowMessage.style.display = '';
      } else {
        tooHighMessage.style.display = '';
      }

      const remainingAttempts = maxNumberOfAttempts - attempts;

      numberOfGuessesMessage.style.display = '';
      const guessWord = remainingAttempts == 1 ? 'guess' : 'guesses';
      numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} ${guessWord} remaining`;
    }
  }



  if (attempts === maxNumberOfAttempts) {
    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  guessInput.value = '';

  resetButton.style.display = '';
}

function hideAllMessages() {
  if (messages.length > 0) {
    for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
      messages[elementIndex].style.display = 'none';
    }
  }

}

function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  attempts = 0;

  // Enable the input and submit button
  submitButton.disabled = false;
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = 'none';
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup();
