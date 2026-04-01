import React from "react";

function withBorder(Component) {
  return function WrappedComponent(props) {
    return (
      <div style={{ border: "2px solid blue", padding: "10px", margin: "10px" }}>
        <Component {...props} />
      </div>
    );
  };
}

function Message() {
  return <h3>Hello Beginner React Developer!</h3>;
}

const MessageWithBorder = withBorder(Message);

export default function HOCEx() {
  return (
    <div>
      <h2>HOC Example</h2>
      <MessageWithBorder />
    </div>
  );
}