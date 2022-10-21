// Selectors
const input = document.querySelector(".todo-input");
const addButton = document.querySelector(".todo-add-btn");
const toDoList = document.getElementById("todo-list");
const toDo = document.getElementsByClassName("todo");

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodosData);
addButton.addEventListener('click', addTodo);
toDoList.addEventListener('click', checkRemove);

// Functions
function getTodosData() {
    let toDos = [];
    // Check local storage is empty ??
    if (localStorage.getItem('todos') != null) {
        toDos = JSON.parse(localStorage.getItem('todos'));
        toDos.forEach(element => {
            const newTodo = document.createElement('li');
            newTodo.classList.add('todo');
            newTodo.innerHTML = `${element}<i class="fa-solid fa-trash trash-icon"></i>`;
            toDoList.appendChild(newTodo);
        });
    } else {
        console.log('No Todos');
    }
}

function addTodo(event) {
    // change form's default behaviour
    event.preventDefault();
    // checking if input is empty or not
    if (input.value != '') {
        // adding to todos array
        saveTodosData(input.value);
        // creating element
        const newTodo = document.createElement('li');
        // adding class
        newTodo.classList.add('todo');
        // adding content
        newTodo.innerHTML = `${input.value}<i class="fa-solid fa-trash trash-icon"></i>`
        // clearing input field
        input.value = '';
        // appending to list
        toDoList.appendChild(newTodo);
    }
}

function checkRemove(event) {
    const item = event.target;
    if (item.classList[2] === 'trash-icon') {
        const todo = item.parentElement;
        removeTodosData(todo);
        // Animation
        todo.classList.add('remove-todo');
        todo.addEventListener('transitionend', () => {
            todo.remove();
        })
    }
}

function saveTodosData(todo) {
    let toDos = [];
    // Check local storage is empty ??
    if (localStorage.getItem('todos') != null) {
        toDos = JSON.parse(localStorage.getItem('todos'));
        toDos.push(todo);
        localStorage.setItem('todos', JSON.stringify(toDos));
    } else {
        toDos.push(todo);
        localStorage.setItem('todos', JSON.stringify(toDos));
    }
}

function removeTodosData(todo) {
    let toDos = [];
    // Check local storage is empty ??
    if (localStorage.getItem('todos') != null) {
        toDos = JSON.parse(localStorage.getItem('todos'));
        const index = toDos.indexOf(todo.innerText);
        toDos.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(toDos));
    }
}