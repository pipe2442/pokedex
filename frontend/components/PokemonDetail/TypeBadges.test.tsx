import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TypeBadges } from "./TypeBadges";

describe("TypeBadges", () => {
  it("renders type badges with correct names", () => {
    render(<TypeBadges types={["grass", "poison"]} />);

    expect(screen.getByText("grass")).toBeInTheDocument();
    expect(screen.getByText("poison")).toBeInTheDocument();
  });

  it("applies correct background color from constants", () => {
    render(<TypeBadges types={["grass"]} />);
    const badge = screen.getByText("grass");
    // POKEMON_TYPE_COLORS['grass'] = '#74CB48'
    expect(badge).toHaveStyle({ backgroundColor: "rgb(116, 203, 72)" });
  });
});

