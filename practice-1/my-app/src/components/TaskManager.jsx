import React, { useState } from "react";

function TaskItem({ task, onDelete }) {
  return (
    <li>
      {task}
      <button onClick={onDelete} style={{ marginLeft: "10px" }}>
        Delete
      </button>
    </li>
  );
}

export default function TaskManager() {
  const [tasks, setTasks] = useState(["Learn React", "Build Project"]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
    <div>
      <h2>Task Manager</h2>

      <input
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add new task"
      />
      <button onClick={addTask}>Add</button>

      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <ul>
          {tasks.map((task, index) => (
            <TaskItem
              key={index}
              task={task}
              onDelete={() => deleteTask(index)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
