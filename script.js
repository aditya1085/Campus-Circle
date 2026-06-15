function showLogin(){
  homePage.classList.add("hidden");
  signupPage.classList.add("hidden");
  loginPage.classList.remove("hidden");
}

function showSignup(){
  homePage.classList.add("hidden");
  loginPage.classList.add("hidden");
  signupPage.classList.remove("hidden");
}

function showHome(){
  homePage.classList.remove("hidden");
  loginPage.classList.add("hidden");
  signupPage.classList.add("hidden");
}

function toggleTheme(){
  document.body.classList.toggle("dark");
}

function welcome(e){
  let p1=document.getElementById("pass1").value;
  let p2=document.getElementById("pass2").value;

  if(p1!==p2){
    alert("Passwords do not match");
    e.preventDefault();
    return;
  }

  alert("🎉 Welcome to CampusCircle!");
  e.preventDefault();
}
