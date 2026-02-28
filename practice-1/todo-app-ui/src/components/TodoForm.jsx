import TodoFormInput from "./TodoFormInput";

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
      <button type="submit" className="btn btn-success" id="submitBtn">
        Add ToDo
      </button>
    </form>
  );
}
