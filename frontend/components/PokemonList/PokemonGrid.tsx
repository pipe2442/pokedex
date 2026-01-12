import { PokemonGridProps } from "@/types/pokemon";
import PokemonCard from "../PokemonCard";

export default function PokemonGrid({ pokemons, search }: PokemonGridProps) {
  if (pokemons.length === 0) {
    return (
      <div className="py-20 text-center w-full text-gray-400">
        No Pokémon found for &quot;{search}&quot;
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
      {pokemons.map((p) => (
        <PokemonCard key={p.id} pokemon={p} />
      ))}
    </div>
  );
}
