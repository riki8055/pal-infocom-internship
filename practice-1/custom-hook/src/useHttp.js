export async function fetchPokemons() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch pokemons!");
  }

  let pokieDetails = [];

  for (const pokemon of data.results) {
    const res = await fetch(pokemon.url);
    const details = await res.json();

    pokieDetails.push({
      name: details.name,
      height: details.height,
      weight: details.weight,
    });
  }

  return pokieDetails;
}
