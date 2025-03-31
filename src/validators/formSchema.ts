import * as z from "zod";

export const schema = z.object({
  email: z.string().email("Invalid email address"),
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type FormSchema = z.infer<typeof schema>;
