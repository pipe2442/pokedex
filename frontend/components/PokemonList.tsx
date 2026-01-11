"use client"
import { useQuery } from "@tanstack/react-query"
import { getPokemons } from "@/lib/pokemons"
import { useState } from "react"

export default function PokemonList() {
  const [page, setPage] = useState(1)

  const { data } = useQuery({
    queryKey: ["pokemons", page],
    queryFn: () => getPokemons(page),
    keepPreviousData: true,
  })

  if (!data) return <p className="p-6">Loading...</p>

  return (
    <main className="p-4 flex flex-wrap gap-4 justify-center">
      {data.results.map((p: any) => (
        <div key={p.id} className="w-36 bg-white rounded-xl shadow p-4 text-center">
          <img src={p.image} className="w-20 h-20 mx-auto" />
          <p className="text-gray-400">#{p.number}</p>
          <h2 className="capitalize font-semibold">{p.name}</h2>
        </div>
      ))}
      <div className="w-full flex justify-between mt-4 px-4">
        <button onClick={() => setPage(p => Math.max(p - 1, 1))}>Prev</button>
        <span>Page {page}</span>
        <button onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </main>
  )
}
