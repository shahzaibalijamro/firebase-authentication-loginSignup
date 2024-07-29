import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth } from "./firebaseConfig.js";
const btn = document.querySelector('#btn');
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(user);
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
let todo = [];
let input = document.querySelector('.input');
let div = document.querySelector('.main');
let addTodo = document.querySelector('#addTodo');
let deleteTodo = document.querySelector('#deleteTodo');
let editTodo = document.querySelector('#editTodo');
function printTodo() {
    div.innerHTML = '';
    for (let i = 0; i < todo.length; i++) {
        div.innerHTML += `
        <div class="list">
            <h2 class="main-head">${todo[i]}</h2>
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
addTodo.addEventListener('click', ()=>{
    todo.push(input.value);
    input.value = '';
    printTodo();
    console.log(todo);
})