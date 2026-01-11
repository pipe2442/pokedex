import Link from "next/link"

export default function PokemonCard({ pokemon }: any) {
  return (
    <Link
      href={`/pokemons/${pokemon.id}`}
      className="w-36 flex flex-col items-center bg-white rounded-xl shadow p-3 hover:scale-105 transition"
    >
      <img src={pokemon.image} className="w-20 h-20" />
      <p className="text-xs text-gray-400">#{pokemon.number}</p>
      <h2 className="capitalize font-semibold">{pokemon.name}</h2>
    </Link>
  )
}
