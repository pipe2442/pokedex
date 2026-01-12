import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { useSearchFilters } from "./useSearchFilters";
import { usePokemonStore } from "@/store/usePokemonStore";

describe("useSearchFilters", () => {
  beforeEach(() => {
    usePokemonStore.setState({ search: "", sort: null });
  });

  it("handles reset correctly", () => {
    usePokemonStore.setState({ search: "pikachu", sort: "name" });
    const { result } = renderHook(() => useSearchFilters());

    act(() => {
      result.current.handleReset();
    });

    const state = usePokemonStore.getState();
    expect(state.search).toBe("");
    expect(state.sort).toBe(null);
  });

  it("sets mounted to true on mount", () => {
    const { result } = renderHook(() => useSearchFilters());
    expect(result.current.isMounted).toBe(true);
  });
});

