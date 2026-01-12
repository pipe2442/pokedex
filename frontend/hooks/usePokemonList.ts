import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { usePokemonStore } from "@/store/usePokemonStore";
import { getPokemons } from "@/lib/client/pokemons";
import { Pokemon } from "@/types/pokemon";

interface UsePokemonListProps {
  initialData: { results: Pokemon[] };
}

export function usePokemonList({ initialData }: UsePokemonListProps) {
  const [page, setPage] = useState(1);
  const { search, getProcessedList } = usePokemonStore();

  const { data } = useQuery({
    queryKey: ["pokemons", page],
    queryFn: () => getPokemons(page),
    initialData: page === 1 ? initialData : undefined,
    placeholderData: (prev) => prev,
  });

  const pokemons = getProcessedList(data?.results || []);

  return {
    pokemons,
    page,
    setPage,
    search,
  };
}
