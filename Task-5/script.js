let currentQuestionIndex=0;
let score=0;
let username="";

const welcomeScreen=document.getElementById("welcome_screen");
const quizScreen=document.getElementById("quiz_screen");
const resultScreen=document.getElementById("result_screen");
const questionElement=document.getElementById("question");
const optionsElement=document.getElementById("options");
const nextButton=document.getElementById("next_btn");
const startButton=document.getElementById("start_btn");
const result=document.getElementById("result");

startButton.addEventListener("click",()=>{
    username=document.getElementById("username").value.trim();
    if(username===""){
        alert("Please enter your name to start the quiz.");
        return;
    }
    welcomeScreen.style.display="none";
    quizScreen.style.display="block";
    loadQuizQuestions();
})


function loadQuizQuestions(){
    const currentQuestion=quizData[currentQuestionIndex];
    questionElement.innerText=(currentQuestionIndex+1)+". "+currentQuestion.question;
    optionsElement.innerHTML="";
    nextButton.classList.add("hidden");
    currentQuestion.options.forEach(options=>{
        const button=document.createElement("button");
        button.innerText=options;
        button.classList.add("option_btn");
        button.addEventListener("click",()=>{
            checkAnswer(button,options,currentQuestion.answer,currentQuestion.explanation);
        })
        optionsElement.appendChild(button);
    })
}

function checkAnswer(button,selectedOption,correctAnswer,explanation){
    const optButtons=document.querySelectorAll(".option_btn");
    optButtons.forEach(btn=>btn.disabled=true);
    if(selectedOption===correctAnswer){
        button.classList.add("correct");
        score++;
    }
    else{
        button.classList.add("incorrect");
        optButtons.forEach(btn=>{
            if(btn.innerText===correctAnswer){
                btn.classList.add("correct");
            }
        })
        const explanationElement=document.createElement("p");
        explanationElement.classList.add("explanation");
        explanationElement.innerText=`Explanation: ${explanation}`;
        optionsElement.appendChild(explanationElement); 
    }
    nextButton.classList.remove("hidden");
}

nextButton.addEventListener("click",()=>{
    currentQuestionIndex++;
    if(currentQuestionIndex<quizData.length){
        loadQuizQuestions();
    }
    else{
        showResult();
    }
})

function showResult(){
    quizScreen.style.display="none";
    resultScreen.style.display="block";
    result.innerText=`${username}, your score is ${score} out of ${quizData.length}.`;
    const percentage=(score/quizData.length)*100;
    if(percentage>=70){
        result.innerText+=` Congratulations! You passed the quiz with a score of ${percentage.toFixed(2)}%.`;
    }
    else{
        result.innerText+=` Unfortunately, you did not pass the quiz. Your score is ${percentage.toFixed(2)}%.`;
    }
}