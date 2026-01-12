import { create } from "zustand";

type SortType = "name" | "number" | null;

interface PokemonStore {
  search: string;
  sort: SortType;
  setSearch: (val: string) => void;
  setSort: (val: SortType) => void;
  getProcessedList: (pokemons: any[]) => any[];
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
      results.sort((a, b) => a.number - b.number);
    }

    return results;
  },
}));