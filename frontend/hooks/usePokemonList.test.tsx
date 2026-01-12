import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { usePokemonList } from "./usePokemonList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Pokemon, PokemonListResponse } from "@/types/pokemon";

// Mock store
vi.mock("@/store/usePokemonStore", () => ({
  usePokemonStore: () => ({
    search: "",
    getProcessedList: (list: Pokemon[]) => list,
  }),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("usePokemonList", () => {
  it("initializes with initialData", () => {
    const mockPokemon: Pokemon = {
      id: 1,
      name: "pikachu",
      number: "025",
      image: "",
      types: ["electric"],
      height: 4,
      weight: 60,
      abilities: ["static"],
      stats: [{ base_stat: 35, stat: { name: "hp" } }]
    };

    const mockInitialData: PokemonListResponse = { 
      results: [mockPokemon],
      page: 1,
      total: 1
    };
    const { result } = renderHook(() => usePokemonList({ initialData: mockInitialData }), { wrapper });

    expect(result.current.pokemons).toHaveLength(1);
    expect(result.current.pokemons[0].name).toBe("pikachu");
  });
});
