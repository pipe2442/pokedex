import { getPokemons } from "@/lib/server/pokemons";
import PokemonList from "@/components/PokemonList";
import Navbar from "@/components/Navbar";

export default async function Page() {
  const initialData = await getPokemons(1);

  return (
    <>
      <Navbar />
      <PokemonList initialData={initialData} />
    </>
  );
}
