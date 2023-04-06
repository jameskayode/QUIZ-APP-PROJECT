const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];


//for the sound effect
const backgroundSound = new Audio("abstract-style.mp3");
const correctSound = new Audio('sound_correct.mp3');
const wrongSound = new Audio('sound_incorrect.mp3');

// Set the volume of the background sound to 50%
backgroundSound.volume = 0.5;

function playBackgroundSound() {
  backgroundSound.play();
}

function stopBackgroundSound() {
  backgroundSound.pause();
  backgroundSound.currentTime = 0;
}

function playCorrectSound() {
  // Stop the background sound before playing the correct sound
  stopBackgroundSound();
  
  correctSound.volume = 1; // Set the correct sound volume to 100%
  correctSound.play();

  // Start the background sound again after a short delay
  setTimeout(playBackgroundSound, 2000);
}

function playWrongSound() {
  // Stop the background sound before playing the wrong sound
  stopBackgroundSound();
  
  wrongSound.volume = 1; // Set the wrong sound volume to 100%
  wrongSound.play();

  // Start the background sound again after a short delay
  setTimeout(playBackgroundSound, 2000);
}


let questions = [
{
  question: "Which of the following can be used to call a JavaScript Code Snippet?",
  choice1: "Function/Method",
  choice2: "Preprocessor",
  choice3: "Triggering Event",
  choice4: "RMI",
        answer: 1,
    },
    {
        question: "What does CSS stand for?",
        choice1: "Central Style Sheets",
        choice2: "Cascading Style Sheets",
        choice3: "Cascading Simple Sheets",
        choice4: "Cars SUVs Sailboats",
       answer: 2,
    },
    {
        question: "Which of the following object is the main entry point to all client-side JavaScript features and APIs?",
        choice1: "Position",
        choice2: "Window",
        choice3: "Standard",
        choice4: "Location",
        answer: 2,
    },
    {
        question: "What year was JavaScript launched?",
        choice1: "1996",
        choice2: "1995",
        choice3: "1994",
        choice4: "none of the above",
        answer: 2,
    },
    {
        question: "how does DOM stand for?",
        choice1: "Document object Manager",
        choice2: "Document object Management",
        choice3: "Document Object Model",
        choice4: "none of the above",
        answer: 3
    },
  {
    question: "Inside which HTML element do we put the JavaScript??",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3
  },
  {
    question: " How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4
  },
  {
  question:"JavaScript is the programming language of the _____",
  choice1: "Desktop",
  choice2:"Mobile",
  choice3: "Web",
  choice4: "Server",
  answer:3
  },
  {
    question:"Which symbol is used separate JavaScript statements?",
    choice1: "Comma (,)",
    choice2: "Colon (:)",
    choice3: "Hyphen(-)",
    choice4: "Semicolon (;)",
    answer:4
  }

];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  playBackgroundSound(); 
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
      correctSound.play();
    }
    else {
      wrongSound.play();
    }
    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();
