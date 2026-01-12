import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Pagination from "./Pagination";

describe("Pagination", () => {
  it("renders the current page and total pages", () => {
    render(<Pagination page={2} totalPages={10} onPageChange={() => {}} />);
    expect(screen.getByText("Page 2 of 10")).toBeInTheDocument();
  });

  it("calls onPageChange with next page when Next is clicked", () => {
    const onPageChange = vi.fn();
    render(<Pagination page={2} totalPages={10} onPageChange={onPageChange} />);
    
    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);
    
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("calls onPageChange with prev page when Prev is clicked", () => {
    const onPageChange = vi.fn();
    render(<Pagination page={2} totalPages={10} onPageChange={onPageChange} />);
    
    const prevButton = screen.getByText("Prev");
    fireEvent.click(prevButton);
    
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it("disables Prev button on first page", () => {
    render(<Pagination page={1} totalPages={10} onPageChange={() => {}} />);
    const prevButton = screen.getByText("Prev");
    expect(prevButton).toBeDisabled();
  });

  it("disables Next button on last page", () => {
    render(<Pagination page={10} totalPages={10} onPageChange={() => {}} />);
    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeDisabled();
  });
});
