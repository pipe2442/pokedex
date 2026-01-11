import { headers } from "next/headers";

export async function getPokemons(page = 1) {
  const cookie = (await headers()).get("cookie") ?? "";

  const res = await fetch(`http://localhost:8000/pokemons?page=${page}`, {
    headers: { cookie },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch pokemons");
  return res.json();
}
export async function getMe() {
  const cookie = (await headers()).get("cookie") ?? "";

  const res = await fetch("http://localhost:8000/me", {
    headers: { cookie },
    cache: "no-store",
  });

  if (res.status === 401) return null;
  if (!res.ok) throw new Error("Failed to fetch me");
  return res.json();
}
