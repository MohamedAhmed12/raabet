import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma as PrismaClient),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" }, // Expecting email field
        password: { label: "Password", type: "password" }, // Expecting password field
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null; // If email or password is missing, return null
        }

        // Fetch user from the Prisma database by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (
          user &&
          (await bcrypt.compare(credentials.password, user.password))
        ) {
          // If user exists and password matches, return user data
          return user;
        } else {
          return null; // If authentication fails, return null
        }
      },
    }),
  ],
  session: {
    strategy: "jwt", // Using JWT for session management
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user;
      }

      // update session's user
      if (trigger === "update" && session) {
        const newUserData = {
          ...token,
          id: {
            ...session,
          },
        };

        // Update the token with the new user data
        Object.assign(token, newUserData);
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login", // Custom login page
    error: "/auth/login", // Custom error page
  },
};
