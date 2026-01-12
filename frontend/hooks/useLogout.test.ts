import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { useLogout } from "./useLogout";
import { logoutRequest } from "@/lib/client/auth";
import { useAuthStore } from "@/store/useAuthStore";
import { User } from "@/types/pokemon";

// Mock dependencies
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

vi.mock("@/lib/client/auth", () => ({
  logoutRequest: vi.fn(),
}));

describe("useLogout", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAuthStore.setState({ user: { login: "admin" } as User });
  });

  it("calls logoutRequest and clears store on logout", async () => {
    (logoutRequest as Mock).mockResolvedValue({});
    const { result } = renderHook(() => useLogout());

    await act(async () => {
      await result.current.handleLogout();
    });

    expect(logoutRequest).toHaveBeenCalled();
    expect(useAuthStore.getState().user).toBe(null);
    expect(mockPush).toHaveBeenCalledWith("/login");
  });
});
