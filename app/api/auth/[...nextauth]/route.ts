import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prismaClient from "@/libs/prisma";

const handler = NextAuth({
  adapter: PrismaAdapter(prismaClient),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // @ts-ignore
      // TODO to fix this issue instead of doing return in if blocks do "throw new Error"
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return {
            status: "error",
            message: "Email and password are required",
          };
        }

        const user = await prismaClient.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // TODO CHANGE THE MESSAGE
        if (!user) {
          return {
            status: "error",
            message: "Invalid email",
          };
        }

        if (!user.hashedPassword) {
          return {
            status: "error",
            message: "Password is required",
          };
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isValidPassword) {
          return {
            status: "error",
            message: "Invalid password",
          };
        }

        return user;
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET_JWT,
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
