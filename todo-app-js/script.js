const todoList = document.getElementById("todoList");
const form = document.getElementById("form");
const todoInput = document.getElementById("todoInput");
const todoPriority = document.getElementById("todoPriority");
const submitBtn = document.getElementById("submitBtn");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");
const clearAllBtn = document.getElementById("clearAllBtn");
const removePriorityBtn = document.getElementById("removePriorityBtn");
const popOutBtn = document.getElementById("popOutBtn");
const clearRangeBtn = document.getElementById("clearRangeBtn");

submitBtn.disabled = true;

let todosArray = [];

if (todosArray.length === 0) {
  clearCompletedBtn.disabled = true;
  clearAllBtn.disabled = true;
  removePriorityBtn.disabled = true;
  popOutBtn.disabled = true;
  clearRangeBtn.disabled = true;
}

const todoCompleted = (idx) => {
  todosArray[idx].completed = true;
  clearCompletedBtn.disabled = false;
};

const displayTodos = (todos) => {
  if (todosArray.length === 0) {
    todoList.innerHTML = `
      <span class="my-1 ms-2">No ToDos!</span>
    `;
    return;
  }
  todoList.innerHTML = "";
  todos.forEach((todo, idx) => {
    const td = document.createElement("li");
    td.classList.add("list-group-item");
    td.textContent = todo.todo;
    td.addEventListener("click", () => {
      td.classList.add("completed");
      todoCompleted(idx);
    });
    todoList.appendChild(td);
  });

  if (todosArray.length > 1) {
    removePriorityBtn.disabled = false;
    popOutBtn.disabled = false;
    clearRangeBtn.disabled = false;
  } else {
    removePriorityBtn.disabled = true;
    popOutBtn.disabled = true;
    clearRangeBtn.disabled = true;
  }
};

const addToDo = (todo, isPriority) => {
  if (!isPriority) {
    todosArray.push({
      todo,
      completed: false,
    });
  } else {
    todosArray.unshift({
      todo,
      completed: false,
    });
  }

  todoInput.value = "";
  todoPriority.checked = false;
  submitBtn.disabled = true;
  clearAllBtn.disabled = false;

  displayTodos(todosArray);
};

const removePriority = () => {
  if (todosArray.length < 2) {
    return;
  }
  todosArray.shift();
  displayTodos(todosArray);
};

const popToDo = () => {
  if (todosArray.length < 2) {
    return;
  }

  todosArray.pop();

  displayTodos(todosArray);
};

const clearToDoRange = () => {
  const rangeStart = parseInt(prompt("Enter start range"));
  const deleteCount = parseInt(prompt("Enter count"));

  if (rangeStart > todosArray.length - 1 || deleteCount > todosArray.length) {
    console.log("Nothing will be happen!");
    return;
  }

  todosArray.splice(rangeStart, deleteCount);

  displayTodos(todosArray);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const todo = document.getElementById("todoInput").value;

  let isPriority = todoPriority.checked ? true : false;

  addToDo(todo, isPriority);
});

todoInput.addEventListener("keyup", (e) => {
  if (e.target.value.length === 0) {
    submitBtn.disabled = true;
  } else {
    submitBtn.disabled = false;
  }
});

clearCompletedBtn.addEventListener("click", () => {
  for (let i = todosArray.length - 1; i >= 0; i--) {
    if (todosArray[i].completed) {
      todosArray.splice(i, 1);
    }
  }

  clearCompletedBtn.disabled = true;
  if (todosArray.length === 0) {
    clearAllBtn.disabled = true;
  }
  displayTodos(todosArray);
});

clearAllBtn.addEventListener("click", () => {
  todosArray = [];

  clearAllBtn.disabled = true;
  displayTodos(todosArray);
});

removePriorityBtn.addEventListener("click", removePriority);

popOutBtn.addEventListener("click", popToDo);

clearRangeBtn.addEventListener("click", clearToDoRange);

displayTodos();
