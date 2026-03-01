import TodoFormInput from "./TodoFormInput";
import Button from "../UI/Button";

export default function TodoForm({ todo, onInputChange, onSubmit }) {
  console.log("- TodoForm rendered");

  return (
    <form id="form" onSubmit={onSubmit}>
      <TodoFormInput
        label="Add a ToDo"
        type="text"
        id="todoInput"
        name="todoInput"
        className="form-label"
        value={todo.todoInput}
        onChange={onInputChange}
      />
      <TodoFormInput
        label="Make it priority"
        type="checkbox"
        id="todoPriority"
        name="todoPriority"
        checked={!!todo.todoPriority}
        onChange={onInputChange}
      />
      <Button type="submit" variant="success" id="submitBtn">
        Add ToDo
      </Button>
    </form>
  );
}
