import { useState, useEffect } from "react";
import { fetchPokemons } from "./useHttp";
import "./App.css";

function App() {
  const [pokies, setPokies] = useState([]);

  useEffect(() => {
    async function fetchPokies() {
      try {
        const pokie = await fetchPokemons();

        setPokies(pokie);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPokies();
  }, []);

  return (
    <>
      <ul>
        {pokies.map((pk, idx) => (
          <li key={idx}>
            <div>{pk.name}</div>
            <div>{pk.height}</div>
            <div>{pk.weight}</div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
