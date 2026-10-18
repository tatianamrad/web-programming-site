let total=0;
const cache={};


let currentQuestion = 0; 
const userAnswers = new Array(questions.length);


function saveAnswer(choiceIndex) {
  userAnswers[currentQuestion]= choiceIndex;
}

function goNext() {
  if(currentQuestion < questions.length-1)
    currentQuestion++;
  renderQuestion();
}

function goPrevious() {
  if(currentQuestion > 0)
     currentQuestion--;
  renderQuestion();
}

function goFirst() {
  currentQuestion = 0;
  renderQuestion();
}

function goLast() {
  currentQuestion = questions.length-1;
  renderQuestion();
}

function calculateScore() {
  let score = 0;
  for (let i = 0; i < questions.length; i++){
    if(userAnswers[i]==questions[i].answer) score++;
  }
return score;
}

function calculatePercentage(score) {
  let percentage = (calculateScore() / questions.length) * 100 ;
  return Math.round(percentage);
}

function getPerformanceMessage(percentage) {
let message ="";
  if(percentage < 50)
    message="Needs improvement";
  else if(percentage<=59 && percentage>=50)
    message="Pass";
  else if(percentage<=79 && percentage >=60)
    message="Good";
  else
    message="Excellent";
return message;
}

function buildCorrection() {
  let correction = "";
  let question="";
  let useranswer="";
  let correctans="";
  let result="";
  let explanation="";
  for (let i = 0; i < questions.length;i++){
   question = "Question " + (i+1) +": "+ questions[i].question;
   if(userAnswers[i]!== undefined)
   useranswer="Your answer: "+""+ questions[i].choices[userAnswers[i]];
  else useranswer="Your answer: Not Answered";
   correctans= "Correct answer: "+""+ questions[i].choices[questions[i].answer]; 
   if(userAnswers[i]==questions[i].answer) result="Result: Correct";
   else result="Result: Incorrect";
   explanation ="Explanation: " +""+ questions[i].explanation;

   correction += question +"\n\n"+ useranswer +"\n" + correctans +"\n" +result + "\n"+ explanation +"\n\n ------------------------------\n\n" ;
  }
  return correction;
}


// PROVIDED INTERFACE CODE
// DOM manipulation and events will be studied later.

function submitQuiz() {
  const score = calculateScore();
  const percentage = calculatePercentage(score);
  const message = getPerformanceMessage(percentage);
  const correction = buildCorrection();
  showResults(score, percentage, message, correction);
}

function submitQuiz() {
  const score = calculateScore();
  const percentage = calculatePercentage(score);
  const message = getPerformanceMessage(percentage);
  const correction = buildCorrection();
  showResults(score, percentage, message, correction);
}

function renderQuestion() {
  const q = questions[currentQuestion];

  // QUESTION NUMBER
  document.getElementById("progress").textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

  // QUESTION
  document.getElementById("questionText").textContent = q.question;

  // CHOICES
  const choicesContainer = document.getElementById("choices");
  choicesContainer.innerHTML = "";
  for (let i = 0; i < q.choices.length; i++) {
    const label = document.createElement("label");
    label.className = "choice";
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "answer";
    radio.value = i;
    // Restore an answer previously selected
    // by the user.
    if (userAnswers[currentQuestion] === i) {
      radio.checked = true;
    }
    // When the user selects this answer,
    // save its index.
    radio.onclick = function () {
      saveAnswer(i);
    };
    label.appendChild(radio);
    label.appendChild(document.createTextNode(" " + q.choices[i]));
    choicesContainer.appendChild(label);
  }

  // NAVIGATION BUTTONS
  document.getElementById("firstBtn").disabled = currentQuestion === 0;
  document.getElementById("previousBtn").disabled = currentQuestion === 0;
  document.getElementById("nextBtn").disabled =
    currentQuestion === questions.length - 1;
  document.getElementById("lastBtn").disabled =
    currentQuestion === questions.length - 1;
}

// DISPLAY RESULTS
function showResults(score, percentage, message, correction) {
  document.getElementById("quizPanel").style.display = "none";
  document.getElementById("resultsPanel").style.display = "block";
  document.getElementById("scoreText").textContent =
    `Score: ${score} / ${questions.length}`;
  document.getElementById("percentageText").textContent =
    `Percentage: ${percentage}%`;
  document.getElementById("performanceText").textContent = message;
  document.getElementById("correction").textContent = correction;
}

// START APPLICATION
renderQuestion();