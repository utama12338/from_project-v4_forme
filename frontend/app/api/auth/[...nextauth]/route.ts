import NextAuth from "next-auth";
import type { AuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import argon2 from 'argon2';


// Extend the built-in types
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
      username: string;
    } & DefaultSession["user"]
  }

  interface User {
    id: string;
    role: string;
    username: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    username: string;
  }
}

const prisma = new PrismaClient();

// Configure NextAuth options
const authOptions: AuthOptions = {
  // Remove the adapter line since we're using Credentials provider
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null
        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        })

        if (user && await argon2.verify(user.password, credentials.password)) {
          return {
            id: user.id,
            name: user.username,
            role: user.role, // Make sure to include role
            username: user.username
          }
        } else {
          throw new Error('Invalid username or password')
        }
      },
    })


  ],
  // adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.username = token.username;
      }
      return session;
    }
  },
  pages: {
    signIn: process.env.NEXT_PUBLIC_FRONTEND_URL || "/auth/signin"
  },
  secret: process.env.NEXTAUTH_SECRET,
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true
      },
    },
    callbackUrl: {
      name: `__Secure-next-auth.callback-url`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
    csrfToken: {
      name: `__Host-next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
  },
};

// Create and export handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };