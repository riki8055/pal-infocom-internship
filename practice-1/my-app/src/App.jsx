import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [cars, setCars] = useState(["Ford", "BMW", "Audi"]);

  // Handle input change
  function handleChange(e) {
    setName(e.target.value);
  }

  // Handle form submit
  function handleSubmit(e) {
    e.preventDefault();

    if (name.trim() === "") return;

    // Add new car to list
    setCars([...cars, name]);
    setName("");
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>My Cars</h1>

      {/* Car List */}
      <ul>
        {cars.map((car, index) => (
          <li key={index}>I am a {car}</li>
        ))}
      </ul>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <label>
          Add a new car:
          <input
            type="text"
            value={name}
            onChange={handleChange}
            style={{ marginLeft: "10px" }}
          />
        </label>
        <button type="submit" style={{ marginLeft: "10px" }}>
          Add
        </button>
      </form>
    </div>
  );
}

export default App