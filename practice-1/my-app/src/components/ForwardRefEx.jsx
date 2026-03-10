import React, { useRef, forwardRef } from "react";

const InputBox = forwardRef((props, ref) => {
  return <input ref={ref} placeholder="Enter your name" />;
});

export default function ForwardRefEx() {
  const inputRef = useRef();

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <h2>forwardRef Example</h2>

      <InputBox ref={inputRef} />

      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}