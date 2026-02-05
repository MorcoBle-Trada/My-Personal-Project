
const colorBox = document.getElementById("colorBox");
const optionsContainer = document.getElementById("guessOptions");
const scoreText = document.getElementById("score");
// const newGameBtn = document.getElementById("newGame");
const messageText = document.getElementById("message");
const actionButtons = document.getElementById("actionButtons");

let playerName = prompt("What is your name?");
if (!playerName) playerName = "Player";

const wantsToPlay = confirm(
  `Hi ${playerName}! 👋\nWould you like to play the Morcoble Colour Guessing Game? 🎨`
);

let score = 0;
let correctColor = "";

let welcomeMessage = false;


// function randomColor() {
//     const r = Math.floor(Math.random() * 256);
//     const g = Math.floor(Math.random() * 256);
//     const b = Math.floor(Math.random() * 256);
//     return `rgb(${r}, ${g}, ${b})`;
// }


function getBaseColor() {
  const red   = Math.floor(Math.random() * 200) + 30;
  const green = Math.floor(Math.random() * 200) + 30;
  const blue  = Math.floor(Math.random() * 200) + 30;

  return { red, green, blue };
}

function adjustColor(value, change) {
  // return Math.max(0, Math.min(255, value + change));

  let newValue = value + change; 
  if (newValue < 0) newValue = 0; 
  if (newValue > 255) newValue = 255; 
  return newValue;
}

function createSimilarColor(baseColor, difference) {
  const redChange   = Math.floor(Math.random() * difference) - difference / 2;
  const greenChange = Math.floor(Math.random() * difference) - difference / 2;
  const blueChange  = Math.floor(Math.random() * difference) - difference / 2;

  const red   = adjustColor(baseColor.red, redChange);
  const green = adjustColor(baseColor.green, greenChange);
  const blue  = adjustColor(baseColor.blue, blueChange);

  return `rgb(${red}, ${green}, ${blue})`;
}

function getDifficulty() {
  if (score < 5) return 120;   // Easy
  if (score < 15) return 50;  // Medium
  return 35;                 // Hard
}


function showWelcome() {
  welcomeMessage = false;
  optionsContainer.innerHTML = "";
  colorBox.style.backgroundColor = "transparent";
  actionButtons.innerHTML = "";

  messageText.className = "game-message welcome";
  messageText.innerHTML =
    `<strong>Welcome ${playerName} 👋</strong><br><br>
This is <strong>MorcoBle Color Guessing Game 🎨</strong> <br><br>
 A simple game with a clever twist 😉<br>
No rush. No pressure.<br>
Just colours, focus, and a bit of fun waiting for you 👀✨
`;

  const okBtn = document.createElement("button");
  okBtn.textContent = "OK, let's play 😉🎮";
  okBtn.addEventListener("click", startGame);

  actionButtons.appendChild(okBtn);
}



    // optionsContainer.innerHTML = "";
    // messageText.className = "game-message";

    // if (!welcomeMessage) {
    //     messageText.textContent = `Welcome ${playerName} to Morcoble Guessing Game 🎨`;
    //     messageText.classList.add("welcome");
    //     messageText.style.color = "#333";
    //     welcomeMessage = true;

    //     // After 2 seconds, change message
    //     setTimeout(() => {
    //         messageText.classList.remove("welcome");
    //         messageText.textContent = "Guess the correct colour 👇";
    //     }, 2000);
    // } else {
    //     messageText.textContent = "Guess the correct colour 👇";
    //     messageText.style.color = "#333";
    // }

//     if (!welcomeMessage) {
//   messageText.textContent = `Welcome ${playerName} to Morcoble Guessing Game 🎨`;
//   messageText.classList.add("welcome");
//   welcomeMessage = true;

//   setTimeout(() => {
//     messageText.classList.remove("welcome");
//     messageText.textContent = "Guess the correct colour 👇";
//   }, 2000);
// } else {
//   messageText.textContent = "Guess the correct colour 👇";
// }

