const inputText = document.getElementById("inputArea")
const submitButton = document.querySelector(".addButton");
const toDoList = document.getElementById("todo-list");
const toDoItem = document.getElementsByClassName("item");
const toDos = ["call harry", "cook food"];

const addItem = (e) => {
    // change form's default behaviour
    e.preventDefault();
    // checking if input is empty or not
    if (inputText.value != ""){
        // creating element
        const newItem = document.createElement('li');
        // adding class
        newItem.classList.add('item');
        // adding value
        newItem.innerText = inputText.value;
        // clearing input area
        inputText.value = '';
        // adding event listener for rermoving todo item
        newItem.addEventListener('click', (e) => {
            // for preventing event bubble
            e.stopPropagation();
            // removing todo
            e.target.remove();
        })
        // adding todo to list  
        toDoList.appendChild(newItem);
    } 
}

submitButton.addEventListener('click', addItem);

// Using Local Storage
console.log(toDos);

localStorage.setItem("todos", JSON.stringify(toDos));

const retrieveData = JSON.parse(localStorage.getItem("todos"));

console.log(retrieveData);