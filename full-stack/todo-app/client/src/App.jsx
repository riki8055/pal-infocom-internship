app.js;

import React, { useEffect, useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const API = "http://localhost:5000/notes";

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);

  const addNote = async () => {
    if (!title || !content) return;

    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    const newNote = await res.json();
    setNotes([...notes, newNote]);
    setTitle("");
    setContent("");
  };

  const deleteNote = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    setNotes(notes.filter((n) => n.id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Notes App</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <br />
      <button onClick={addNote}>Add Note</button>

      <hr />

      {notes.map((note) => (
        <div
          key={note.id}
          style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
        >
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <button onClick={() => deleteNote(note.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
