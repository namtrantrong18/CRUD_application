// var selectedRow = null;

// // Show Alert
// function showAlert(message, className) {
//     const div = document.createElement('div');
//     div.className = 'alert alert-$(className)';

//     div.appendChild(document.createTextNode(message));
//     const container = document.querySelector(".container");
//     const main = document.querySelector(".main");
//     container.insertBefore(div, main);

//     setTimeout(() => document.querySelector(".alert").remove(), 3000);
// }

var studentApi = " http://localhost:3000/student"

function start() {
    getStudents(renderStudents)
    handleCreateStudent()
}

start();

function getStudents(callback) {
    fetch(studentApi)
        .then(response => response.json())
        .then(callback)
}

function creatStudent(data, callback) {
    var options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    }
    fetch(studentApi, options)
        .then(response => response.json())
        .then(callback)
}

function updateStudent(id, data, callback) {
    var options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    }
    fetch(studentApi + '/' +id, options)
        .then(response => response.json())
        .then(callback)
}

function handleDeleteStudent(id) {
    var options = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        }
    }
    fetch(studentApi + '/' + id, options) 
        .then(response => response)
        .then(function() {
            var studentItem = document.querySelector('.student-item-' + id)
            if(studentItem) {
                studentItem.remove()
            }
        })
}

function renderStudents(students) {
    var listStudents = document.querySelector('.student-list')
    var htmls = students.map(student =>
        `<tr class="student-item-${student.id}">
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.age}</td>
            <td>${student.gender}</td>
            <td>
                <a onclick="handleUpdateStudent(${student.id})" class="btn btn-warning btn-sm edit">Edit</a>
                <a onclick="handleDeleteStudent(${student.id})" class="btn btn-danger btn-sm delete">Delete</a>
            </td>
        </tr>`
    )
    listStudents.innerHTML = htmls.join('')
}

function handleCreateStudent() {
    var submitBtn = document.querySelector('.add-btn')
    submitBtn.onclick = function() {
        var name = document.querySelector('input[id="name"]').value
        var email = document.querySelector('input[id="email"]').value
        var age = document.querySelector('input[id="age"]').value
        var gender = document.querySelector('input[id="gender"]').value
        
        var formData = {
            name : name,
            email : email,
            age : age,
            gender : gender
        }
    
        creatStudent(formData, function() {
            getStudents(renderStudents)
        })
    }
}

function handleUpdateStudent(id) {
    var submitBtn = document.querySelector('.add-btn')
    var studentItem = document.querySelector('.student-item-' + id)


    var nameItem = studentItem.children[0].textContent;
    var emailItem = studentItem.children[1].textContent;
    var ageItem = studentItem.children[2].textContent;
    var genderItem = studentItem.children[3].textContent;
    
    var name = document.querySelector('input[id="name"]')
    var email = document.querySelector('input[id="email"]')
    var age = document.querySelector('input[id="age"]')
    var gender = document.querySelector('input[id="gender"]')
    console.log(name)


    name.value = nameItem
    console.log(name)
    email.value = emailItem
    age.value = ageItem
    gender.value = genderItem

    submitBtn.onclick = function() {
        var formData = {
            name : name.value,
            email : email.value,
            age : age.value,
            gender : gender.value
        }
        updateStudent(id, formData, function() {
            getStudents(renderStudents)
        })
    }
}   