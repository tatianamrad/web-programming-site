let total=0;
const cache={};

//application state
let currentQuestion = 0; 
const userAnswers = []; // the length isn't known until you fetch the count

//helper that fetches one question with caching
async function getQuestion(index) {
  if (cache[index] !== undefined)
  return cache[index];
  else {
     const response = await fetch(`/api/question/${index}`); 
      if (!response.ok) 
       throw new Error("HTTP " + response.status);
  const data = await response.json(); 
  cache[index] = data;
  return data;}
}

function saveAnswer(choiceIndex) {
  userAnswers[currentQuestion]= choiceIndex;
}

function goNext() {
  if(currentQuestion < total-1)
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
  currentQuestion = total-1;
  renderQuestion();
}

async function calculateScore() {
  let score = 0;
  for (let i = 0; i < total; i++){
    const q = await getQuestion(i);
    if(userAnswers[i]== q.answer) score++;
  }
return score;
}

function calculatePercentage(score) {
  let percentage = (score/total) * 100 ;
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

async function buildCorrection() {
  let correction = "";
  let question="";
  let useranswer="";
  let correctans="";
  let result="";
  let explanation="";
  for (let i = 0; i < total;i++){
   const q= await getQuestion(i);
   question = "Question " + (i+1) +": "+ q.question;
   if(userAnswers[i]!== undefined)
    useranswer="Your answer: "+""+ q.choices[userAnswers[i]];
   else 
    useranswer="Your answer: Not Answered";
   correctans= "Correct answer: "+""+ q.choices[q.answer]; 
   if(userAnswers[i]==q.answer) 
    result="Result: Correct";
   else 
    result="Result: Incorrect";
   explanation ="Explanation: " +""+ q.explanation;

   correction += question +"\n\n"+ useranswer +"\n" + correctans +"\n" +result + "\n"+ explanation +"\n\n ------------------------------\n\n" ;
  }
  return correction;
}


// PROVIDED INTERFACE CODE
// DOM manipulation and events will be studied later.

async function submitQuiz() {
   const loading = document.getElementById("loading");
   const error = document.getElementById("error");
   loading.hidden = false;
   error.hidden = true;
   try{
    const score = await calculateScore();
    const percentage = calculatePercentage(score);
    const message = getPerformanceMessage(percentage);
    const correction = await buildCorrection();
    showResults(score, percentage, message, correction);
   }
   catch(err){
        loading.hidden = true;
        error.textContent="Could not load question: "+ err.message;
        error.hidden=false;
   }
}

async function renderQuestion() {
  const loading = document.getElementById("loading");
  const error = document.getElementById("error");
  loading.hidden = false;
  error.hidden=true;
  try{
  const q = await getQuestion(currentQuestion);
  document.getElementById("progress").textContent =`Question ${currentQuestion + 1} of ${total}`;
  document.getElementById("questionText").textContent = q.question;
  const choicesContainer = document.getElementById("choices");
  choicesContainer.innerHTML = "";
  for (let i = 0; i < q.choices.length; i++) {
    const label = document.createElement("label");
    label.className = "choice";
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "answer";
    radio.value = i;
    if (userAnswers[currentQuestion] === i) {
      radio.checked = true;
    }
    radio.onclick = function () {
      saveAnswer(i);
    };
    label.appendChild(radio);
    label.appendChild(document.createTextNode(" " + q.choices[i]));
    choicesContainer.appendChild(label);
  }
  document.getElementById("firstBtn").disabled = currentQuestion === 0;
  document.getElementById("previousBtn").disabled = currentQuestion === 0;
  document.getElementById("nextBtn").disabled = currentQuestion === total - 1;
  document.getElementById("lastBtn").disabled = currentQuestion === total - 1;
  }
  catch(err){
    error.textContent="Could not load question: "+err.message;
    error.hidden=false;
  }
  finally {
    loading.hidden = true;
  }
}

  

// DISPLAY RESULTS
function showResults(score, percentage, message, correction) {
  document.getElementById("quizPanel").style.display = "none";
  document.getElementById("resultsPanel").style.display = "block";
  document.getElementById("scoreText").textContent =
    `Score: ${score} / ${total}`;
  document.getElementById("percentageText").textContent =
    `Percentage: ${percentage}%`;
  document.getElementById("performanceText").textContent = message;
  document.getElementById("correction").textContent = correction;
}

// START APPLICATION
async function init() { 
  const loading = document.getElementById("loading");
  const error = document.getElementById("error");
  loading.hidden=false;
  try{
  const response= await fetch("/api/questions/count");
   if (!response.ok) {
    throw new Error("HTTP " + response.status);
   }
   const data = await response.json();
   total = data.count;
   await renderQuestion();
  }
  catch(err){
    loading.hidden=true;
    error.textContent="Could not load question: "+err.message;
    error.hidden=false;
  }
}


init();
