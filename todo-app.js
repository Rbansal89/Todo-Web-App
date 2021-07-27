const todos = getSavedTodos();

const filters = {
  searchText: "",
  hideCompleted: false,
};

renderTodos(todos, filters);

// Searching text in Notes
document.querySelector("#search-text").addEventListener("input", function (e) {
  console.log(e.target.value);
  filters.searchText = e.target.value;
  renderTodos(todos, filters);
});

document.querySelector("#new-todo").addEventListener("submit", function (e) {
  e.preventDefault();
  todos.push({
    id: uuidv4(),
    text: e.target.elements.addTodo.value,
    completed: false,
  });
  // clearing input field
  e.target.elements.addTodo.value = "";
  saveTodos(todos);
  renderTodos(todos, filters);
});

document
  .querySelector("#hide-show-completed")
  .addEventListener("change", function (e) {
    filters.hideCompleted = e.target.checked;
    renderTodos(todos, filters);
  });
