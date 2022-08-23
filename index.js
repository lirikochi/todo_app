const addTaskBtn = document.getElementById('addtask__button');
const taskInput = document.getElementById('todo__description');
const todoList = document.querySelector('.todo__list');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'))

let todoItemELems = [];

function Task(description) {
    this.description = description;
    this.completed = false;

}

const createTemplate = (task, index) => {
    return `
    <div class="todo__list-item ${task.completed ? 'checked' : ''}">
                <div class="description">${task.description}</div>
                <div class="buttons">
                    <input onclick = "completeTask (${index})" type="checkbox" class="btn__complete" ${task.completed ? 'checked' : ''}>
                    <button onclick = "deleteTask (${index})"class="btn__delete">Delete</button>
                </div>
            </div>
    `
}

const taskTemplate = () => {
    todoList.innerHTML = "";
    if (tasks.length > 0) {
        tasks.forEach((item, index) => {
            todoList.innerHTML += createTemplate(item, index);
        });
        todoItemELems = document.querySelectorAll ('.todo__list-item');
    }
}

taskTemplate ();

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const completeTask = index => {
    tasks[index].completed = ! tasks[index].completed;  
    if (tasks[index].completed) {
        todoItemELems [index].classlist.add ('checked');
    } else {
        todoItemELems [index].classlist.remove ('checked');
    }
    updateLocal ();
    taskTemplate ();
}

addTaskBtn.addEventListener('click', () => {
    tasks.push(new Task(taskInput.value));
    updateLocal();
    taskTemplate ();
    taskInput.value = '';
})

const deleteTask = index => {
    setTimeout(() => {
    tasks.splice(index, 1);
    updateLocal();
    taskTemplate ();
    },500)
}
