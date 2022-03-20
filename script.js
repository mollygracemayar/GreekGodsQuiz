var timeEl = document.querySelector("#time");
var mainEl = document.getElementById("main");

var secondsLeft = 60;
function setTime() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft + " till times up"
        if (secondsLeft === 0) {
            clearInterval(timerInterval)
        }
    }, 1000);
}
var ansr1 = document.querySelector("#answer1");
var ansr2 = document.querySelector("#answer2");
var ansr3 = document.querySelector("#answer3");
var ansr4 = document.querySelector("#answer4");
var quest = document.querySelector("#question");
function letsGo() {
    setTime();
    askQuest();
}
var questions = [{
    question: "which god is ruler of the underworld?",
    answer1: "Zeus",
    answer2: "Poseidon",
    answer3: "Hades",
    answer4: "Apollo",
    rightAnswer:3
},

{
    question: "Which god is the ruler of the sea and horses",
    answer1: "Hera",
    answer2: "Poseidon",
    answer3: "Zeus",
    answer4: "Aphrodite",
    rightAnswer:2
},
{
    question: "Who is the king of the gods",
    answer1: "Hera",
    answer2: "Hades",
    answer3: "Poseidon",
    answer4: "Zeus",
rightAnswer:4


}]




var  score=0


function endGame() {
localStorage.setItem("HighScore", score);
localStorage.getItem("HighScore");
}
var questionIndex = 0;

function askQuest() {
    if (questionIndex === questions.length) {
        endGame();
    } else {
        document.getElementById("question").textContent = questions[questionIndex].question
        document.getElementById("answer1").textContent = questions[questionIndex].answer1
        document.getElementById("answer2").textContent = questions[questionIndex].answer2
        document.getElementById("answer3").textContent = questions[questionIndex].answer3
        document.getElementById("answer4").textContent = questions[questionIndex].answer4
    }
}
ansr1.addEventListener("click", function (event) {
    event.preventDefault();
    if(questions[questionIndex].rightAnswer===1){
        alert("correct")
    }else{
        alert("Incorrect")
    }
    questionIndex++;

    askQuest();
   
}
)
ansr2.addEventListener("click", function (event) {
    event.preventDefault();
    if(questions[questionIndex].rightAnswer===2){
        alert("correct")
    }else{
        alert("Incorrect")
    }
    questionIndex++
    askQuest();
})
ansr3.addEventListener("click", function (event) {
    event.preventDefault();
    if(questions[questionIndex].rightAnswer===3){
        alert("correct")
    }else{
        alert("Incorrect")
    }
    questionIndex++
    askQuest();
})
ansr4.addEventListener("click", function (event) {
    event.preventDefault();
    if(questions[questionIndex].rightAnswer===4){
        alert("correct")
    }else{
        alert("Incorrect")
    }
    questionIndex++
    askQuest();
})

var goBttn =document.getElementById("goBttn")
goBttn.addEventListener("click", letsGo)





