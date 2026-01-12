import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AboutSection } from "./AboutSection";
import { Pokemon, PokemonAbility } from "@/types/pokemon";

const mockPokemon: Pokemon = {
  id: 1,
  name: "bulbasaur",
  number: "001",
  image: "image.png",
  types: ["grass"],
  height: 7, // 0.7m
  weight: 69, // 6.9kg
  abilities: [
    { ability: { name: "overgrow" } },
    { ability: { name: "chlorophyll" } }
  ] as PokemonAbility[],
  stats: []
};

describe("AboutSection", () => {
  it("renders the weight and height correctly", () => {
    render(<AboutSection pokemon={mockPokemon} />);

    expect(screen.getByText("6.9 kg")).toBeInTheDocument();
    expect(screen.getByText("0.7 m")).toBeInTheDocument();
    expect(screen.getByText("Weight")).toBeInTheDocument();
    expect(screen.getByText("Height")).toBeInTheDocument();
  });

  it("renders the abilities correctly", () => {
    render(<AboutSection pokemon={mockPokemon} />);

    expect(screen.getByText("overgrow")).toBeInTheDocument();
    expect(screen.getByText("chlorophyll")).toBeInTheDocument();
    expect(screen.getByText("Abilities")).toBeInTheDocument();
  });
});
