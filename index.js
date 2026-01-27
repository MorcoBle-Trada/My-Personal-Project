const colorBox = document.getElementById("colorBox");
const optionsContainer = document.getElementById("guessOptions");
const scoreText = document.getElementById("score");
const newGameBtn = document.getElementById("newGame");
const messageText = document.getElementById("message");

let playerName = "";
let score = 0;
let correctColor = "";

playerName = prompt("What is your name?") || "Player";
messageText.textContent = `Welcome ${playerName}! This is Morco Ble's Colour Guessing Game 🎨`;

function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}


function startGame() {


    optionsContainer.innerHTML = "";
    messageText.textContent = `Guess the correct colour, ${playerName} 👀`;

    correctColor = randomColor();
    colorBox.style.backgroundColor = correctColor;

    const colors = [correctColor];

    while (colors.length < 6) {
        colors.push(randomColor());
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

                messageText.textContent = `🎉 Correct ${playerName}! Keep going!`;
                messageText.style.color = "green";

                setTimeout(startGame, 700);
                
            } else {
                score = 0;
                scoreText.textContent = score;

                alert(`❌ Sorry ${playerName}, that was wrong.`);

                if (score >= 20) {
                    alert(`Hey ${playerName}! Great Play🎉 Your final score is ${score}`);
                } else {
                       alert(`Hey ${playerName}! Your final score is ${score}`);
                
                }
                

                const tryAgain = confirm("Do your want to try again?");
                if (tryAgain) {
                    startGame();
                } else {
                    alert(`Thanks for playing, ${playerName}!`)
                }
            }
        });

        optionsContainer.appendChild(div);
    });
}

newGameBtn.addEventListener("click", () => {
    score = 0;
    scoreText.textContent = score;
    startGame();
});

startGame();