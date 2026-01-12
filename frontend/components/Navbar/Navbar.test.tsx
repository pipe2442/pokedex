import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, Mock } from "vitest";
import Navbar from "./Navbar";
import { useLogout } from "@/hooks/useLogout";

// Mock hooks and components
vi.mock("@/hooks/useLogout", () => ({
  useLogout: vi.fn(),
}));

vi.mock("@/components/SearchBar", () => ({
  default: () => <div data-testid="search-bar">Search Bar</div>,
}));

describe("Navbar", () => {
  it("renders the logo and logout button", () => {
    const handleLogout = vi.fn();
    (useLogout as Mock).mockReturnValue({ handleLogout });

    render(<Navbar />);

    expect(screen.getByText("Pokédex")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
    expect(screen.getByTestId("search-bar")).toBeInTheDocument();
  });

  it("calls handleLogout when logout button is clicked", () => {
    const handleLogout = vi.fn();
    (useLogout as Mock).mockReturnValue({ handleLogout });

    render(<Navbar />);

    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);

    expect(handleLogout).toHaveBeenCalled();
  });
});
