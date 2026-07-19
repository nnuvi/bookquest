import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().trim().min(1, "Username is required"),

  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const loginInputDefaultValues: LoginInput = {
  username: "",
  password: "",
};

export const signupSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Full name must be at least 2 characters")
      .max(100),

    username: z
      .string()
      .trim()
      .min(3, "Username must be at least 3 characters")
      .max(30)
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores",
      ),

    email: z.string().trim().email("Invalid email"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });


export type SignupInput = z.infer<typeof signupSchema>;


// API payload
export type SignupPayload = Omit<
  SignupInput,
  "confirmPassword"
>;


export const signupInputDefaultValues: SignupInput = {
  fullName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};
