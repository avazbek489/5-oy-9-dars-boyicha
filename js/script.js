const form = document.querySelector(`#form`);
const field = document.querySelector(`#field`);
const todoWrapper = document.querySelector(`#togos-items`);
const clear = document.querySelector(`#clear-all`);

function save(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function load() {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
}

function ToDos() {
  todoWrapper.innerHTML = "";
  const todos = load();
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

  const todos = load();
  todos.push(todo);
  save(todos);

  const card = createCard(todo);
  todoWrapper.innerHTML += card;
  field.value = "";
}

function deleteTodo(id) {
  if (
    confirm("Aniq shu todo ni ochirmoqchimisiz. Keyin uni qaytara olmaysiz")
  ) {
    const todos = load();
    const update = todos.filter((todo) => todo.id !== id);
    save(update);
    ToDos();
  }
}

function clear() {
  if (
    confirm(
      "Aniq barcha todo larni ochirip tashlamoqchimisiz. Keyin ularni qaytara olmaysiz"
    )
  ) {
    localStorage.removeItem("todos");
    ToDos();
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  addTodo();
});

clear.addEventListener("click", clear);

window.addEventListener("load", ToDos);
