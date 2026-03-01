export default function Todos({ todos }) {
  console.log("- Todos rendered");

  return (
    <ul class="list-group list-group-flush" id="todoList">
      {todos.map((todo, index) => (
        <li key={index}>{todo.todoInput}</li>
      ))}
    </ul>
  );
}
