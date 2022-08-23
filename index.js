const addTaskBtn = document.getElementById('addtask__button');
const taskInput = document.getElementById('todo__description');
const todoList = document.querySelector('.todo__list');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'))

function Task(description) {
    this.description = description;
    this.completed = false;

}

const createTemplate = (task, index) => {
    return `
    <div class="todo__list-item ${task.completed ? 'checked' : ''}">
                <div class="description">${task.description}</div>
                <div class="buttons">
                    <input type="checkbox" class="btn__complete" ${task.completed ? 'checked' : ''}>
                    <button class="btn__delete">Delete</button>
                </div>
            </div>
    `
}

const taskTemplate = () => {
    todoList.innerHTML = "";
    if (tasks.length > 0) {
        tasks.forEach((item, index) => {
            todoList.innerHTML += createTemplate(item, index);
        })
    }
}

taskTemplate ();

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

addTaskBtn.addEventListener('click', () => {
    tasks.push(new Task(taskInput.value));
    updateLocal();
    taskTemplate ();
})
