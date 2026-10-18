const form = document.getElementById("profile-form");
const panel = document.getElementById("review_panel");
const editBtn = document.getElementById("edit_button");
const confirmBtn = document.getElementById("confirm_button");

form.addEventListener("submit", function (e) {
  e.preventDefault(); 
  if (!form.checkValidity()) {  
    form.reportValidity();       
    return;                     
  } 
  displayReview(); 
}); 

function displayReview(){
  document.getElementById("review_student_id").textContent=document.getElementById("student_id").value;
  document.getElementById("review_fullname").textContent=document.getElementById("fullname").value;
  document.getElementById("review_email").textContent=document.getElementById("email").value;
  document.getElementById("review_phone").textContent=document.getElementById("phone").value;
  document.getElementById("review_birthdate").textContent=document.getElementById("birthdate").value;
  document.getElementById("review_portfolio").textContent=document.getElementById("portfolio").value || "Not provided";
  document.getElementById("review_gin446").textContent=document.getElementById("gin446").value || "Not provided";
  document.getElementById("review_major").textContent=document.getElementById("major").value;
  document.getElementById("review_gpa").textContent = document.getElementById("gpa").value;
  document.getElementById("review_credits").textContent = document.getElementById("credits").value;
  document.getElementById("review_graduation").textContent = document.querySelector('input[name="graduation"]:checked')?.value || "Not provided" ;
  document.getElementById("review_graduation_month").textContent = document.getElementById("graduation_month").value || "Not provided";
  document.getElementById("review_internship_completed").textContent = document.querySelector('input[name="internship_completed"]:checked')?.value || "Not provided";
  const experience = [...document.querySelectorAll('input[name="skills"]:checked')].map(cb => cb.value);
  document.getElementById("review_experience").textContent = experience.length ? experience.join(", ") : "Not selected";
  document.getElementById("review_language").textContent = document.getElementById("language").value || "Not provided";  
  const software = [...document.getElementById("software").selectedOptions].map(opt => opt.value);
  document.getElementById("review_software").textContent = software.length ? software.join(", ") : "Not selected";  
  document.getElementById("review_project_title").textContent = document.getElementById("project_title").value;
  document.getElementById("review_project_area").textContent = document.getElementById("project_area").value;
  document.getElementById("review_description").textContent = document.getElementById("description").value || "Not provided";
  document.getElementById("review_team_size").textContent = document.getElementById("team_size").value || "Not provided";
  document.getElementById("review_project_color").textContent = document.getElementById("project_color").value;
  document.getElementById("review_meeting_date").textContent = document.getElementById("meeting_date").value || "Not provided";
  document.getElementById("review_meeting_time").textContent = document.getElementById("meeting_time").value || "Not provided";
  form.classList.add("hidden");
  panel.classList.add("open"); 
}


editBtn.addEventListener("click", function () {
  panel.classList.remove("open");
  form.classList.remove("hidden");
});

confirmBtn.addEventListener("click", function () {
 form.submit();
});