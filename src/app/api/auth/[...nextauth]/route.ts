import NextAuth, { AuthOptions, Session as NextAuthSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "user@email.com",
        },

        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials, req) {
        if (!credentials) throw new Error("Credentials not provided");
        const { email, password } = credentials;
        const userFound = await prisma.user.findUnique({
          where: {
            email,
          },
          select: {
            id: true,
            name: true,
            email: true,
            password: true,
            role: true,
          },
        });
        if (!userFound) throw new Error("Invalid credentials");
        const validPassword = await bcrypt.compare(
          password,
          userFound.password
        );
        if (!validPassword) throw new Error("Invalid credentials");

        return {
          id: userFound.id,
          name: userFound.name,
          email: userFound.email,
          role: userFound.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
