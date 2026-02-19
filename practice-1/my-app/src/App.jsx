import { useState } from "react";
import "./App.css";
 
function App() {
 
  // 1️⃣ Number State
  const [count, setCount] = useState(0);
 
  // 2️⃣ String State
  const [name, setName] = useState("");
 
  // 3️⃣ Boolean State
  const [isVisible, setIsVisible] = useState(true);
 
  return (
<div style={{ padding: "40px", fontFamily: "Arial" }}>
<h1>Understanding useState</h1>
 
      {/* ---------------- Counter Example ---------------- */}
<h2>1️⃣ Counter Example</h2>
 
      <p>Count: {count}</p>
 
      <button onClick={() => setCount(count + 1)}>Increase</button>
<button onClick={() => setCount(count - 1)} style={{ marginLeft: "10px" }}>
        Decrease
</button>
<button onClick={() => setCount(0)} style={{ marginLeft: "10px" }}>
        Reset
</button>
 
      <hr />
 
      {/* ---------------- Input Example ---------------- */}
<h2>2️⃣ Input Example</h2>
 
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
 
      <p>Hello, {name || "Guest"} 👋</p>
 
      <hr />
 
      {/* ---------------- Toggle Example ---------------- */}
<h2>3️⃣ Toggle Example</h2>
 
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? "Hide Message" : "Show Message"}
</button>
 
      {isVisible && <p>This message is visible 👀</p>}
 
    </div>
  );
}
 
export default App;