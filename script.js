let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(){

    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    
    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        const taskText = document.createElement("span");
        taskText.textContent = task.text;

        if(task.completed){
            li.classList.add("completed");
        }

        taskText.onclick = () => toggleTask(index);

        const buttonGroup = document.createElement("div");
        buttonGroup.classList.add("button-group");

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn");

        editBtn.onclick = (e) => {
            e.stopPropagation();

            let updatedTask = prompt("Edit your task", task.text);

            if(updatedTask !== null && updatedTask.trim() !== ""){
                tasks[index].text = updatedTask.trim();
                saveTasks();
                renderTasks();
            }
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            deleteTask(index);
        };

        buttonGroup.appendChild(editBtn);
        buttonGroup.appendChild(deleteBtn);

        li.appendChild(taskText);
        li.appendChild(buttonGroup);

        taskList.appendChild(li);
    });
}

function addTask(){

    const taskInput = document.getElementById("taskInput");

    const taskText = taskInput.value.trim();

    if(taskText === ""){
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    saveTasks();
    renderTasks();

    taskInput.value = "";
}

function toggleTask(index){

    tasks[index].completed = !tasks[index].completed;

    saveTasks();
    renderTasks();
}

function deleteTask(index){

    tasks.splice(index, 1);

    saveTasks();
    renderTasks();
}

renderTasks();