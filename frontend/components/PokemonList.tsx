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
    <main className="flex flex-col">
      <div className="flex flex-wrap gap-4 justify-center">
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
    </main>
  );
}
