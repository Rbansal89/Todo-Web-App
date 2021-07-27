// Get Todos data from the local storage
const getSavedTodos = function () {
  const todosJSON = localStorage.getItem("todos");

  return todosJSON ? JSON.parse(todosJSON) : [];
};

// Save Todos to local Storage
const saveTodos = function (todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Render application Todos based on filters
const renderTodos = function (todos, filters) {
  const filteredTodos = todos.filter(function (todo) {
    const v = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const c = !filters.hideCompleted || !todo.completed;
    return v && c;
  });

  let tasksPending = filteredTodos.filter((todo) => !todo.completed);
  document.querySelector("#todos").innerHTML = "";
  // Show Sumamry
  document
    .querySelector("#todos")
    .appendChild(generateSummaryDOM(tasksPending));

  filteredTodos.forEach(function (todo) {
    document.querySelector("#todos").appendChild(generateTodoDOM(todo));
  });
};

// Removes a Todo from todos
const removeTodo = function (id) {
  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

// makes todo Completed or unCompleted
const toggleTodo = function (id) {
  const todo = todos.find((todo) => todo.id === id);

  if (todo) {
    todo.completed = !todo.completed;
  }
};

// get DOM element for each note
const generateTodoDOM = function (todo) {
  const todoEl = document.createElement("div");
  const checkbox = document.createElement("input");
  const todoText = document.createElement("span");
  const deleteButton = document.createElement("button");

  // Setting checkbox element
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todo.completed;
  todoEl.appendChild(checkbox);
  checkbox.addEventListener("click", function () {
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  // Setting text to span element
  if (todo.text.length > 0) {
    todoText.textContent = todo.text + " ";
  } else {
    todoText.textContent = "Unnamed Todo ";
  }
  todoEl.appendChild(todoText);

  // Setting delete Button
  deleteButton.textContent = "x";
  todoEl.appendChild(deleteButton);
  deleteButton.addEventListener("click", function () {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  return todoEl;
};

// Generate a Summary DOM
const generateSummaryDOM = function (taskPending) {
  const tasksLefth3 = document.createElement("h3");
  tasksLefth3.textContent = `You have ${taskPending.length} todos left`;
  return tasksLefth3;
};
