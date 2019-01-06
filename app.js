/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After
that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

let gameActive, scores, roundScore, activePlayer, previousRoll, toWin;

// Function to initialize a new game
const init = () => {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gameActive = true;
  previousRoll = 0;
  // Hides dice before game has begun.
  document.querySelector(".dice").style.display = "none";
  // Presets score values to 0 regardless of initial HTML value.
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(`.player-0-panel`).classList.remove("winner");
  document.querySelector(`.player-0-panel`).classList.remove("active");
  document.querySelector(`.player-0-panel`).classList.add("active");
  document.querySelector(`.player-1-panel`).classList.remove("winner");
  document.querySelector(`.player-1-panel`).classList.remove("active");
};

init();
console.log(toWin)

// Reset round score and change active player.
const nextPlayer = () => {
  roundScore = 0;
  document.getElementById(`current-${activePlayer}`).textContent = 0;
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  document.querySelector(`.player-0-panel`).classList.toggle("active");
  document.querySelector(`.player-1-panel`).classList.toggle("active");
  document.querySelector(".dice").style.display = "none";
  previousRoll = 0;
};

const diceDOM = document.querySelector(".dice");

// Roll Dice Button click handler.
document.querySelector(".btn-roll").addEventListener(
  "click",
  (rollDice = () => {
    if (gameActive) {
      if (previousRoll === 0) {
        // Generates random integer between 0-5 then moves that up a number.
        dice = Math.floor(Math.random() * 6) + 1;
        console.log("dice", dice);
        // Display the result to the DOM and set roll.
        diceDOM.style.display = "block";
        diceDOM.src = `dice-${dice}.png`;
        previousRoll = dice;
        // Update the current score IF the rolled number was not 1.
        if (dice !== 1) {
          roundScore += dice;
          document.querySelector(
            `#current-${activePlayer}`
          ).textContent = roundScore;
        } else {
          // Reset round score and change active player.
          nextPlayer();
        }
      } else {
        previousRoll = dice;
        console.log("Previous Roll", previousRoll);
        dice = Math.floor(Math.random() * 6) + 1;
        console.log("dice", dice);
        diceDOM.style.display = "block";
        diceDOM.src = `dice-${dice}.png`;
        if (dice === 6 && previousRoll === 6) {
          document.getElementById(`score-${activePlayer}`).textContent = "0";
          scores[activePlayer] = 0;
          nextPlayer();
        } else if (dice !== 1) {
          roundScore += dice;
          document.querySelector(
            `#current-${activePlayer}`
          ).textContent = roundScore;
        } else {
          nextPlayer();
        }
      }
    }
  })
);

document.querySelector(".btn-hold").addEventListener(
  "click",
  (holdScore = () => {
    if (gameActive) {
      // Add current score to overall score.
      scores[activePlayer] += roundScore;
      // Update the UI.
      document.querySelector(`#score-${activePlayer}`).textContent =
        scores[activePlayer];
      // Check if player won the game and update UI for winner.
      if (scores[activePlayer] >= 100) {
        document.querySelector(`#name-${activePlayer}`).textContent = "Winner!";
        document.querySelector(".dice").style.display = "none";
        document
          .querySelector(`.player-${activePlayer}-panel`)
          .classList.add("winner");
        document
          .querySelector(`.player-${activePlayer}-panel`)
          .classList.remove("active");
        document.getElementById(`current-${activePlayer}`).textContent = "0";
        gameActive = false;
      } else {
        // Reset round score and change active player.
        nextPlayer();
      }
    }
  })
);

document.querySelector(".btn-new").addEventListener("click", init);

/* Different ways to select HTML elements and manipulate them.
document.querySelector('#current-' + activePlayer).textContent = dice;
document.querySelector(`#current-${activePlayer}`).innerHTML = `<em> ${dice} </em>` */

/* Getter, posts written html to console.
const x = document.querySelector(`#score-1`).textContent;
console.log(x); */

/* Presets score values to 0 regardless of initial HTML value.
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0'; */

/* Do the same as .classList.toggle()
document.querySelector(`.player-0-panel`).classList.remove('active');
document.querySelector(`.player-1-panel`).classList.add('active'); */

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn.
(Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score,
so that they can change the predefined score of 100.
(Hint: you can read that value with the .value property in JavaScript.
This is a good opportunity to use google to figure this out)
3. Add another dice to the game, so that there are two dices now.
The player looses his current score when one of them is a 1.
(Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
