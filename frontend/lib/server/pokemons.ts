import { headers } from "next/headers";

export async function getPokemons(page = 1) {
  const cookieHeader = (await headers()).get("cookie") ?? "";

  const res = await fetch(`http://localhost:8000/pokemons?page=${page}`, {
    headers: {
      cookie: cookieHeader,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch pokemons");
  return res.json();
}
