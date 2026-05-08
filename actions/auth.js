"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/prisma";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function registerUser(payload) {
  const parsed = registerSchema.safeParse(payload);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message || "Invalid form data");
  }

  const { name, email, password } = parsed.data;

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    throw new Error("Email is already registered");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      name,
      email,
      clerkUserId: `nextauth_${crypto.randomUUID()}`,
      passwordHash,
    },
  });

  return { success: true };
}
