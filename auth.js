import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/prisma";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const env = {
  googleClientId:
    process.env.GOOGLE_CLIENT_ID || process.env.AUTH_GOOGLE_ID || "",
  googleClientSecret:
    process.env.GOOGLE_CLIENT_SECRET || process.env.AUTH_GOOGLE_SECRET || "",
  githubClientId:
    process.env.GITHUB_ID || process.env.GITHUB_CLIENT_ID || process.env.AUTH_GITHUB_ID || "",
  githubClientSecret:
    process.env.GITHUB_SECRET || process.env.GITHUB_CLIENT_SECRET || process.env.AUTH_GITHUB_SECRET || "",
};

const providers = [
  Credentials({
    name: "credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const parsed = signInSchema.safeParse(credentials);
      if (!parsed.success) return null;

      const { email, password } = parsed.data;

      const user = await db.user.findUnique({
        where: { email },
        select: {
          id: true,
          name: true,
          email: true,
          imageUrl: true,
          passwordHash: true,
        },
      });

      if (!user || !user.passwordHash) {
        return null;
      }

      const isValid = await bcrypt.compare(password, user.passwordHash);
      if (!isValid) {
        return null;
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.imageUrl,
      };
    },
  }),
];

if (env.googleClientId && env.googleClientSecret) {
  providers.push(
    Google({
      clientId: env.googleClientId,
      clientSecret: env.googleClientSecret,
    })
  );
}

if (env.githubClientId && env.githubClientSecret) {
  providers.push(
    GitHub({
      clientId: env.githubClientId,
      clientSecret: env.githubClientSecret,
      authorization: {
        params: { scope: "read:user user:email" },
      },
    })
  );
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers,
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!user?.email) return false;

      if (account?.provider !== "credentials") {
        await db.user.upsert({
          where: { email: user.email },
          update: {
            name: user.name || undefined,
            imageUrl: user.image || undefined,
          },
          create: {
            email: user.email,
            name: user.name || "User",
            imageUrl: user.image || null,
            clerkUserId: `nextauth_${crypto.randomUUID()}`,
          },
        });
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user?.id && !token?.email) {
        token.id = user.id;
      }

      if (token.email) {
        const dbUser = await db.user.findUnique({
          where: { email: token.email },
          select: { id: true },
        });
        if (dbUser?.id) {
          token.id = dbUser.id;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
});
