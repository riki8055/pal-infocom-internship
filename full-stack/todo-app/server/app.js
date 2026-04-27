const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const FILE = "./notes.json";

// Read notes
const readNotes = () => {
  return JSON.parse(fs.readFileSync(FILE));
};

// Write notes
const writeNotes = (data) => {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
};

// Get all notes
app.get("/notes", (req, res) => {
  res.json(readNotes());
});

// Add note
app.post("/notes", (req, res) => {
  const notes = readNotes();
  const newNote = {
    id: Date.now(),
    title: req.body.title,
    content: req.body.content,
  };
  notes.push(newNote);
  writeNotes(notes);
  res.json(newNote);
});

// Delete note
app.delete("/notes/:id", (req, res) => {
  let notes = readNotes();
  notes = notes.filter((n) => n.id != req.params.id);
  writeNotes(notes);
  res.json({ message: "Deleted" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
