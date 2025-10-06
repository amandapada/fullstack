const MAX_TRIES = 6;
let hasUserWon = false;
let RANDOM_GUESS = 0;
let user_trial = 0;

let inputBlock = document.getElementById("input_block");
let replyText = document.getElementById("reply");
    

inputBlock.addEventListener('keypress', (e) => {
    // Only allow digits 0-9
    if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
        replyText.innerHTML = "INVALID INPUT"
    }
});

function gameStart() {
    
    // Display game interface
    let startButton = document.getElementById("start");
    let guessButton = document.getElementById("guess");
    
    startButton.style.display = "none";
    guessButton.style.display = "inline-block";
    inputBlock.style.display = "inline-block";

    // Generate random number for user to guess
    const _randomGuess = Math.round(Math.random() * 100);
    console.log(_randomGuess)
    RANDOM_GUESS = _randomGuess;
    user_trial = 0;
}

function restart() {
    gameStart();
    replyText.innerHTML = "";
    inputBlock.value = "";
}

function takeUserGuess() {
    let userGuess = Number(document.getElementById("input_block").value);
    let startButton = document.getElementById("start");
    let guessButton = document.getElementById("guess");

    if (user_trial < MAX_TRIES) {
        if (userGuess === RANDOM_GUESS) {
            hasUserWon = true;
            replyText.innerHTML = "CONGRATULATIONS!! , YOU WIN";

            startButton.style.display = "inline-block";
            guessButton.style.display = "none";
            inputBlock.style.display = "none";
            startButton.innerText = "Play Again";

            startButton.addEventListener('click', () => {
                restart()
            });          
        } else if (userGuess < RANDOM_GUESS) {
            replyText.innerHTML = "TOO LOW, Please Try Again";
            guessButton.addEventListener('click', () => {
                inputBlock.value = "";
                replyText.style.display = "block";
            });
        } else if (userGuess > RANDOM_GUESS) {
            replyText.innerHTML = "TOO HIGH, Please Try Again";
            guessButton.addEventListener('click', () => {
                inputBlock.value = ""
                replyText.style.display = "block"
            });
        }

        user_trial += 1;
        if (user_trial == MAX_TRIES) {
            replyText.innerHTML = "SORRY, You have exhausted your trials";
            replyText.innerHTML += "The number was " + RANDOM_GUESS;

            startButton.style.display = "inline-block";
            guessButton.style.display = "none";
            inputBlock.style.display = "none";
            startButton.innerText = "Try Again"

            startButton.addEventListener('click', () => {
                restart()
            });
        }
    } 
}


