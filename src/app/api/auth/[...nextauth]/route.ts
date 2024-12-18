import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from 'bcrypt';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { 
          label: "Email", 
          type: "email", 
          placeholder: "user@email.com" },
          
        password: { 
          label: "Password", 
          type: "password" },
        },
          
      async authorize(credentials, req) {
        if (!credentials) throw new Error("Credentials not provided");
        const {email, password} = credentials;
        const userFound = await prisma.user.findUnique({
          where: {
            email
          }
        });
        if (!userFound) throw new Error("Invalid credentials");
        const validPassword = await bcrypt.compare(password, userFound.password);
          if (!validPassword) throw new Error("Invalid credentials");
        
          return {
            id: userFound.id,
            name: userFound.name,
            email: userFound.email, 
          };
      },

    }),
    
  ],
  pages: {
    signIn: "/auth/login",
  },
})
export {handler as GET, handler as POST}