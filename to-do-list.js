document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("new-task");
    const taskList = document.getElementById("task-list");
    const addTaskBtn = document.getElementById("add-task-btn");

    loadTasks();

    function createTaskElement(taskText, completed = false) {
        const newTask = document.createElement("li");
        newTask.textContent = taskText;

        const completeBtn = document.createElement("button");
        completeBtn.innerHTML = "&#10003;";  
        completeBtn.classList.add("complete-btn");
        completeBtn.addEventListener("click", function() {
            newTask.classList.toggle("completed");
            saveTasks();
        });

        const editBtn = document.createElement("button");
        editBtn.innerHTML = "&#9998;"; 
        editBtn.classList.add("edit-btn");
        editBtn.addEventListener("click", function() {
            const newText = prompt("Edit Task:", taskText);
            if (newText) {
                newTask.firstChild.textContent = newText;
                saveTasks();
            }
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "&times;"; 
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", function() {
            taskList.removeChild(newTask);
            saveTasks();
        });

        newTask.appendChild(completeBtn);
        newTask.appendChild(editBtn);
        newTask.appendChild(deleteBtn);
        
        if (completed) newTask.classList.add("completed");
        taskList.appendChild(newTask);
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            createTaskElement(taskText);
            saveTasks();
            taskInput.value = "";
        }
    }

    addTaskBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            addTask();
        }
    });

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll("li").forEach(task => {
            tasks.push({
                text: task.firstChild.textContent,
                completed: task.classList.contains("completed")
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            JSON.parse(savedTasks).forEach(task => {
                createTaskElement(task.text, task.completed);
            });
        }
    }
});
