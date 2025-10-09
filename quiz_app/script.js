const quizData = [
    {
        question: "What is the capital of Nigeria ?",
        options: ["Abuja", "Lagos", "Kogi", "Kaduna"],
        answer: "Abuja",
    },
    {
        question: "What is the capital of Kenya ?",
        options: ["Kampala", "Mauritius", "Nairobi", "Kaduna"],
        answer: "Nairobi",
    },
    {
        question: "What is the capital of Ghana?",
        options: ["Lesotho", "Accra", "Kogi", "Uganda"],
        answer: "Accra",
    },
    {
        question: "What is the capital of Togo?",
        options: ["Abuja", "Lagos", "Kogi", "Lome"],
        answer: "Lome",
    },
];

let USERNAME = "";
let userScore = 0;
let current = 0;

const startQuiz = () => {
    const _username = document.getElementById("user_name").value;
    if (_username == ''){
        errorMessage = document.getElementById("error");
        errorMessage.innerHTML = "Please Enter a valid user name.";
    } else {
        USERNAME = _username;
        displayGame();
    }
};



// Message displayed at the end of the game
let displayScore = document.getElementById("display_score");

let welcomeScreen = document.querySelector(".welcome_screen");
let quizInterface = document.querySelector(".quiz_interface")
let quizEnd = document.querySelector(".quiz_end")

let currentPage = current + 1;
let questionNumber = document.getElementById("question_number");
let question_text = document.getElementById("question");

let option1Name = document.getElementById("option1_name");
let option2Name = document.getElementById("option2_name");
let option3Name = document.getElementById("option3_name");
let option4Name = document.getElementById("option4_name");

let nextButton = document.getElementById("next");
let previousButton = document.getElementById("prev");
previousButton.style.display = "none";
let submitButton = document.getElementById("submit")

let modal = document.querySelector(".modal")
let confirmButton = document.getElementById("yes")
let rejectButtom = document.getElementById("no")

let endMessage = document.getElementById("end_message")
let retryButton = document.getElementById("retry")

function displayGame() {
    welcomeScreen.style.display = "none";
    quizInterface.style.display = "inline-block"
    submitButton.style.display = "none"
    questionNumber.innerHTML = currentPage;
    question_text.innerHTML = quizData[current].question;
    option1Name.innerHTML = quizData[current].options[0];
    option2Name.innerHTML = quizData[current].options[1];
    option3Name.innerHTML = quizData[current].options[2];
    option4Name.innerHTML = quizData[current].options[3];
}

nextButton.addEventListener('click', () => {
    checkAnswer()
    current += 1;
    if (current <= quizData.length - 1) {
        currentPage += 1;
        questionNumber.innerHTML = currentPage;
        displayGame()
        previousButton.style.display = "inline-block"
    } 
    if (current == quizData.length - 1){
        nextButton.style.display = "none";
        submitButton.style.display = "inline-block"
    }
});

previousButton.addEventListener('click', () => {
    current -= 1
    if (current > 0 - 1) {
        currentPage -= 1;
        questionNumber.innerHTML = currentPage;
        displayGame()
        nextButton.style.display = "inline-block"
        submitButton.style.display = "none"
        document.querySelectorAll('input[name="answer"]').forEach(radio => radio.checked = false);
    } 
    if (current == 0) {
        previousButton.style.display = "none"
    }
})

function checkAnswer() {
    const selectedRadio = document.querySelector('input[name="option"]:checked');
    if (selectedRadio) {
        const id = selectedRadio.id; 
        const selectedIndex = parseInt(id.replace('option', '')) - 1; 
        const selectedAnswer = quizData[current].options[selectedIndex];
        if (selectedAnswer === quizData[current].answer) {
            userScore++;
        }
    }
}

submitButton.addEventListener('click', () => {
    modal.style.display = "block"
});

confirmButton.addEventListener('click', () => {
    checkAnswer();
    endQuiz();
    modal.style.display = "none"
    quizInterface.style.display = "none"
});

rejectButtom.addEventListener('click', () => {
    modal.style.display = "none";
});

function endQuiz() {
    quizEnd.style.display = "inline-block"
    displayScore.innerHTML = `${USERNAME}, your score is ${userScore}`;
    if (userScore < quizData.length/2) {
        endMessage.innerHTML = "That's not so good. Would you like to try again?"
    } else if (userScore >= quizData.length/2 && userScore < quizData.length) {
        endMessage.innerHTML = "Good Job! Wanna see if you can get them all this time?"
    } else {
        endMessage.innerHTML = "Amazing! You don't need to try again, but who am I to stop you?"
    }
}

function resetQuiz() {
    current = 0;
    userScore = 0;
    currentPage = 1;
    nextButton.style.display = "inline-block";
    previousButton.style.display = "none";
    submitButton.style.display = "none";
    document.querySelectorAll('input[name="option"]').forEach(radio => radio.checked = false);
}

retryButton.addEventListener('click', () => {
    quizEnd.style.display = "none"
    resetQuiz()
    startQuiz()
})