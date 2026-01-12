import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, Mock } from "vitest";
import SearchBar from "./SearchBar";
import { usePokemonStore } from "@/store/usePokemonStore";

// Mock the store
vi.mock("@/store/usePokemonStore", () => ({
  usePokemonStore: vi.fn(),
}));

describe("SearchBar", () => {
  it("updates search value on input change", () => {
    const setSearch = vi.fn();
    (usePokemonStore as Mock).mockReturnValue({
      search: "",
      setSearch,
    });

    render(<SearchBar />);
    const input = screen.getByPlaceholderText(/search/i);
    
    fireEvent.change(input, { target: { value: "pikachu" } });
    expect(setSearch).toHaveBeenCalledWith("pikachu");
  });
});
