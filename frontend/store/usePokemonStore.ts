import { create } from "zustand";
import { Pokemon } from "@/types/pokemon";

type SortType = "name" | "number" | null;

interface PokemonStore {
  search: string;
  sort: SortType;
  setSearch: (val: string) => void;
  setSort: (val: SortType) => void;
  getProcessedList: (pokemons: Pokemon[]) => Pokemon[];
}

export const usePokemonStore = create<PokemonStore>((set, get) => ({
  search: "",
  sort: null,
  setSearch: (search) => set({ search }),
  setSort: (sort) => set({ sort }),

  getProcessedList: (pokemons) => {
    const { search, sort } = get();
    let results = [...pokemons];

    if (search) {
      results = results.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === "name") {
      results.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "number") {
      results.sort((a, b) => {
        const numA = parseInt(a.number, 10);
        const numB = parseInt(b.number, 10);
        return numA - numB;
      });
    }

    return results;
  },
}));