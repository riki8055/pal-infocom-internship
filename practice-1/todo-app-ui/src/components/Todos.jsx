export default function Todos({ todos }) {
  console.log("- Todos rendered");
  console.log(todos);

  return (
    <ul class="list-group list-group-flush" id="todoList">
      {todos.map((todo, index) => (
        <li key={index}>{todo.todoInput}</li>
      ))}
    </ul>
  );
}
