"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/store/useAuthStore";
import { loginSchema, type LoginFormValues } from "@/lib/validations/auth";

// Componentes de Shadcn
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const { user, setUser } = useAuthStore();
  const router = useRouter();
  const [error, setError] = useState("");

  // 1. Auth Guard: Si ya está logueado, mandarlo al home
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  // 2. Configurar el formulario con React Hook Form + Zod
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: "admin",
      password: "admin",
    },
  });

  // 3. Función de envío
  async function onSubmit(values: LoginFormValues) {
    setError("");
    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        setError("Invalid credentials");
        return;
      }

      const data = await res.json();
      setUser(data.user);
      router.push("/");
    } catch (e) {
      setError("Something went wrong. Please try again.");
    }
  }

  // Si ya hay usuario, no renderizamos nada mientras redirige
  if (user) return null;

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <Card className="w-full max-w-sm shadow-lg border-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="login"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="admin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && (
                <div className="text-red-500 text-sm font-medium text-center">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="cursor-pointer w-full bg-[#DC0A2D] hover:bg-[#b50825] text-white py-6 text-lg rounded-xl transition-all active:scale-[0.98]"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
