// Initialize
document.getElementById("todoForm").addEventListener("submit", saveTodo);
document.getElementById("todoResults").addEventListener("click", changeTodo);
fetchTodos();

// Save Todo
function saveTodo(name) {
  // Get form value
  var todoName = document.getElementById("todoInput").value;
  var todoTime = document.getElementById("timeInput").value;

  // Form validation
  if (!validateForm(todoName, todoTime)) {
    return false;
  }
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

// Change Todo
// Either Strikethrough or Delete Todo
// based on where the user clicked.
function changeTodo(e) {
  if (e.target.classList.contains("material-icons")) {
    deleteTodo(e);
  } else {
    strikethroughTodo(e);
  }
}

// Delete Todo
function deleteTodo(e) {
  var li = e.target.parentElement;
  // Get todos from LocalStorage
  var todos = JSON.parse(localStorage.getItem("todos"));
  // Loop through todos
  for (var i = 0; i < todos.length; i++) {
    // "delete" is added because we are using Materialize
    if (
      todos[i].name + " " + todos[i].time + "delete" ===
      li.parentElement.textContent
    ) {
      todos.splice(i, 1);
    }
  }
  // Reset back to LocalStorage
  localStorage.setItem("todos", JSON.stringify(todos));
  // Re-fetch todos
  fetchTodos();
}

function strikethroughTodo(e) {
  e.target.classList.toggle("completed");
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
      //'<span class="name">' +
      name +
      //"</span>" +
      " " +
      //'<span class="time">' +
      time +
      //"</span>" +
      '<a href="#!" class="secondary-content"><i class="material-icons">delete</i></a></li>';
  }
}

// Validate Form
function validateForm(name, time) {
  if (!name || !time) {
    alert("Please fill in the form");
    return false;
  }
  return true;
}