function startGame() {
  welcomeMessage = true;
  score = 0;
  scoreText.textContent = score;
  actionButtons.innerHTML = "";

  messageText.className = "game-message";
  messageText.textContent = "What's the correct colour 👇";
  messageText.style.color = "#333";


    const okBtn = document.createElement("button");
  okBtn.textContent = "New Game🎮";
  okBtn.addEventListener("click", startGame);

  actionButtons.appendChild(okBtn);


  loadRound();
}


function loadRound() {

    optionsContainer.innerHTML = "";

    // correctColor = randomColor();
    // colorBox.style.backgroundColor = correctColor;

    // const colors = [correctColor];
    const baseColor = getBaseColor();

  correctColor = createSimilarColor(baseColor, 0);
  colorBox.style.backgroundColor = correctColor;

  const difficulty = getDifficulty();
  const colors = [correctColor];



    while (colors.length < 6) {
        colors.push(createSimilarColor(baseColor, difficulty));
    }

    colors.sort(() => Math.random() - 0.5);



    colors.forEach(color => {
        const div = document.createElement("div");
        div.className = "options";
        div.style.backgroundColor = color;

        div.addEventListener("click", () => {
            if (color === correctColor) {
                score++;
                scoreText.textContent = score;

                messageText.textContent = `✅🎉 Correct ${playerName}! Keep going!`;
                messageText.style.color = "green";

                      setTimeout(() => {
          messageText.textContent = "What's the correct colour 👇";
          messageText.style.color = "#333";
          loadRound();
        }, 600);

            } else {
                // const finalScore = score;

                // messageText.textContent = getPerformanceMessage(finalScore);
                // messageText.style.color = finalScore >= 20 ? "green" : "red";

                // optionsContainer.innerHTML = "";
                // score = 0;
                // scoreText.textContent = score;

                endGame();
            }

            //             function getPerformanceMessage(finalScore) {
            //     if (finalScore >= 20) {
            //         return `🔥 Great play ${playerName}! You scored ${finalScore}!`;
            //     } else {
            //         return `🎮 ${playerName}, your score is ${finalScore}. Try again!`;
            //     }
            // }
            //     score = 0;
            //     scoreText.textContent = score;

            //     alert(`❌ Sorry ${playerName}, that was wrong.`);

            //     if (score >= 20) {
            //         alert(`Hey ${playerName}! Great Play🎉 Your final score is ${score}`);
            //     } else {
            //            alert(`Hey ${playerName}! Your final score is ${score}`);

            //     }


            //     const tryAgain = confirm("Do your want to try again?");
            //     if (tryAgain) {
            //         startGame();
            //     } else {
            //         alert(`Thanks for playing, ${playerName}!`)
            //     }
            // }   
        });

        optionsContainer.appendChild(div);
    });
}

function endGame() {


      welcomeMessage = false;
  optionsContainer.innerHTML = "";
  actionButtons.innerHTML = "";

  messageText.className = "game-message game-over"; 

  if (score >= 20) {
    messageText.textContent =
      `🔥 Great play ${playerName}!  
       Final score: ${score}`;
  } else {
    messageText.innerHTML =
      `Nice try😉! ${playerName}. <br>  
       Your final score is ${score}`;
  }

  const yesBtn = document.createElement("button");
  yesBtn.textContent = "Play Again 🔁";
  yesBtn.addEventListener("click", startGame);

  const noBtn = document.createElement("button");
  noBtn.textContent = "No, Exit 👋";
  noBtn.addEventListener("click", thankYouMessage);

  actionButtons.appendChild(yesBtn);
  actionButtons.appendChild(noBtn);
}


