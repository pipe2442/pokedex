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
    return { pokemons: [], total_pages: 0 }; // Evita el crash si la sesión expiró
  }

  if (!res.ok) throw new Error("Failed to fetch pokemons");
  return res.json();
}
