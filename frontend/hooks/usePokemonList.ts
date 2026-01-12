import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { usePokemonStore } from "@/store/usePokemonStore";
import { getPokemons } from "@/lib/client/pokemons";
import { PokemonListResponse } from "@/types/pokemon";

interface UsePokemonListProps {
  initialData: PokemonListResponse;
}

export function usePokemonList({ initialData }: UsePokemonListProps) {
  const [page, setPage] = useState(1);
  const { search, getProcessedList } = usePokemonStore();

  const { data, isFetching } = useQuery({
    queryKey: ["pokemons", page],
    queryFn: () => getPokemons(page),
    initialData: page === 1 ? initialData : undefined,
    placeholderData: (prev) => prev,
  });

  const pokemons = getProcessedList(data?.results || []);

  // Calculate total pages based on 151 items per page (from Rails PER_PAGE)
  const totalItems = data?.total || 0;
  const totalPages = Math.ceil(totalItems / 151) || 1;

  return {
    pokemons,
    page,
    setPage,
    search,
    isLoading: isFetching,
    totalPages,
  };
}
