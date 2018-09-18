// Initialize
document.getElementById("todoForm").addEventListener("submit", saveTodo);
document.getElementById("todoResults").addEventListener("click", deleteTodo);
fetchTodos();

// Save Todo
function saveTodo(name) {
  // Get form value
  var todoName = document.getElementById("todoInput").value;
  var todoTime = document.getElementById("timeInput").value;

  var todo = {
    name: todoName,
    time: todoTime
  };

  // Test if todos is null
  if (localStorage.getItem("todos") === null) {
    // Init Array
    var todos = [];
    // Add to array
    todos.push(todo);
    // Set to LocalStorage
    localStorage.setItem("todos", JSON.stringify(todos));
  } else {
    // Get bookmarks from LocalStorage
    var todos = JSON.parse(localStorage.getItem("todos"));
    // Add bookmark to array
    var i = 0;
    // Find position to add
    while (todos[i] !== undefined && todos[i].time < todoTime) {
      i++;
    }
    todos.splice(i, 0, todo);
    // Re-set back to LocalStorage
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  // Re-fetch todos
  fetchTodos();

  // Prevent form from submitting
  name.preventDefault();
}

// Delete Todo
function deleteTodo(e) {
  // Make sure delete button clicked
  if (!e.target.classList.contains("delete")) {
    return false;
  }
  var li = e.target.parentElement;
  // Get todos from LocalStorage
  var todos = JSON.parse(localStorage.getItem("todos"));

  // Loop through todos
  for (var i = 0; i < todos.length; i++) {
    // "delete" is added because we are using Materialize
    if (
      todos[i].name + " " + todos[i].time + "delete" ===
      li.parentElement.innerText
    ) {
      todos.splice(i, 1);
    } else {
      console.log(li.parentElement.innerText);
      console.log(todos[i].name + " " + todos[i].time + "delete");
    }
  }
  // Reset back to LocalStorage
  localStorage.setItem("todos", JSON.stringify(todos));
  // Re-fetch todos
  fetchTodos();
}

// Fetch Todos
function fetchTodos() {
  var todos = JSON.parse(localStorage.getItem("todos"));
  // Verify todos exist
  if (todos === null) {
    return false;
  }
  // Get ouput id
  todoResults.innerHTML = "";

  for (var i = 0; i < todos.length; i++) {
    var name = todos[i].name;
    var time = todos[i].time;

    todoResults.innerHTML +=
      '<li class="collection-item">' +
      '<span class="name">' +
      name +
      "</span>" +
      " " +
      '<span class="time">' +
      time +
      "</span>" +
      '<a href="#!" class="secondary-content delete"><i class="material-icons delete">delete</i></a></li>';
  }
}
