import React, { useRef, useState } from "react";

function Counter() {
  const countRef = useRef(0);
  const [render, setRender] = useState(0);

  const increase = () => {
    countRef.current += 1;
    console.log("Count:", countRef.current);
  };

  return (
    <div>
      <h3>Count: {countRef.current}</h3>

      <button onClick={increase}>Increase</button>

      <button onClick={() => setRender(render + 1)}>
        Re-render
      </button>
    </div>
  );
}

export default Counter;