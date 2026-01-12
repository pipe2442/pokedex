import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, Mock } from "vitest";
import Page from "./page";
import { getPokemon } from "@/lib/server/pokemons";
import { Pokemon } from "@/types/pokemon";

// Mock the server action
vi.mock("@/lib/server/pokemons", () => ({
  getPokemon: vi.fn(),
}));

// Mock PokemonDetail
vi.mock("@/components/PokemonDetail", () => ({
  default: ({ pokemon }: { pokemon: Pokemon }) => (
    <div data-testid="pokemon-detail">{pokemon.name}</div>
  ),
}));

describe("Pokemon Detail Page (Server Component)", () => {
  it("fetches pokemon data and renders PokemonDetail", async () => {
    const mockPokemon: Pokemon = {
      id: 1,
      name: "bulbasaur",
      number: "001",
      image: "",
      types: ["grass"],
      height: 7,
      weight: 69,
      abilities: ["overgrow"],
      stats: [{ base_stat: 45, stat: { name: "hp" } }]
    };
    (getPokemon as Mock).mockResolvedValue(mockPokemon);

    const params = Promise.resolve({ id: "1" });
    const renderedPage = await Page({ params });
    render(renderedPage);

    expect(getPokemon).toHaveBeenCalledWith("1");
    expect(screen.getByTestId("pokemon-detail")).toBeInTheDocument();
    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
  });
});
