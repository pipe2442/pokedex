import * as z from "zod";

export const loginSchema = z.object({
  login: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .refine((val) => val === "admin", {
      message: "Only 'admin' is a valid username for this Pokedex.",
    }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
