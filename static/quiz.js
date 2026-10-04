const questions = [
  {
  question: "Guess the movie: A high school student accidentally alters historical events using a modified sports vehicle, then must manipulate his teenage parents into falling in love to preserve his own existence.",
  choices: ["The Terminator", "Back to the Future", "The Matrix", "Donnie Darko"],
  answer: 1,
  explanation: "Back to the Future (1985) features Marty McFly traveling back to 1955 in a DeLorean."
  },

  {
  question: "Guess the movie: A former high-ranking military commander is reduced to forced athletic labor, ultimately using organized arena combat to overthrow a corrupt head of state.",
  choices: ["Gladiator", "Troy", "Spartacus", "300"],
  answer: 0,
  explanation: "Gladiator (2000) follows Maximus Decimus Meridius, a Roman general who becomes a gladiator to avenge his family's murder."
  },

  {
  question: "Guess the movie: A space-monk order rescues a talented desert child, only for him to fall victim to political radicalization and join a dictatorial regime after suffering severe burn injuries.",
  choices: ["Star Wars: Episode III – Revenge of the Sith", "Star Wars: Episode IV – A New Hope", "Dune: Part Two", "Star Trek"],
  answer: 0,
  explanation: "Star Wars: Episode III – Revenge of the Sith (2005) features Anakin Skywalker's fall to the dark side and transformation into Darth Vader."
  },

  {
  question: "Guess the movie: An orphaned boy discovers his innate talent for a high-risk airborne sport and spends seven consecutive academic terms thwarting an undying dark sorcerer.",
  choices: ["Percy Jackson & the Olympians", "The Chronicles of Narnia", "Harry Potter and the Philosopher's Stone", "Pirates of the Carribean"],
  answer: 2,
  explanation: "Harry Potter and the Philosopher's Stone (2001) features Harry Potter discovering his magical abilities and facing the dark wizard Voldemort."
  },

  {
  question: "Guess the movie: A diminutive rural resident is tasked with walking thousands of miles across hazardous terrain to dispose of hazardous jewelry in an active volcano.",
  choices:["The Hobbit: An Unexpected Journey", "The Lord of the Rings: The Fellowship of the Ring","Willow", "The Princess Bride"],
  answer: 1,
  explanation: "The Lord of the Rings: The Fellowship of the Ring (2001) follows Frodo Baggins on his quest to Mordor to destroy the One Ring."
  },

  {
  question: "Guess the movie: An aristocrat's son relocating to an arid desert planet acquires local spiritual leadership status by riding a giant invertebrate and controlling the universe's most valuable narcotic.",
  choices: ["Mad Max: Fury Road","Star Wars: Return of the Jedi","Dune", "Avatar"],
  answer: 2,
  explanation: "Dune (2021) follows Paul Atreides as he navigates political intrigue and becomes a messianic figure on the desert planet Arrakis."
  },

  {
  question: "Guess the movie: An academically gifted teenager gets bitten by a genetically engineered arachnid and decides to fight street crime after failing to prevent a familial tragedy.",
  choices: ["Ant-Man", "Venom", "The Incredible Hulk","Spider-Man"],
  answer: 3,
  explanation: "Spider-Man (2002) follows Peter Parker as he gains superpowers from a radioactive spider bite and becomes the superhero Spider-Man."
  },

  {
  question: "Guess the movie: An intergalactic warlord seeks a set of glowing cosmic gems to eliminate half of all sentient life, attempting to solve universal resource scarcity through aggressive arithmetic.",
  choices: ["Guardians of the Galaxy","Avengers: Infinity War", "Avengers: Age of Ultron", "Thor: Ragnarok"],
  answer: 1,
  explanation: "Avengers: Infinity War (2018) follows the Avengers and their cosmic allies as they try to stop the intergalactic tyrant Thanos from collecting all six Infinity Stones to erase half of all life in the universe."
  },
  
  {
  question: "Guess the movie: Four British siblings hide inside a wooden storage cabinet during a game of hide-and-seek, accidentally initiating a political uprising led by a talking lion against an eternal winter regime.",
  choices: ["The Bridge to Terabithia", "Percy Jackson and the Olympians", "The Chronicles of Narnia: The Lion, the Witch and the Wardrobe","The Golden Compass"],
  answer: 2,
  explanation: "The Chronicles of Narnia: The Lion, the Witch and the Wardrobe (2005) follows the Pevensie siblings as they enter the magical land of Narnia and help defeat the White Witch."
  },

  {
  question: "Guess the movie: A genetically enhanced WWII veteran wakes up after a 70-year cryogenic nap to discover his former best friend is now a brainwashed Soviet assassin with a metal arm.",
  choices: ["Captain America: The Winter Soldier", "Captain America: Civil War", "X-Men: Days of Future Past", "Iron Man 2"],
  answer: 0,
  explanation: "Captain America: The Winter Soldier (2014) follows Steve Rogers as he uncovers a conspiracy within S.H.I.E.L.D. and faces his old friend Bucky Barnes, now the brainwashed assassin known as the Winter Soldier."
  }
]; 


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
  return Math.round(percentage);;
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
  else useranswer="Your answer: Not Answered"
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