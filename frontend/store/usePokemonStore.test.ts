import { describe, it, expect, beforeEach } from "vitest";
import { usePokemonStore } from "./usePokemonStore";
import { Pokemon } from "@/types/pokemon";

describe("usePokemonStore", () => {
  beforeEach(() => {
    usePokemonStore.setState({
      search: "",
      sort: null,
    });
  });

  it("should update search term", () => {
    const { setSearch } = usePokemonStore.getState();
    setSearch("charmander");
    expect(usePokemonStore.getState().search).toBe("charmander");
  });

  it("should filter pokemon by search term", () => {
    const { getProcessedList } = usePokemonStore.getState();
    const mockPokemons = [
      { name: "Pikachu" },
      { name: "Squirtle" },
    ] as Pokemon[];

    usePokemonStore.setState({ search: "pika" });
    const results = getProcessedList(mockPokemons);

    expect(results).toHaveLength(1);
    expect(results[0].name).toBe("Pikachu");
  });

  it("should sort pokemon by name", () => {
    const { getProcessedList } = usePokemonStore.getState();
    const mockPokemons = [
      { name: "Squirtle" },
      { name: "Bulbasaur" },
    ] as Pokemon[];

    usePokemonStore.setState({ sort: "name" });
    const results = getProcessedList(mockPokemons);

    expect(results[0].name).toBe("Bulbasaur");
    expect(results[1].name).toBe("Squirtle");
  });
});
