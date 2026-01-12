import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { useLogin } from "./useLogin";
import { loginRequest } from "@/lib/client/auth";
import { useAuthStore } from "@/store/useAuthStore";

// Mock dependencies
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("@/lib/client/auth", () => ({
  loginRequest: vi.fn(),
}));

describe("useLogin", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAuthStore.setState({ user: null });
  });

  it("initializes with default values", () => {
    const { result } = renderHook(() => useLogin());
    expect(result.current.form.getValues()).toEqual({
      login: "admin",
      password: "admin",
    });
  });

  it("sets error when login fails", async () => {
    (loginRequest as Mock).mockRejectedValue(new Error("Invalid credentials"));
    const { result } = renderHook(() => useLogin());

    await act(async () => {
      // Mocking a form submission event
      await result.current.onSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent);
    });

    expect(result.current.error).toBe("Invalid credentials");
  });
});