function thankYouMessage() {
  actionButtons.innerHTML = "";
   scoreText.innerHTML = "";
   optionsContainer.innerHTML = "";
  messageText.className = "game-message welcome";
  messageText.innerHTML =
    `Hey ${playerName} 👋  <br>
    Thank you for playing My Colour Guessing Game 😉 <br>
      Regards MorcoBle 🎨`;
    //  noBtn.remove();
      
      //  newGameBtn.style.display = "none";
     
      // scoreText.style.display = "none";


}
    


// INITIAL LOAD
showWelcome();





//     const finalScore = score;

//     messageText.innerHTML =
//         finalScore >= 20
//             ? `🔥 Great play ${playerName}! You scored ${finalScore}!<br><span class="try-again">Play again?</span>`
//             : `🎮 Your score is ${finalScore}.<br><span class="try-again">Try again?</span>`;

//     messageText.style.color = finalScore >= 20 ? "green" : "red";

//     optionsContainer.innerHTML = "";
//     score = 0;
//     scoreText.textContent = score;
//     document.querySelector(".try-again").addEventListener("click", startGame);
// }

// newGameBtn.addEventListener("click", () => {
//     score = 0;
//     scoreText.textContent = score;
//     startGame();
// });

// if (wantsToPlay) {
//   startGame();
// } else {
//   messageText.textContent = "Maybe next time 👋 Thanks for stopping by!";
//   messageText.style.color = "#333";
// }



// const colorBox = document.getElementById("colorBox");
// const optionsContainer = document.getElementById("guessOptions");
// const scoreText = document.getElementById("score");
// const newGameBtn = document.getElementById("newGame");
// const messageText = document.getElementById("message");

// let playerName = prompt("What is your name?");
// if (!playerName) playerName = "Player";

// let score = 0;
// let correctColor = "";
// let hasWelcomed = false;

// // Random color generator
// function randomColor() {
//     const r = Math.floor(Math.random() * 256);
//     const g = Math.floor(Math.random() * 256);
//     const b = Math.floor(Math.random() * 256);
//     return `rgb(${r}, ${g}, ${b})`;
// }

// // Start game
// function startGame() {
//     optionsContainer.innerHTML = "";
//     messageText.className = "game-message";

//     if (!hasWelcomed) {
//         messageText.textContent = `Welcome ${playerName} to Morcoble Guessing Game 🎨`;
//         messageText.classList.add("welcome");
//         hasWelcomed = true;
//     } else {
//         messageText.textContent = "Guess the correct colour 👇";
//     }

//     correctColor = randomColor();
//     colorBox.style.backgroundColor = correctColor;

//     const colors = [correctColor];
//     while (colors.length < 6) {
//         colors.push(randomColor());
//     }

//     colors.sort(() => Math.random() - 0.5);

//     colors.forEach(color => {
//         const div = document.createElement("div");
//         div.className = "options";
//         div.style.backgroundColor = color;

//         div.addEventListener("click", () => {
//             if (color === correctColor) {
//                 score++;
//                 scoreText.textContent = score;

//                 messageText.textContent = `✅ Correct ${playerName}!`;
//                 messageText.style.color = "green";

//                 setTimeout(startGame, 600);
//             } else {
//                 endGame();
//             }
//         });

//         optionsContainer.appendChild(div);
//     });
// }

// // End game
// function endGame() {
//     const finalScore = score;

//     messageText.innerHTML =
//         finalScore >= 20
//             ? `🔥 Great play ${playerName}! You scored ${finalScore}!<br><span class="try-again">Play again?</span>`
//             : `🎮 Your score is ${finalScore}.<br><span class="try-again">Try again?</span>`;

//     messageText.style.color = finalScore >= 20 ? "green" : "red";
//     optionsContainer.innerHTML = "";

//     document.querySelector(".try-again").addEventListener("click", () => {
//         score = 0;
//         scoreText.textContent = score;
//         startGame();
//     });
// }

// // New Game button
// newGameBtn.addEventListener("click", () => {
//     score = 0;
//     scoreText.textContent = score;
//     startGame();
// });

// // Start on load
// startGame();
