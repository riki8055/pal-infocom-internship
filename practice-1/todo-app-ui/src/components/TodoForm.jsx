export default function TodoForm() {
  console.log("- TodoForm rendered");

  return (
    <form id="form">
      <div className="mb-3">
        <label htmlFor="todoInput" className="form-label">
          Add a ToDo
        </label>
        <input type="text" id="todoInput" className="form-control" />
      </div>
      <div className="mb-3">
        <input type="checkbox" id="todoPriority" />
        <label htmlFor="todoPriority">Make it priority</label>
      </div>
      <button type="submit" className="btn btn-success" id="submitBtn">
        Add ToDo
      </button>
    </form>
  );
}
