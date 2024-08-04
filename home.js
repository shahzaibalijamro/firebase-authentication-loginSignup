import { 
    onAuthStateChanged,
    signOut
    } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth } from "./firebaseConfig.js";
import { 
    collection,
    addDoc,
    getDocs,
    doc,
    deleteDoc,
    updateDoc,
    Timestamp
    } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js"; 
import { db } from "./firebaseConfig.js";


const btn = document.querySelector('#btn');
let todo = [];
let input = document.querySelector('.input');
let form = document.querySelector('#form');
let welcomeText = document.querySelector('#welcome-text');
let img = document.querySelector('#img');
let div = document.querySelector('.main');



// check if the user is logged in or not
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(user);
        if (user.displayName != null) {
            welcomeText.innerHTML = `Hi, ${user.displayName}`
        }else{
            welcomeText.innerHTML = `${user.email}`
        }
        img.src = `${user.photoURL}`
    } else {
        window.location = 'index.html'
    }
});


// sign out button
btn.addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log('Signed Out!')
        window.location = 'index.html'
    }).catch((error) => {
        alert('An error appeared');
    });
})


// getting data from firestore
async function getData() {
    const querySnapshot = await getDocs(collection(db, "todos"));
    querySnapshot.forEach((doc) => {
        todo.push({...doc.data(), id: doc.id});});
    printTodo();
    console.log(todo[0].time.toDate());
}
getData();



// printing data on the screen
function printTodo() {
    div.innerHTML = '';
    for (let i = 0; i < todo.length; i++) {
        div.innerHTML += `
        <div class="list">
            <h2 class="main-head">${todo[i].todo}</h2>
            <div class="icons">
                <div id="editTodo">
                    <i id="updateBtn" class="fa-solid fa-1 fa-pen-to-square"></i>
                </div>
                <div id="deleteTodo">
                    <i id="deleteBtn" class="fa-solid fa-2 fa-trash"></i>
                </div>
            </div>
        </div>
        `
        ;
    }


    // deleting data from both array and firestore
    let deleteBtn = document.querySelectorAll('#deleteBtn');
    deleteBtn.forEach((btn,index)=>{
        btn.addEventListener('click', async()=>{
            await deleteDoc(doc(db, "todos", todo[index].id));
            console.log('data deleted');
            todo.splice(index,1);
            printTodo();
        })
    })



    // updating data from both array and firestore
    let updateBtn = document.querySelectorAll('#updateBtn');
    updateBtn.forEach((btn,index)=>{
        btn.addEventListener('click', async()=>{
            const updatedVal = prompt('Enter the updated value!', todo[index].todo)
            const updateRef = doc(db, "todos", todo[index].id);
            await updateDoc(updateRef, {
                todo: `${updatedVal}`
            });
            console.log('data updated');
            todo[index].todo = updatedVal
            printTodo();
        })
    })
}



// pushing data to the array and to the firestore
form.addEventListener('submit', async (event)=>{
    event.preventDefault();
    try {
        const docRef = await addDoc(collection(db, "todos"), {
            todo: input.value,
            time: Timestamp.fromDate(new Date())
        });
        console.log("Document written with ID: ", docRef.id);
        todo.push({
            todo: input.value,
            id: docRef.id,
        });
        input.value = '';
        printTodo();
    } catch (e) {
        console.error("Error adding document: ", e);
    }
})