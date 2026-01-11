"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPokemons } from "@/lib/client/pokemons";
import PokemonCard from "./PokemonCard";

export default function PokemonList({ initialData }: any) {
  const [page, setPage] = useState(1);

  const { data } = useQuery({
    queryKey: ["pokemons", page],
    queryFn: () => getPokemons(page),
    initialData,
    keepPreviousData: true,
  });

  return (
    <main className="w-full min-h-screen bg-[#F7F7F7] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
          {data.results.map((p: any) => (
            <PokemonCard key={p.id} pokemon={p} />
          ))}
        </div>

        <div className="flex justify-between items-center px-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 border rounded disabled:opacity-30"
          >
            Prev
          </button>

          <span className="text-sm text-gray-500">Page {page}</span>

          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 border rounded"
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}
