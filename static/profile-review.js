const form = document.getElementById("profile-form");
const panel = document.getElementById("review_panel");
const editBtn = document.getElementById("edit_button");
const confirmBtn = document.getElementById("confirm_button");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // stop the form from submitting to the server
  const clicked = e.target;    // the element that fired the event
  if (!form.checkValidity()) {   // any HTML rule (required, pattern, min/max) failing?
    form.reportValidity();       // show the browser's warning
    return;                      // stop
  } 
  displayReview(); // form is valid, so continue (ex: open read-only review panel)
}); 

function displayReview(){

}

editBtn.addEventListener("click", function () {
 
});

confirmBtn.addEventListener("click", function () {
 form.submit();
});

/*document.querySelector(selector)
document.querySelectorAll(selector)

// 1. SELECT the element

// 2. LISTEN for an event
button.addEventListener("click", function () {
     // 3. REACT: change the page
  document.getElementById("out").textContent = 
       new Date().toLocaleTimeString();
});

box.textContent = "Safe plain text";  // SAFE — use for user data

box.classList.add("highlight");
box.classList.remove("highlight");
box.classList.toggle("open"); // add if absent, remove if present

css
.panel { display: none; }       // hidden by default 
.panel.open { display: block; } // visible when .open is present 

//js

showBtn.addEventListener("click", 
                        () => panel.classList.add("open")); // show
hideBtn.addEventListener("click", 
                     () => panel.classList.remove("open")); // hide// This is exactly how a pop-up / results panel is shown and hidden.
*/                    