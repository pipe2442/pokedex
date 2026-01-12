"use client";

import { usePokemonList } from "@/hooks/usePokemonList";
import Pagination from "./Pagination";
import PokemonGrid from "./PokemonGrid";
import { PokemonListResponse } from "@/types/pokemon";

interface PokemonListProps {
  initialData: PokemonListResponse;
}

export default function PokemonList({ initialData }: PokemonListProps) {
  const { pokemons, page, setPage, search } = usePokemonList({ initialData });

  return (
    <main className="w-full rounded-t-3xl min-h-screen px-6 py-8">
      {!search && <Pagination page={page} onPageChange={setPage} />}

      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <PokemonGrid pokemons={pokemons} search={search} />
      </div>
    </main>
  );
}
