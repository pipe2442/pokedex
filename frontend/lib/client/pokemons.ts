import { getApiUrl } from "../api";

export async function getPokemons(page = 1) {
  const apiUrl = getApiUrl();
  const res = await fetch(`${apiUrl}/pokemons?page=${page}`, {
    credentials: "include",
  })
  if (!res.ok) throw new Error("Failed to fetch pokemons")
  return res.json()
}
