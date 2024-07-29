import {
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup,
    GithubAuthProvider
  } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
  import { auth } from "./firebaseConfig.js";
  
  const logInForm = document.querySelector("#logInForm");
  const emailInput = document.querySelector("#emailInput");
  const passwordInput = document.querySelector("#passwordInput");
  const indicator = document.querySelector("#indicator");
  const forgotPassword = document.querySelector("#forgotPassword");
  const googleBtn = document.querySelector("#googleBtn");
  const githubBtn = document.querySelector("#githubBtn");
  const provider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  logInForm.addEventListener("submit", (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        window.location = "home.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const editedError = errorCode.slice(5);
        if (errorCode === "auth/invalid-credential") {
          alert("Unregistered email or Incorrect password!");
        } else {
          alert(editedError);
        }
      });
  });
  
  forgotPassword.addEventListener("click", () => {
    sendPasswordResetEmail(auth, prompt("Enter the OTP verification email!"))
      .then(() => {
        alert("Password reset email sent!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const editedError = errorCode.slice(5);
        alert(editedError);
      });
  });
  
  googleBtn.addEventListener("click", (event) => {
    event.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        window.location = "home.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorMessage);
      });
  });
  
  githubBtn.addEventListener('click', event =>{
    event.preventDefault();
    signInWithPopup(auth, githubProvider)
  .then((result) => {
    const user = result.user;
    console.log();
    window.location = "home.html";
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GithubAuthProvider.credentialFromError(error);
    console.log(errorMessage);
  });
  })