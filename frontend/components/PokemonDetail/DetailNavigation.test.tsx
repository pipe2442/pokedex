import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DetailNavigation } from "./DetailNavigation";

// Mock next/image since it's used in the component
vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />
}));

describe("DetailNavigation", () => {
  it("renders navigation buttons and pokemon image", () => {
    render(<DetailNavigation pokemonId={2} name="ivysaur" image="image.png" />);

    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/pokemon/1");
    expect(links[1]).toHaveAttribute("href", "/pokemon/3");
    
    const image = screen.getByAltText("ivysaur");
    expect(image).toHaveAttribute("src", "image.png");
  });

  it("hides previous button for pokemon with ID 1", () => {
    const { container } = render(
      <DetailNavigation pokemonId={1} name="bulbasaur" image="image.png" />
    );

    // The first link is inside the button with "invisible" class
    const prevButton = container.querySelector(".invisible");
    expect(prevButton).toBeInTheDocument();
  });
});
