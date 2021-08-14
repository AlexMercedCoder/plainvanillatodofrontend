const url = "http://localhost:10000/todos";
const main = document.querySelector("main");
const text = document.querySelector("input[type=text]");
const checkbox = document.querySelector("input[type=checkbox]");

const state = {
  todos: [],
  action: "new",
};

const renderTodos = () => {
  const html = state.todos
    .map(
      (todo) => `<div class="todo">
    <h3 id=${todo._id} completed=${todo.completed} ${
        todo.completed ? "class=checked" : null
      }>${todo.reminder}</h3><button _id=${
        todo._id
      } class="delete">Delete</button>
    </div>`
    )
    .join("");

  main.innerHTML = html;
};

export const getTodos = async () => {
  const response = await fetch(url);
  const data = await response.json();
  state.todos = data;
  renderTodos();
};

export const handleClick = async (event) => {
  if (event.target.localName === "h3") {
    text.value = event.target.innerHTML;
    checkbox.checked = event.target.classList.contains("checked");
    state.action = "edit";
    state.id = event.target.id;
  }
  if (
    event.target.localName === "button" &&
    event.target.classList.contains("delete")
  ) {
    const id = event.target.getAttribute("_id");
    await fetch(url + `/${id}`, {
      method: "delete",
    });
    getTodos();
  }
};

export const handleSubmit = async (event) => {
  event.preventDefault();
  const textVal = text.value;
  const checkVal = checkbox.checked;
  console.log(textVal, checkVal);

  if (state.action === "new") {
    await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reminder: textVal, completed: checkVal }),
    });
    text.value = "";
    checkbox.checked = false;
    getTodos();
  }

  if (state.action === "edit") {
    await fetch(url + `/${state.id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reminder: textVal, completed: checkVal }),
    });
    text.value = "";
    checkbox.checked = false;
    state.action = "new";
    getTodos();
  }
};
