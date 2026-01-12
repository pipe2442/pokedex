import { headers } from "next/headers";
import PokemonDetail from "@/components/PokemonDetail";

async function getPokemon(id: string) {
  const cookieHeader = (await headers()).get("cookie") ?? "";

  const res = await fetch(`http://localhost:8000/pokemon/${id}`, {
    headers: { cookie: cookieHeader }, // para mandar tu jwt al backend
    cache: "no-store",
  });
  console.log(res, 'res');

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
