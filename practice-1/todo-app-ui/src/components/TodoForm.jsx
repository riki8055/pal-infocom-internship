import { useState } from "react";
import TodoFormInput from "./TodoFormInput";
import Button from "../UI/Button";

export default function TodoForm() {
  console.log("- TodoForm rendered");

  const initialValue = {
    todoInput: "",
    todoPriority: null,
  };

  const [todo, setTodo] = useState(initialValue);

  function handleInputChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    setTodo((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log(todo);

    setTodo(initialValue);
  }

  return (
    <form id="form" onSubmit={handleSubmit}>
      <TodoFormInput
        label="Add a ToDo"
        type="text"
        id="todoInput"
        name="todoInput"
        className="form-label"
        value={todo.todoInput}
        onChange={handleInputChange}
      />
      <TodoFormInput
        label="Make it priority"
        type="checkbox"
        id="todoPriority"
        name="todoPriority"
        checked={!!todo.todoPriority}
        onChange={handleInputChange}
      />
      <Button type="submit" variant="success" id="submitBtn">
        Add ToDo
      </Button>
    </form>
  );
}
