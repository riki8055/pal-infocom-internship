import React, { useState, useTransition } from "react";

export default function UseTransitionEx() {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);

    startTransition(() => {
      const items = [];
      for (let i = 0; i < 5000; i++) {
        items.push(value + " Item " + i);
      }
      setList(items);
    });
  };

  return (
    <div>
      <h2>useTransition Example</h2>

      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Type something..."
      />

      {isPending && <p>Loading...</p>}

      <ul>
        {list.slice(0, 10).map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
