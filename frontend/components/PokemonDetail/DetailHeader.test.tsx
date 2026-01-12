import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DetailHeader } from "./DetailHeader";

describe("DetailHeader", () => {
  it("renders the pokemon name and number", () => {
    render(<DetailHeader name="bulbasaur" number="001" />);

    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("#001")).toBeInTheDocument();
  });

  it("has a link to the home page", () => {
    render(<DetailHeader name="bulbasaur" number="001" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/");
  });
});

