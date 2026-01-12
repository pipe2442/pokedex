import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StatBar from "./StatBar";

describe("StatBar", () => {
  it("renders the label and value correctly", () => {
    render(<StatBar label="HP" value={45} color="#74CB48" />);
    expect(screen.getByText("HP")).toBeInTheDocument();
    expect(screen.getByText("045")).toBeInTheDocument();
  });

  it("applies the correct background color to the progress bar", () => {
    const { container } = render(<StatBar label="HP" value={45} color="#74CB48" />);
    // The inner progress bar element should have the background color
    const progressBar = container.querySelector('[style*="background-color: rgb(116, 203, 72)"]');
    expect(progressBar).toBeInTheDocument();
  });
});

