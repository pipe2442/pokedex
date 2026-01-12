import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PokemonGrid from "./PokemonGrid";
import { Pokemon } from "@/types/pokemon";

// Mock PokemonCard and PokemonCardSkeleton
vi.mock("@/components/PokemonCard", () => ({
  default: ({ pokemon }: { pokemon: Pokemon }) => <div data-testid={`pokemon-card-${pokemon.id}`}>{pokemon.name}</div>
}));

vi.mock("@/components/PokemonCardSkeleton", () => ({
  default: () => <div data-testid="pokemon-skeleton" />
}));

describe("PokemonGrid", () => {
  const mockPokemons: Pokemon[] = [
    { id: 1, name: "bulbasaur", number: "001", image: "img1.png", types: [], stats: [], height: 7, weight: 69 },
    { id: 2, name: "ivysaur", number: "002", image: "img2.png", types: [], stats: [], height: 10, weight: 130 },
  ];

  it("renders skeletons when loading and no search", () => {
    render(<PokemonGrid pokemons={[]} search="" isLoading={true} />);
    const skeletons = screen.getAllByTestId("pokemon-skeleton");
    expect(skeletons).toHaveLength(10);
  });

  it("renders pokemon cards when not loading", () => {
    render(<PokemonGrid pokemons={mockPokemons} search="" isLoading={false} />);
    expect(screen.getByTestId("pokemon-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("pokemon-card-2")).toBeInTheDocument();
  });

  it("renders empty message when no pokemons found", () => {
    render(<PokemonGrid pokemons={[]} search="unknown" isLoading={false} />);
    expect(screen.getByText(/No Pokémon found for "unknown"/i)).toBeInTheDocument();
  });

  it("renders pulse overlay when loading and searching", () => {
    const { container } = render(
      <PokemonGrid pokemons={mockPokemons} search="bulb" isLoading={true} />
    );
    const pulseOverlay = container.querySelector(".animate-pulse");
    expect(pulseOverlay).toBeInTheDocument();
    expect(screen.getByTestId("pokemon-card-1")).toBeInTheDocument();
  });
});
