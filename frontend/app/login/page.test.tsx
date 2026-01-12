import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, Mock } from "vitest";
import LoginPage from "./page";
import { useAuthStore } from "@/store/useAuthStore";
import { useLogin } from "@/hooks/useLogin";
import { useForm, UseFormReturn } from "react-hook-form";
import { LoginFormValues } from "@/lib/validations/auth";

// Mock the hooks
vi.mock("@/store/useAuthStore", () => ({
  useAuthStore: vi.fn(),
}));

vi.mock("@/hooks/useLogin", () => ({
  useLogin: vi.fn(),
}));

interface MockLoginData {
  error: string | null;
  isLoading: boolean;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

describe("LoginPage", () => {
  const renderWithForm = (loginData: MockLoginData) => {
    const TestComponent = () => {
      const form = useForm<LoginFormValues>({
        defaultValues: { login: "", password: "" }
      });
      
      (useLogin as Mock).mockReturnValue({
        ...loginData,
        form: form as unknown as UseFormReturn<LoginFormValues>,
      });

      return <LoginPage />;
    };

    return render(<TestComponent />);
  };

  it("renders the login form when not authenticated", () => {
    (useAuthStore as Mock).mockReturnValue({ user: null });
    
    renderWithForm({
      error: null,
      isLoading: false,
      onSubmit: vi.fn(),
    });

    // Check for title and button specifically
    expect(screen.getAllByText("Login")).toHaveLength(2);
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it("returns null if user is already authenticated", () => {
    (useAuthStore as Mock).mockReturnValue({ user: { id: 1, login: "admin" } });
    
    renderWithForm({
      error: null,
      isLoading: false,
      onSubmit: vi.fn(),
    });

    const { container } = render(<LoginPage />);
    expect(container.firstChild).toBeNull();
  });

  it("shows loading state on the button", () => {
    (useAuthStore as Mock).mockReturnValue({ user: null });
    
    renderWithForm({
      error: null,
      isLoading: true,
      onSubmit: vi.fn(),
    });

    expect(screen.getByRole("button", { name: /logging in\.\.\./i })).toBeInTheDocument();
  });

  it("shows error message if login fails", () => {
    (useAuthStore as Mock).mockReturnValue({ user: null });
    
    renderWithForm({
      error: "Invalid credentials",
      isLoading: false,
      onSubmit: vi.fn(),
    });

    expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
  });
});
