/*

document.addEventListener("click", myFunction);
document.getElementById("").onclick=function() {}
const grad = document.querySelector('input[name="graduation"]:checked')?.value;
const skills = [...document.querySelectorAll('input[name="skills"]:checked')].map(cb => cb.value);
const software = [...document.getElementById("software").selectedOptions].map(opt => opt.value);
checkValidity reportValidity
form.addEventListener("submit", function (e) {
  e.preventDefault(); // stop the form from submitting to the server
  const clicked = e.target;    // the element that fired the event
  // ... handle it in the browser instead ...
});
const form = document.getElementById("profile-form");
previewBtn.addEventListener("click", function () {
  if (!form.checkValidity()) {   // any HTML rule (required, pattern,
                                 // min/max) failing?
    form.reportValidity();       // show the browser's warning
                                 // bubbles
    return;                      // stop
  }
  // form is valid → continue (e.g., open a preview)
});
const list = document.getElementById("list");
const skills = ["Python", "SQL", "JavaScript"];
list.textContent = ""; // clear anything already there
skills.forEach(function (skill) {
  const li = document.createElement("li");    // create a node
  li.textContent = skill;                     // set its text (safe)
  list.appendChild(li);                       // add it to the page
});


*/