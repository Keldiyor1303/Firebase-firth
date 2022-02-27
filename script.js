// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBotwyoX0jlthajd78ZPiMLeSboo8I08WM",
    authDomain: "fir-firth.firebaseapp.com",
    databaseURL: "https://fir-firth-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "fir-firth",
    storageBucket: "fir-firth.appspot.com",
    messagingSenderId: "37175814523",
    appId: "1:37175814523:web:46e8288c2b86f40ca235de",
    measurementId: "G-41ZEPWD1SW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import { getDatabase, ref, get, set, child, update, remove }
    from "https://www.gstatic.com/firebasejs/9.6.7/firebase-database.js"

const db = getDatabase()

// REFERENCES
const NameBox = document.querySelector("#NameBox")
const AgeBox = document.querySelector("#AgeBox")
const GenBox = document.querySelector("#GenBox")

const Insbtn = document.querySelector("#Insbtn")
const Selbtn = document.querySelector("#Selbtn")
const Updbtn = document.querySelector("#Updbtn")
const Delbtn = document.querySelector("#Delbtn")


// INSERT
function InsertData() {
    set(ref(db, "TheStudents/" + NameBox.value), {
        NameOfStd: NameBox.value,
        Age: AgeBox.value,
        Gender: GenBox.value
    })
        .then(() => {
            alert("Ma`lumotingiz qo`shildi")
            SelectAllData()
        })
}

Insbtn.addEventListener("click", function () {
    InsertData();
    NameBox.value = ""
    AgeBox.value = ""
    GenBox.value = "Male"
})

const dbRef = ref(db)
const tbody = document.querySelector("tbody")

function SelectAllData() {

    get(child(dbRef, "TheStudents"))
        .then((snapshot) => {
            let students = [];

            snapshot.forEach(element => {
                students.push(element.val())
            });
            renderTable(students)
        })

}

SelectAllData()


function renderTable(students) {
    let index = 1
    tbody.innerHTML = ""

    students.forEach(student => {
        const tr = document.createElement("tr")

        tr.innerHTML = `
            <th scope="row">${index++}</th>
            <td>${student.NameOfStd}</td>
            <td>${student.Age}</td>
            <td>${student.Gender}</td>
        `

        tbody.appendChild(tr)
    });


}