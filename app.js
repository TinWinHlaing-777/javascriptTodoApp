class UI {
  static showTodos() {
    const todos = Store.getTodos();

    todos.forEach((todo) => UI.addTodoList(todo));
  }

  static addTodoList(todo) {
    const list = document.querySelector("#details");
    const sublist = document.createElement("li");
    sublist.disabled = true;
    sublist.classList.add("list-group-item", "d-flex", "align-items-center");
    sublist.innerHTML = `
            <input type="checkbox" class="completeTasks">
            <span class="ms-5">${todo}</span>
            <i class="fas fa-trash ms-auto btn btn-danger delete"></i>
        `;

    list.appendChild(sublist);
  }

  static deleteList(list) {
    if (list.classList.contains("delete")) {
      list.parentElement.remove();
    }
  }

  static updateList(list) {
    if (list.classList.contains("completeTasks")) {
      list.parentElement.classList.toggle("completed");
    }
  }

  static clearField() {
    document.querySelector("#inputText").value = "";
  }
}

class Store {
  static getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
  }

  static saveTodos(todo) {
    const todos = Store.getTodos();
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  static deleteTodo(todo) {
    const todos = Store.getTodos();
    const todosIndex = todo.parentElement.children[1].innerText;
    todos.splice(todos.indexOf(todosIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  static checkList(todo, tasks) {
    const todos = Store.getTodos();
    if (tasks.disabled === true) {
      tasks.disabled = !tasks.disabled;
    } else {
      tasks.disabled = !tasks.disabled;
      let todoIndex = todos.indexOf(todo);
      todos[todoIndex] = tasks.value;
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }
}

document.addEventListener("DOMContentLoaded", UI.showTodos());

document.querySelector("#todo-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const tasks = document.querySelector("#inputText").value;
  UI.addTodoList(tasks);
  Store.saveTodos(tasks);
  UI.clearField();
});

document.querySelector(".list-group").addEventListener("click", (e) => {
  const tasks = document.querySelector("#inputText").value;
  UI.deleteList(e.target);
  Store.deleteTodo(e.target);
  UI.updateList(e.target);
  Store.checkList(tasks, e.target);
});
