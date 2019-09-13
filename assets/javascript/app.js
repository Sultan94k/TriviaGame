
var counter = 30;
var currentQuestion = 0;
var score = 0;
var lost = 0;
var timer;



function nextQuestion() {

    const isQuestionOver = (quizQuestions.length - 1) === currentQuestion;
    if (isQuestionOver) {

        console.log('Game is over!!!!');
        displayResult();
    } else {
        currentQuestion++;
        loadQuestion();
    }

}


function timeUp() {
    clearInterval(timer);

    lost++;

    preloadImage('lost')
    setTimeout(nextQuestion, 3 * 1000);
}
function countDown() {
    counter--;

    $('#time').html('Timer: ' + counter);

    if (counter === 0) {
        timeUp();
    }
}

function loadQuestion() {
    counter = 30;

    timer = setInterval(countDown, 1000);

    const question = quizQuestions[currentQuestion].question;
    const choices = quizQuestions[currentQuestion].choices;

    $('#time').html('Timer: ' + counter);
    $('#game').html(`
    <h4>${question}</h4>
    ${loadChoices(choices)}
    ${loadRemainingQuestion()}
    `);
}

function loadChoices(choices) {
    var result = '';

    for (var i = 0; i < choices.length; i++) {
        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
    }

    return result;
}


$(document).on('click', '.choice', function () {
    clearInterval(timer);
    const selectedAnswer = $(this).attr('data-answer');
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (correctAnswer === selectedAnswer) {
        score++;
        console.log('winsssss!');
        preloadImage('win');
        setTimeout(nextQuestion, 3 * 1000);
    } else {
        lost++;
        console.log('lost!');
        preloadImage('lost');
        setTimeout(nextQuestion, 5 * 1000);
    }
});

function displayResult() {
    const result = `
    <p>You get ${score} questions(s) right</p>
    <p>You missed ${lost} questions(s)</p>
    <p>Total questions ${quizQuestions.length} questions(s) right</p>
    <button class="btn btn-primary" id="reset">Reset Game</button>
    `;
    $('#game').html(result);
}



$(document).on('click', '#reset', function () {
    counter = 30;
    currentQuestion = 0;
    score = 0;
    lost = 0;
    timer = null;

    loadQuestion();
});

function loadRemainingQuestion() {
    const loadRemainingQuestion = quizQuestions.length - (currentQuestion + 1);
    const totalQuestion = quizQuestions.length;

    return `Remaining Question: ${loadRemainingQuestion}/${totalQuestion}`;
}

function randomImage(images) {
    const random = Math.floor(Math.random() * images.length);
    const randomImage = images[random];
    return randomImage;
}


function preloadImage(status) {
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;
    if (status === 'win') {
        $('#game').html(`
    <p class="preload-image">Congratulations, you pick the correct answer</p>
    <p class="preload-image">The correct answer is <b>${correctAnswer}</b></p>
    <img src="${randomImage(funImages)}"/>
    `);
    } else {
        $('#game').html(`
        <p class="preload-image">The correct answer was: <b>${correctAnswer}</b></p>
         <p class="preload-image">You lost pretty bad</p>
         <img src="${randomImage(sadImages)}"/>
    `);
    }
}


$('#start').click(function(){
    $('#start').remove();
    $('#time').html(counter);
    loadQuestion();
});





