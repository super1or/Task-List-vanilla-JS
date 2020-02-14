// Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event Listeners
loadEventListeners();

// Load all event Listeners
function loadEventListeners() {
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTasks);
    // Filter Tasks
    filter.addEventListener('keyup', filterTasks);
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
}

// Add task 
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
    }

    // Create Li element
    const li = document.createElement('li');

    // Add class
    li.className = 'collection-item'

    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    // Create new link element
    const link = document.createElement('a');

    // Add class
    link.className = 'delete-item secondary-content';

    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"</i>';

    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

    // Store in local storage
    storeTasksInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = '';

    e.preventDefault();
}

// Remove task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure you?')) {
            e.target.parentElement.parentElement.remove();

            // Remove from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Clear Tasks
function clearTasks() {
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // Clear Tasks from local storage
    clearTasksFromLocalStorage();
}

// Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
        task.style.display = 'block';
    } else {
        task.style.display = 'none';
    }
  });
}

// Store Tasks

function storeTasksInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get tasks from local storage

function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        // Create Li element
        const li = document.createElement('li');

        // Add class
        li.className = 'collection-item'

        // Create text node and append to li
        li.appendChild(document.createTextNode(task));

        // Create new link element
        const link = document.createElement('a');

        // Add class
        link.className = 'delete-item secondary-content';

        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"</i>';

        // Append the link to li
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li);

    });
}

// Remove from loval storage

function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks from local storage
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

getElementById()