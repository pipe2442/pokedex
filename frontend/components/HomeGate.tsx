"use client"
import { useAuthStore } from "@/store/useAuthStore"
import PokemonList from "./PokemonList"

export default function HomeGate() {
  const user = useAuthStore(s => s.user)

  if (!user) {
    return (
      <div className="p-6 text-center">
        <p>You must login first</p>
        <a href="/login" className="text-blue-600 underline">Go to Login</a>
      </div>
    )
  }

  return <PokemonList />
}
