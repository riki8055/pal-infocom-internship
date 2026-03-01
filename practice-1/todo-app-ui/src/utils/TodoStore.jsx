export function createTodoStore() {
  const todos = [];

  function add(todo) {
    todos.push(todo);
  }

  function getAll() {
    return [...todos];
  }

  return { add, getAll };
}
