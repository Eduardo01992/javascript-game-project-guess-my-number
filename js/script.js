'use strict';

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const displayScore = function (score) {
  document.querySelector('.score').textContent = score;
};

const displayHighScore = function (highScore) {
  document.querySelector('.highscore').textContent = highScore;
};

const data = sessionStorage.getItem('highscore');
if (data) {
  displayHighScore(data);
  sessionStorage.clear();
}

const secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = Number(document.querySelector('.score').textContent);
let highScore = Number(document.querySelector('.highscore').textContent);

document.querySelector('.check').addEventListener('click', function () {
  const guessNumber = Number(document.querySelector('.guess').value);

  // When there is no input
  if (!guessNumber) {
    displayMessage('⛔ No number!');

    // When player wins
  } else if (guessNumber === secretNumber) {
    document.querySelector('.number').textContent = guessNumber;
    document.querySelector('.number').style.width = '30rem';
    displayMessage('🎉 Correct Number!');

    if (score > highScore) {
      highScore = score;
      displayHighScore(highScore);
    }

    document.querySelector('body').style.backgroundColor = '#60b347';

    // When guessNumber is wrong
  } else if (guessNumber !== secretNumber) {
    if (score > 1) {
      displayMessage(
        guessNumber > secretNumber ? '📈 Too high!' : '📉 Too low!'
      );
      displayScore(--score);
    } else {
      displayMessage('💥 You lost the game!');
      displayScore(0);
    }
  }
});

// Saving session and reloading the page
document.querySelector('.again').addEventListener('click', function () {
  sessionStorage.setItem('highscore', highScore);
  location.reload();
});
