import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PokemonCard from "./PokemonCard";
import { Pokemon } from "@/types/pokemon";

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
  ]
};

describe("PokemonCard", () => {
  it("renders pokemon name and number", () => {
    render(<PokemonCard pokemon={mockPokemon} />);
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/#001/i)).toBeInTheDocument();
  });

  it("links to the correct pokemon detail page", () => {
    render(<PokemonCard pokemon={mockPokemon} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/pokemon/1");
  });
});

