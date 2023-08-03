// Get the task input, task list, and buttons elements
var taskInput = document.getElementById("taskInput");
var taskList = document.getElementById("taskList");
var addButton = document.getElementById("addButton");
var clearButton = document.getElementById("clearButton");
var updateButton = document.getElementById("updateButton");

// Load tasks from local storage on page load
window.addEventListener("load", function() {
    loadTasks();
});

// Add event listener to the "Add Task" button
addButton.addEventListener("click", function() {
    var taskText = taskInput.value.trim();
    if (taskText !== "") {
        var task = createTaskElement(taskText);
        taskList.appendChild(task);
        taskInput.value = "";

        saveTasks();
    }
});

// Add event listener to the "Clear Tasks" button
clearButton.addEventListener("click", function() {
    taskList.innerHTML = "";
    saveTasks();
});

// Add event listener to the "Update Tasks" button
updateButton.addEventListener("click", function() {
    var tasks = taskList.querySelectorAll("li");
    tasks.forEach(function(task) {
        var checkbox = task.querySelector("input[type='checkbox']");
        var text = task.querySelector("span");

        if (checkbox.checked) {
            task.classList.add("completed");
        } else {
            task.classList.remove("completed");
        }

        text.contentEditable = false;
    });

    saveTasks();
});

// Create a new task element
function createTaskElement(taskText) {
    var task = document.createElement("li");

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", function() {
        if (this.checked) {
            task.classList.add("completed");
        } else {
            task.classList.remove("completed");
        }
    });
    task.appendChild(checkbox);

    var text = document.createElement("span");
    text.innerText = taskText;
    text.contentEditable = true;
    task.appendChild(text);

    return task;
}

// Save tasks to local storage
function saveTasks() {
    var tasks = [];
    var taskItems = taskList.querySelectorAll("li");
    taskItems.forEach(function(task) {
        var taskText = task.querySelector("span").innerText;
        var isCompleted = task.classList.contains("completed");
        tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        tasks.forEach(function(taskData) {
            var task = createTaskElement(taskData.text);
            if (taskData.completed) {
                task.classList.add("completed");
                task.querySelector("input[type='checkbox']").checked = true;
            }
            taskList.appendChild(task);
        });
    }
}
