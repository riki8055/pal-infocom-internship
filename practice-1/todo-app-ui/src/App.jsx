import "./App.css";
import { useState } from "react";

import TodoForm from "./components/TodoForm";
import Button from "./UI/Button";
import DropDownBtns from "./components/DropDownBtns";
import Todos from "./components/Todos";

function App() {
  console.log("App rendered");

  const initialFormValue = {
    todoInput: "",
    todoPriority: false,
    completed: false,
  };

  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState(initialFormValue);

  function handleClearCompleted() {
    setTodos((prev) => prev.filter((t) => !t.completed));
  }

  function handleClearAll() {
    setTodos([]);
  }

  function handleRemovePriority() {
    setTodos((prev) => prev.filter((t) => !t.todoPriority));
  }

  function handleTodoClick(index) {
    setTodos((prev) =>
      prev.map((t, i) => (i === index ? { ...t, completed: !t.completed } : t)),
    );
  }

  function handleInputChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log(formData);

    setTodos((prev) => {
      if (formData.todoPriority) {
        return [formData, ...prev];
      }
      return [...prev, formData];
    });
    setFormData(initialFormValue);
  }

  return (
    <div className="container">
      <div class="card my-3">
        <div class="card-body">
          <TodoForm
            todo={formData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
          />
        </div>
        <Todos todos={todos} onClickTodo={handleTodoClick} />
        <div class="card-body">
          <div class="info"></div>
          <div class="btns d-flex">
            <Button
              type="button"
              className="me-2"
              variant="secondary"
              id="clearCompletedBtn"
              onClick={handleClearCompleted}
            >
              Clear Completed
            </Button>

            <Button
              type="button"
              className="me-2"
              variant="danger"
              id="clearAllBtn"
              onClick={handleClearAll}
            >
              Clear All
            </Button>

            <div class="dropdown">
              <Button
                type="button"
                className="dropdown-toggle"
                variant="secondary"
                id="clearCompletedBtn"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                More Actions
              </Button>
              <DropDownBtns
                todos={todos}
                onRemovePriority={handleRemovePriority}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
