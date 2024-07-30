import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth } from "./firebaseConfig.js";
import { collection, addDoc, getDocs  } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js"; 
import { db } from "./firebaseConfig.js";
const btn = document.querySelector('#btn');
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(user);
        // if (user.displayName) {
        //     welcomeText.innerHTML = `Hi, ${user.displayName}`
        // }else{
        //     welcomeText.innerHTML = `${user.email}`
        // }
        img.src = `${user.photoURL}`
    } else {
        window.location = 'index.html'
    }
});
btn.addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log('Signed Out!')
        window.location = 'index.html'
    }).catch((error) => {
        alert('An error appeared');
    });
})
async function getData() {
    const querySnapshot = await getDocs(collection(db, "todos"));
    if (auth.currentUser.displayName) {
        welcomeText.innerHTML = `Hi, ${auth.currentUser.displayName}`
    }else{
        welcomeText.innerHTML = `${auth.currentUser.email}`
    }
    querySnapshot.forEach((doc) => {
        todo.push(doc.data());
});
    printTodo();
}
getData();
let todo = [];
let input = document.querySelector('.input');
let form = document.querySelector('#form');
let welcomeText = document.querySelector('#welcome-text');
let img = document.querySelector('#img');
let div = document.querySelector('.main');
let addTodo = document.querySelector('#addTodo');
let deleteTodo = document.querySelector('#deleteTodo');
let editTodo = document.querySelector('#editTodo');
function printTodo() {
    div.innerHTML = '';
    for (let i = 0; i < todo.length; i++) {
        div.innerHTML += `
        <div class="list">
            <h2 class="main-head">${todo[i].todo}</h2>
            <div class="icons">
                <div id="editTodo">
                    <i class="fa-solid fa-1 fa-pen-to-square"></i>
                </div>
                <div id="deleteTodo">
                    <i class="fa-solid fa-2 fa-trash"></i>
                </div>
            </div>
        </div>
        `
        ;
    }
}
form.addEventListener('submit', async (event)=>{
    event.preventDefault();
    todo.push({
        todo: input.value
    }
    );
    printTodo();
    try {
        const docRef = await addDoc(collection(db, "todos"), {
            todo: input.value
        });
        input.value = '';
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
})