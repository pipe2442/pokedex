import { PokemonGridProps } from "@/types/pokemon";
import PokemonCard from "../PokemonCard";
import PokemonCardSkeleton from "../PokemonCardSkeleton";

export default function PokemonGrid({
  pokemons,
  search,
  isLoading,
}: PokemonGridProps) {
  if (isLoading && !search) {
    return (
      <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {[...Array(10)].map((_, i) => (
          <PokemonCardSkeleton key={`skeleton-${i}`} />
        ))}
      </div>
    );
  }

  if (pokemons.length === 0) {
    return (
      <div className="py-20 text-center w-full text-gray-400">
        No Pokémon found for &quot;{search}&quot;
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 relative">
      {isLoading && search && (
        <div className="absolute inset-0 bg-white/20 z-10 animate-pulse pointer-events-none rounded-3xl" />
      )}

      {pokemons.map((p) => (
        <PokemonCard key={p.id} pokemon={p} />
      ))}
    </div>
  );
}
