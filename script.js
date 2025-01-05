/*
// Selecting elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Add Task Function
addTaskButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (!taskText) return alert('Please enter a task!');

  const taskDate = new Date().toLocaleString();
  const taskItem = document.createElement('li');
  taskItem.classList.add('task-item');

  taskItem.innerHTML = `
    <input type="checkbox" class="checkbox">
    <span class="task-name">${taskText}</span>
    <span class="task-date">Assigned: ${taskDate}</span>
    <div class="action-buttons">
      <button class="edit-task">Edit</button>
      <button class="delete-task">Delete</button>
    </div>
  `;

  taskList.appendChild(taskItem);
  taskInput.value = '';

  const checkbox = taskItem.querySelector('.checkbox');
  const taskName = taskItem.querySelector('.task-name');

  // Add a ringtone audio element
  const ringtone = new Audio('Ring.wav');

  // Strike-through on checkbox toggle and play ringtone
  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      taskItem.classList.add('completed');
      ringtone.play(); // Play ringtone when checkbox is checked
    } else {
      taskItem.classList.remove('completed');
    }
  });

  // Handle Edit Task
  const editButton = taskItem.querySelector('.edit-task');
  editButton.addEventListener('click', () => {
    const newTask = prompt('Edit your task:', taskName.textContent);
    if (newTask) taskName.textContent = newTask;
  });

  // Handle Delete Task
  const deleteButton = taskItem.querySelector('.delete-task');
  deleteButton.addEventListener('click', () => {
    taskItem.remove();
  });
});

*/


// Selecting elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach((task) => {
    createTaskItem(task.text, task.date, task.completed);
  });
});

// Add Task Function
addTaskButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (!taskText) return alert('Please enter a task!');

  const taskDate = new Date().toLocaleString();
  createTaskItem(taskText, taskDate, false);
  saveTaskToLocalStorage(taskText, taskDate, false);

  taskInput.value = '';
});

// Function to create a task item
function createTaskItem(taskText, taskDate, isCompleted) {
  const taskItem = document.createElement('li');
  taskItem.classList.add('task-item');
  if (isCompleted) taskItem.classList.add('completed'); // Strike-through if completed

  taskItem.innerHTML = `
    <input type="checkbox" class="checkbox" ${isCompleted ? 'checked' : ''}>
    <span class="task-name">${taskText}</span>
    <span class="task-date">Assigned: ${taskDate}</span>
    <div class="action-buttons">
      <button class="edit-task">Edit</button>
      <button class="delete-task">Delete</button>
    </div>
  `;

  taskList.appendChild(taskItem);

  const checkbox = taskItem.querySelector('.checkbox');
  const taskName = taskItem.querySelector('.task-name');

  // Add a ringtone audio element
  const ringtone = new Audio('Ring.wav');

  // Strike-through on checkbox toggle and play ringtone
  checkbox.addEventListener('change', () => {
    const isChecked = checkbox.checked;
    if (isChecked) {
      taskItem.classList.add('completed');
      ringtone.play(); // Play ringtone when checkbox is checked
    } else {
      taskItem.classList.remove('completed');
    }

    updateTaskStatusInLocalStorage(taskText, isChecked);
  });

  // Handle Edit Task
  const editButton = taskItem.querySelector('.edit-task');
  editButton.addEventListener('click', () => {
    const newTask = prompt('Edit your task:', taskName.textContent);
    if (newTask) {
      const oldTaskText = taskName.textContent;
      taskName.textContent = newTask;
      updateTaskInLocalStorage(oldTaskText, newTask);
    }
  });

  // Handle Delete Task
  const deleteButton = taskItem.querySelector('.delete-task');
  deleteButton.addEventListener('click', () => {
    taskItem.remove();
    removeTaskFromLocalStorage(taskText);
  });
}

// Save task to localStorage
function saveTaskToLocalStorage(taskText, taskDate, isCompleted) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text: taskText, date: taskDate, completed: isCompleted });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update task status in localStorage
function updateTaskStatusInLocalStorage(taskText, isCompleted) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskIndex = tasks.findIndex((task) => task.text === taskText);
  if (taskIndex !== -1) {
    tasks[taskIndex].completed = isCompleted;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

// Update task text in localStorage
function updateTaskInLocalStorage(oldTaskText, newTaskText) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskIndex = tasks.findIndex((task) => task.text === oldTaskText);
  if (taskIndex !== -1) {
    tasks[taskIndex].text = newTaskText;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

// Remove task from localStorage
function removeTaskFromLocalStorage(taskText) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTasks = tasks.filter((task) => task.text !== taskText);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
