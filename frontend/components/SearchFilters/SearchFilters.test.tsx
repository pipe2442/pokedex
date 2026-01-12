import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, Mock } from "vitest";
import SearchFilters from "./SearchFilters";
import { useSearchFilters } from "@/hooks/useSearchFilters";

vi.mock("@/hooks/useSearchFilters", () => ({
  useSearchFilters: vi.fn(),
}));

describe("SearchFilters", () => {
  it("renders nothing when not mounted", () => {
    (useSearchFilters as Mock).mockReturnValue({
      sort: null,
      setSort: vi.fn(),
      handleReset: vi.fn(),
      isMounted: false,
    });

    const { container } = render(<SearchFilters />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders the filter button when mounted", () => {
    (useSearchFilters as Mock).mockReturnValue({
      sort: null,
      setSort: vi.fn(),
      handleReset: vi.fn(),
      isMounted: true,
    });

    render(<SearchFilters />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
