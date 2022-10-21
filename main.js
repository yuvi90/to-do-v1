// Selectors
const addButton = document.querySelector(".todo-add-btn");
const toDoList = document.getElementById("todo-list");

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodosData);
addButton.addEventListener('click', addTodo);
toDoList.addEventListener('click', checknRemove);

// Functions
function getTodosData() {
    let toDos = [];
    // Check local storage is empty ??
    if (localStorage.getItem('todos') != null) {
        toDos = JSON.parse(localStorage.getItem('todos'));
        toDos.forEach((item, index) => {
            // creating todo
            const newTodo = document.createElement('li');
            newTodo.classList.add('todo');
            newTodo.innerText = `${item}`;
            // creating completed button
            const completed = document.createElement('button');
            completed.classList.add('completed-btn');
            completed.innerHTML = '<i class="fa-solid fa-check"></i>';
            newTodo.appendChild(completed);
            // creating trash button
            const trash = document.createElement('button');
            trash.classList.add('trash-btn');
            trash.innerHTML = '<i class="fa-solid fa-trash"></i>';
            newTodo.appendChild(trash);
            // appending todo to list
            toDoList.appendChild(newTodo);
        });
    }
}

function addTodo(event) {
    // change form's default behaviour
    event.preventDefault();
    const input = document.querySelector(".todo-input");
    // checking if input is empty or not
    if (input.value != '') {
        // adding value to todos array storage
        saveTodosData(input.value);
        // creating todo
        const newTodo = document.createElement('li');
        newTodo.classList.add('todo');
        newTodo.innerText = `${input.value}`;
        // Div.appendChild(newTodo);
        // creating completed button
        const completed = document.createElement('button');
        completed.classList.add('completed-btn');
        completed.innerHTML = '<i class="fa-solid fa-check"></i>';
        newTodo.appendChild(completed);
        // creating trash button
        const trash = document.createElement('button');
        trash.classList.add('trash-btn');
        trash.innerHTML = '<i class="fa-solid fa-trash"></i>';
        newTodo.appendChild(trash);
        // appending todo to list
        toDoList.appendChild(newTodo);
        // clearing input field
        input.value = '';
    }
}

function checknRemove(event) {
    const item = event.target;

    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        removeTodosData(todo);
        // Animation
        todo.classList.add('remove-todo');
        todo.addEventListener('transitionend', () => {
            todo.remove();
        })
    }
    
    if (item.classList[0] === 'completed-btn') {
        const todo = item.parentElement;        
        todo.classList.toggle('checked');
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