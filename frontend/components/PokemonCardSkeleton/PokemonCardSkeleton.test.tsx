import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PokemonCardSkeleton from "./PokemonCardSkeleton";

describe("PokemonCardSkeleton", () => {
  it("renders multiple skeleton elements", () => {
    const { container } = render(<PokemonCardSkeleton />);
    const skeletons = container.querySelectorAll('[data-slot="skeleton"]');
    expect(skeletons.length).toBeGreaterThanOrEqual(3);
  });
});

