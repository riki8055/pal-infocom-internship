import { useState } from "react";

import TodoFormInput from "./TodoFormInput";
import Button from "../UI/Button";

export default function TodoForm() {
  console.log("- TodoForm rendered");

  const [todo, setTodo] = useState({
    todoInput: "",
    todoPriority: null,
  });

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
  }

  return (
    <form id="form" onSubmit={handleSubmit}>
      <TodoFormInput
        label="Add a ToDo"
        type="text"
        id="todoInput"
        name="todoInput"
        className="form-label"
        onChange={handleInputChange}
      />
      <TodoFormInput
        label="Make it priority"
        type="checkbox"
        id="todoPriority"
        name="todoPriority"
        onChange={handleInputChange}
      />
      <Button type="submit" variant="success" id="submitBtn">
        Add ToDo
      </Button>
    </form>
  );
}
