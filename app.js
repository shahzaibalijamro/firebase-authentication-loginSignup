import { signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth } from "./firebaseConfig.js";
const logInForm = document.querySelector('#logInForm');
const emailInput = document.querySelector('#emailInput');
const passwordInput = document.querySelector('#passwordInput');
const indicator = document.querySelector('#indicator');
const forgotPassword = document.querySelector('#forgotPassword');
logInForm.addEventListener('submit', event => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            window.location = 'home.html'
        })
        .catch((error) => {
            const errorCode = error.code;
            const editedError = errorCode.slice(5);
            if (errorCode === 'auth/invalid-credential') {
                alert('Unregistered email or Incorrect password!')
            } else {
                alert(editedError);
            }
        });
})
forgotPassword.addEventListener('click', (event) => {
    event.preventDefault();
    sendPasswordResetEmail(auth, prompt('Enter the OTP verification email!'))
        .then(() => {
            alert('Password reset email sent!')
        })
        .catch((error) => {
            const errorCode = error.code;
            const editedError = errorCode.slice(5);
            alert(editedError);
        });
})