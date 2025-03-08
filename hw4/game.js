const choices = ["rock", "paper", "scissors"]
let playerChoice = "";
let score = { wins: 0, losses: 0, ties: 0 };
const scoreBoard = document.querySelector("#score");

const playerImages = document.querySelectorAll("#player img");
const computerImage = document.querySelector(".computer img");
const resultText = document.querySelector(".result h3");
const playAgainButton = document.querySelector("#play-again button");

playerImages.forEach(img => {
    img.addEventListener("click", playerPick); 
        
    function playerPick() {
        playerImages.forEach(i => i.style.border = "1px solid");
        img.style.border = "3px solid red";
        playerChoice = img.id;
        startComputerTurn();
    }
});

function startComputerTurn() {
    let count = 0;
    const shuffleInterval = setInterval(() => {
        computerImage.src = `/${choices[count % 3]}.PNG`;
        count++;
    }, 500);
    
    setTimeout(() => {
        clearInterval(shuffleInterval);
        const computerChoice = choices[Math.floor(Math.random() * 3)];
        computerImage.src = `/${computerChoice}.PNG`;
        determineWinner(playerChoice, computerChoice);
    }, 3000);
}

function determineWinner(player, computer) {
    if (player === computer) {
        score.ties++;
        resultText.textContent = "RESULTS:   It's a Tie!";
    } else if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {
        score.wins++;
        resultText.textContent = "RESULTS:   You Win!!";
    } else {
        score.losses++;
        resultText.textContent = "RESULTS:   You Lose:( ... Computer Wins!";
    }
    updateScoreBoard();
}

function updateScoreBoard() {
    scoreBoard.innerHTML = `
        Wins: ${score.wins} <br>
        Losses: ${score.losses} <br>
        Ties: ${score.ties}
    `;
}

playAgainButton.addEventListener("click", playAgain);

function playAgain() {
    playerImages.forEach(i => i.style.border = "1px solid");
    computerImage.src = "/question-mark.PNG";
    resultText.textContent = "RESULTS: ";
    playerChoice = "";
}








