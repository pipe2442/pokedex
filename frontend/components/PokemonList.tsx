"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { usePokemonStore } from "@/store/usePokemonStore";
import { getPokemons } from "@/lib/client/pokemons";
import PokemonCard from "./PokemonCard";

export default function PokemonList({ initialData }: any) {
  const [page, setPage] = useState(1);
  const { data, isPlaceholderData } = useQuery({
    queryKey: ["pokemons", page],
    queryFn: () => getPokemons(page),
    initialData: page === 1 ? initialData : undefined,
    placeholderData: (prev) => prev,
  });

  const { search, sort, getProcessedList } = usePokemonStore();
  const pokemons = getProcessedList(data?.results || []);

  return (
    <main className="w-full rounded-t-3xl min-h-screen px-6 py-8">
      {!search && (
        <div className="flex justify-center items-center gap-6 pb-10">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="cursor-pointer px-6 py-2 bg-[#DC0A2D] text-white rounded-full font-bold shadow-md disabled:bg-gray-300 transition-all hover:scale-105 active:scale-95"
          >
            Prev
          </button>

          <span className="font-medium text-[#666666]">Page {page}</span>

          <button
            onClick={() => setPage((p) => p + 1)}
            className="cursor-pointer px-6 py-2 bg-[#DC0A2D] text-white rounded-full font-bold shadow-md transition-all hover:scale-105 active:scale-95"
          >
            Next
          </button>
        </div>
      )}

      {/* Pokémon Grid */}
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {pokemons.length > 0 ? (
            pokemons.map((p: any) => <PokemonCard key={p.id} pokemon={p} />)
          ) : (
            <div className="py-20 text-center w-full text-gray-400">
              No Pokémon found for "{search}"
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
