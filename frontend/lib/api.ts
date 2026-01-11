export async function fetchPokemons(page = 1) {
  const res = await fetch(`http://localhost:8000/pokemons?page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch pokemons");
  return res.json();
}
