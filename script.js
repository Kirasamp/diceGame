"use strict";

//////////////////////////////////
// Element Selectors
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const btnRoll = document.querySelector(".btn--roll");

const btnInstructions = document.querySelector(".btn--instructions");
const instructions = document.querySelector(".instructions");
const overlay = document.querySelector(".overlay");

// Variables
let scores, currentScore, activePlayer, playing;

//////////////////////////////////
// Functions

// Switch Players
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Starting Conditions
const init = function () {
  playing = true;

  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;

  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.add("player--active");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
};

init();

// Rolling Dice
const rollDice = function () {
  if (playing) {
    // Random Dice Roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display Dice
    diceEl.classList.remove("hidden");
    diceEl.src = `img/dice-${dice}.png`;

    // Check if Roll === 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
};

// Hold Score
const hold = function () {
  if (playing) {
    // Add current score to active players score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if score is >= 100
    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      playing = false;
      diceEl.classList.add("hidden");
    }
    // Switch players (if score < 100)
    else switchPlayer();
  }
};

// Instructions Box
const closeInstructions = function () {
  instructions.classList.add("hidden");
  overlay.classList.add("hidden");
};

const openInstructions = function () {
  instructions.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

//////////////////////////////////
// Event Handlers

// Roll Dice
btnRoll.addEventListener("click", rollDice);

// Player Holds
btnHold.addEventListener("click", hold);

// New Game
btnNew.addEventListener("click", init);

// Instructions Box
btnInstructions.addEventListener("click", openInstructions);
overlay.addEventListener("click", closeInstructions);
instructions.addEventListener("click", closeInstructions);
