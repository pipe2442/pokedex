import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { getPokemons } from "@/lib/server/pokemons"
import PokemonList from "@/components/PokemonList"

export default async function Page() {
  const cookieStore = await cookies()

  if (!cookieStore.has("jwt")) redirect("/login")

  const initialData = await getPokemons(1)

  return <PokemonList initialData={initialData} />
}
