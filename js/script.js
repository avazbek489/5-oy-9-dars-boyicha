const form = document.querySelector(`#form`);
const field = document.querySelector(`#field`);
const todoWrapper = document.querySelector(`#togos-items`);
const clearAllButton = document.querySelector(`#clear-all`);

function saveToLocalStorage(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadFromLocalStorage() {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
}

function renderTodos() {
  todoWrapper.innerHTML = "";
  const todos = loadFromLocalStorage();
  todos.forEach((todo) => {
    const card = createCard(todo);
    todoWrapper.innerHTML += card;
  });
}

function validate(field) {
  if (field.value.length < 4) {
    alert("ToDo eng kamida 4ta belgidan iborat bo'lishi shart");
    field.focus();
    return false;
  }
  return true;
}

function createCard(data) {
  return `
    <div class="todo-item" data-id="${data.id}">
        <p>${data.name}</p>
        <span onclick="deleteTodo(${data.id})">delete</span>
    </div>
  `;
}

function addTodo() {
  const isValid = validate(field);
  if (!isValid) {
    return;
  }

  const todo = {
    id: Date.now(),
    name: field.value,
  };

  const todos = loadFromLocalStorage();
  todos.push(todo);
  saveToLocalStorage(todos);

  const card = createCard(todo);
  todoWrapper.innerHTML += card;
  field.value = "";
}

function deleteTodo(id) {
  if (confirm("Aniq shu todo ni ochirmoqchimisiz. Keyin uni qaytara olmaysiz")) {
    const todos = loadFromLocalStorage();
    const update = todos.filter((todo) => todo.id !== id);
    saveToLocalStorage(update);
    renderTodos();
  }
}

function clear() {
  if (
    confirm(
      "Aniq barcha todo larni ochirip tashlamoqchimisiz. Keyin ularni qaytara olmaysiz"
    )
  ) {
    localStorage.removeItem("todos");
    renderTodos();
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  addTodo();
});

clearAllButton.addEventListener("click", clear);

window.addEventListener("load", renderTodos);
