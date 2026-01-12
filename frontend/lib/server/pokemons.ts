import { headers } from "next/headers";
import { getApiUrl } from "../api";

export async function getPokemons(page = 1) {
  const cookieHeader = (await headers()).get("cookie") ?? "";
  const apiUrl = getApiUrl();

  const res = await fetch(`${apiUrl}/pokemons?page=${page}`, {
    headers: {
      cookie: cookieHeader,
    },
    cache: "no-store",
  });

  if (res.status === 401) {
    return { pokemons: [], total_pages: 0 };
  }

  if (!res.ok) throw new Error("Failed to fetch pokemons");
  return res.json();
}

export async function getPokemon(id: string) {
  const cookieHeader = (await headers()).get("cookie") ?? "";
  const apiUrl = getApiUrl();

  const res = await fetch(`${apiUrl}/pokemon/${id}`, {
    headers: {
      cookie: cookieHeader,
    },
    cache: "no-store",
  });

  if (res.status === 401) {
    return null;
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch pokemon: ${res.status}`);
  }

  return res.json();
}
