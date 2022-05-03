import './index.css';

const taskInput = document.querySelector(".task-input input");
const taskBox = document.querySelector(".task-box");


function showToodo() {
    let todos = JSON.parse( localStorage.getItem("todo-list"));
    let li = "";
    let isCompleted = todos
    if( todos) {
        todos.forEach((todo, id) => {
            let isCompleted = todos[id].status === "completed" ? "checked": "";
            li += `
            <li class="task">
            <label for="${id}">
                <input class="check-box" type="checkbox" id="${id}" ${isCompleted}>
                <p class="${isCompleted}">${todo.name}</p>
            </label>
            <div class="settings">
            <i class="fa fa-ellipsis-h"></i>
                <ul class="task-menu">
                    <li><i class="uil uil-pen"></i>Edit</li>
                    <li><i class="uil uil-trash"></i>Delete</li>
                </ul>
            </div>
        </li>
            `
        });
    }
    taskBox.innerHTML = li;
}
showToodo();

const chekBox = document.querySelectorAll(".check-box");


function updateStatus(rootElement) {
    let selectedTask = rootElement.path[0];
    let taskName = selectedTask.parentElement.lastElementChild;
    let todos = JSON.parse( localStorage.getItem("todo-list"));
    if(selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed"
       
    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos))
}
chekBox.forEach((element) => {
    element.addEventListener("click", updateStatus);
})

taskInput.addEventListener("keyup", (e)=>{
    let userTask = taskInput.value.trim();
    if(e.key === "Enter" && userTask) {
        let todos = JSON.parse( localStorage.getItem("todo-list"));
        console.log("TODOS", todos);
        if(!todos) {
            todos = [];
        }
        let taskInfo = {name: userTask, status: "pending"};
        todos.push(taskInfo);
        localStorage.setItem("todo-list", JSON.stringify(todos))
        taskInput.value = ""
    }
})