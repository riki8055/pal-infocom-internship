import TodoFormInput from "./TodoFormInput";
import Button from "../UI/Button";

export default function TodoForm() {
  console.log("- TodoForm rendered");

  return (
    <form id="form">
      <TodoFormInput
        label="Add a ToDo"
        type="text"
        id="todoInput"
        className="form-label"
      />
      <TodoFormInput
        label="Make it priority"
        type="checkbox"
        id="todoPriority"
      />
      <Button type="submit" variant="success" id="submitBtn">
        Add ToDo
      </Button>
    </form>
  );
}
