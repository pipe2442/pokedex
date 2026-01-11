"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemons } from "@/lib/api";
import { useState } from "react";

export default function PokemonList({ initialData }: any) {
  const [page, setPage] = useState(initialData.page);

  const { data } = useQuery({
    queryKey: ["pokemons", page],
    queryFn: () => fetchPokemons(page),
    initialData,
    keepPreviousData: true,
  });

  return (
    <main className="p-4 flex flex-wrap gap-4 justify-center">
      {data.results.map((p: any) => (
        <div
          key={p.id}
          className="w-36 bg-white rounded-xl shadow p-4 text-center flex flex-col items-center"
        >
          <img src={p.image} className="w-20 h-20" />
          <p className="text-gray-400 text-sm mt-1">#{p.number}</p>
          <h2 className="capitalize font-semibold text-sm mt-1">{p.name}</h2>
        </div>
      ))}

      <div className="w-full flex justify-between mt-6 px-2">
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>Prev</button>
        <span>Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </main>
  );
}

