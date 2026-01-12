import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, Mock } from "vitest";
import PokemonList from "./PokemonList";
import { usePokemonList } from "@/hooks/usePokemonList";
import { Pokemon, PokemonListResponse } from "@/types/pokemon";

vi.mock("@/hooks/usePokemonList", () => ({
  usePokemonList: vi.fn(),
}));

const mockInitialData: PokemonListResponse = {
  results: [],
  total: 0,
  page: 1,
};

describe("PokemonList", () => {
  it("renders loading skeletons when isLoading is true", () => {
    (usePokemonList as Mock).mockReturnValue({
      pokemons: [],
      page: 1,
      setPage: vi.fn(),
      search: "",
      isLoading: true,
      totalPages: 1,
    });

    const { container } = render(<PokemonList initialData={mockInitialData} />);
    // Skeletons have data-slot="skeleton" from the UI component
    const skeletons = container.querySelectorAll('[data-slot="skeleton"]');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("renders pokemon cards when data is loaded", () => {
    (usePokemonList as Mock).mockReturnValue({
      pokemons: [
        { id: 1, name: "bulbasaur", number: "001", image: "", types: [], stats: [], abilities: [] } as Pokemon
      ],
      page: 1,
      setPage: vi.fn(),
      search: "",
      isLoading: false,
      totalPages: 1,
    });

    render(<PokemonList initialData={mockInitialData} />);
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
  });
});
