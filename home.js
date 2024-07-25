import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth } from "./firebaseConfig.js";
const btn = document.querySelector('#btn');
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(uid);
    } else {
        window.location = 'index.html'
    }
});
btn.addEventListener('click', () => {
    signOut(auth).then(() => {
        alert('Signed Out!')
        window.location = 'index.html'
    }).catch((error) => {
        alert('An error appeared');
    });
})