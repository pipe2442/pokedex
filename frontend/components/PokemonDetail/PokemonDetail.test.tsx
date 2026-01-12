import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PokemonDetail from "./PokemonDetail";
import { Pokemon } from "@/types/pokemon";

// Mock sub-components if needed or just render them
const mockPokemon: Pokemon = {
  id: 1,
  number: "001",
  name: "bulbasaur",
  image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
  types: [{ type: { name: "grass" } }],
  weight: 69,
  height: 7,
  abilities: [{ ability: { name: "overgrow" } }],
  stats: [
    { base_stat: 45, stat: { name: "hp" } }
  ],
  description: "A strange seed was planted on its back at birth."
};

describe("PokemonDetail", () => {
  it("renders basic pokemon information", () => {
    render(<PokemonDetail pokemon={mockPokemon} />);
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/#001/i)).toBeInTheDocument();
    expect(screen.getByText(/6.9 kg/i)).toBeInTheDocument();
    expect(screen.getByText(/0.7 m/i)).toBeInTheDocument();
  });

  it("renders base stats", () => {
    render(<PokemonDetail pokemon={mockPokemon} />);
    expect(screen.getByText(/Base Stats/i)).toBeInTheDocument();
    expect(screen.getByText(/HP/i)).toBeInTheDocument();
  });
});

