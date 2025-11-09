import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

// Validation schemas
export const signUpSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  role: z.enum(["job_seeker", "employer"]),
  companyName: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const loginSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type SignUpData = z.infer<typeof signUpSchema>;
export type LoginData = z.infer<typeof loginSchema>;

export const signUp = async (data: SignUpData) => {
  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo: `${window.location.origin}/`,
      data: {
        full_name: data.fullName,
        role: data.role,
        company_name: data.companyName,
      },
    },
  });

  return { error };
};

export const login = async (data: LoginData) => {
  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  return { error };
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};
