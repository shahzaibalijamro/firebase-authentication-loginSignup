import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth } from "./firebaseConfig.js";
const registerForm = document.querySelector('#registerForm');
const registerName = document.querySelector('#registerName');
const registerEmail = document.querySelector('#registerEmail');
const registerPassword = document.querySelector('#registerPassword');
const registerRePassword = document.querySelector('#registerRePassword');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;
const indicator = document.querySelector('#indicator');

registerForm.addEventListener('submit', event => {
    event.preventDefault();
    if (registerPassword.value === registerRePassword.value) {
        createUserWithEmailAndPassword(auth, registerEmail.value, registerPassword.value)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                window.location = 'index.html';
            })
            .catch((error) => {
                const errorCode = error.code;
                const editedError = errorCode.slice(5);
                if (errorCode === 'auth/email-already-in-use') {
                    alert('This email is already registered! \nPlease Log In')
                    window.location = 'index.html';
                }else{
                    alert(editedError);
                }
            });
    }else{
        indicator.innerHTML = 'Passwords donot match!'
    }
})