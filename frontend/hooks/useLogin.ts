import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/store/useAuthStore";
import { loginSchema, type LoginFormValues } from "@/lib/validations/auth";
import { loginRequest } from "@/lib/client/auth";

export function useLogin() {
  const { setUser } = useAuthStore();
  const router = useRouter();
  const [error, setError] = useState("");

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { login: "admin", password: "admin" },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setError("");
    try {
      const data = await loginRequest(values);
      setUser(data.user);
      router.push("/");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    }
  };

  return {
    form,
    error,
    isLoading: form.formState.isSubmitting,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
