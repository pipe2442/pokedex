import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, Mock } from "vitest";
import Page from "./page";
import { getPokemons } from "@/lib/server/pokemons";
import { PokemonListResponse, Pokemon } from "@/types/pokemon";

// Mock the server action
vi.mock("@/lib/server/pokemons", () => ({
  getPokemons: vi.fn(),
}));

// Mock components
vi.mock("@/components/Navbar", () => ({
  default: () => <div data-testid="navbar">Navbar</div>,
}));

vi.mock("@/components/PokemonList", () => ({
  default: ({ initialData }: { initialData: PokemonListResponse }) => (
    <div data-testid="pokemon-list">
      {initialData.results.length} Pokemons
    </div>
  ),
}));

describe("Home Page (Server Component)", () => {
  it("fetches initial data and renders Navbar and PokemonList", async () => {
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

    const mockData: PokemonListResponse = {
      results: [mockPokemon],
      page: 1,
      total: 1
    };
    (getPokemons as Mock).mockResolvedValue(mockData);

    // Render the async server component
    const renderedPage = await Page();
    render(renderedPage);

    expect(getPokemons).toHaveBeenCalledWith(1);
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("pokemon-list")).toBeInTheDocument();
    expect(screen.getByText("1 Pokemons")).toBeInTheDocument();
  });
});
