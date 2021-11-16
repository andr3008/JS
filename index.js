const buttonRef = document.querySelector(".addBtn");
const inputRef = document.getElementById("myInput");

const ulRef = document.getElementById("myUL");

let tasks = [];
!localStorage.tasks
	? (tasks = [])
	: (tasks = JSON.parse(localStorage.getItem("tasks")));

let todoItemElems = [];

function Task(description) {
	this.description = description;
	this.completed = false;
}
const createTemplate = (task, index) => {
	return `<li  class='todo-item ${task.completed ? "checked" : ""}'>
				<div onclick='completeTask(${index})'>${task.description}</div>
				<span onclick='deleteTask(${index})'class='close'>\u00D7</span>
				</li>`;
};

const fillHtmlList = () => {
	ulRef.innerHTML = "";
	if (tasks.length > 0) {
		tasks.forEach((item, index) => {
			ulRef.innerHTML += createTemplate(item, index);
		});
		todoItemElems = document.querySelectorAll(".todo-item");
	}
};
fillHtmlList();

const updateLocal = () => {
	localStorage.setItem("tasks", JSON.stringify(tasks));
};
const completeTask = (index) => {
	tasks[index].completed = !tasks[index].completed;
	if (tasks[index].completed) {
		todoItemElems[index].classList.add("checked");
	} else {
		todoItemElems[index].classList.remove("checked");
	}
	updateLocal();
	fillHtmlList();
};
buttonRef.addEventListener("click", () => {
	tasks.push(new Task(inputRef.value));
	updateLocal();
	fillHtmlList();
	inputRef.value = "";
});
const deleteTask = (index) => {
	tasks.splice(index, 1);
	updateLocal();
	fillHtmlList();
};
