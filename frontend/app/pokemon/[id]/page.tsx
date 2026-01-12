import PokemonDetail from "@/components/PokemonDetail";
import { getPokemon } from "@/lib/server/pokemons";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const pokemon = await getPokemon(id);

  return <PokemonDetail pokemon={pokemon} />;
}
