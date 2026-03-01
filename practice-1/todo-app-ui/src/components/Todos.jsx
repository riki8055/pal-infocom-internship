export default function Todos({ todos, onClickTodo }) {
  console.log("- Todos rendered");
  console.log(todos);

  return (
    <ul class="list-group list-group-flush" id="todoList">
      {todos.map((todo, index) => (
        <li
          key={index}
          onClick={() => onClickTodo(index)}
          className={todo.completed ? "completed" : ""}
        >
          {todo.todoInput}
        </li>
      ))}
    </ul>
  );
}
