import React from "react";
function Car({ brand, model, color, year, ...rest }) {
  // Event function
  const showDetails = (message) => {
    alert(message);
  };
  return (
    <div>
           {" "}
      <h2>
                My {color} {brand} {model} ({year})      {" "}
      </h2>
              {/* Accessing extra props using rest operator */}
            <p>Extra Info: {rest.owner}</p>        {/* Normal click event */}
           {" "}
      <button onClick={() => alert("Car Started!")}>
                Start Car      {" "}
      </button>
              {/* Passing argument in event */}
           {" "}
      <button onClick={() => showDetails("This is my favorite car!")}>
                Show Message      {" "}
      </button>
         {" "}
    </div>
  );
}

export default function App() {
  return (
    <Car brand="Ford" model="Mustang" color="Red" year={1969} owner="Deepak" />
  );
}
