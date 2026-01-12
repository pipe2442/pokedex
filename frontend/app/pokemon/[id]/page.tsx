import { headers } from "next/headers";
import PokemonDetail from "@/components/PokemonDetail";
import { getApiUrl } from "@/lib/api";

async function getPokemon(id: string) {
  const cookieHeader = (await headers()).get("cookie") ?? "";
  const apiUrl = getApiUrl();

  const res = await fetch(`${apiUrl}/pokemon/${id}`, {
    headers: { cookie: cookieHeader }, // para mandar tu jwt al backend
    cache: "no-store",
  });
  console.log(res, 'res');

  if (res.status === 401) {
    return null; // O redirigir
  }

  if (!res.ok) {
    throw new Error(`Failed: ${res.status}`);
  }

  return res.json();
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const pokemon = await getPokemon(id);

  return (
    <PokemonDetail pokemon={pokemon} />
  );
}
