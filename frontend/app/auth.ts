import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs'
import type { User } from "@prisma/client"
import { Session } from "next-auth"
import { JWT } from "next-auth/jwt"
import { prisma } from "./api/adapters/prisma"
import { $Enums } from "@prisma/client";
// import { PrismaAdapter } from "@auth/prisma-adapter"

declare module "next-auth/jwt" {
    interface JWT {
      id: string;
      username: string;
      role: $Enums.Role; // กำหนด role เป็น $Enums.Role
    }
  }
  
  // ขยาย interface Session
  declare module "next-auth" {
    interface Session {
      user: {
        id: string;
        username: string;
        role: $Enums.Role; // กำหนด role เป็น $Enums.Role
      };
    }
  }
  
  interface CustomUser {
    id: string;
    username: string;
    role: $Enums.Role;
  }
export const  { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  // adapter: PrismaAdapter(prisma),
  trustHost: true,
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials): Promise<Omit<User, "password"> | null> {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { username: credentials.username as string }
        })

        if (!user || !await bcrypt.compare(credentials.password as string, user.password)) {
            throw new Error("Invalid username or password")
          }

        const { password, ...userWithoutPassword } = user
        return userWithoutPassword
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }): Promise<JWT> {
      if (user) {
        const customUser = user as CustomUser; // Type assertion สำหรับ user
        token.id = customUser.id;
        token.username = customUser.username;
        token.role = customUser.role ;
      }
      return token;
    },
    async session({ session, token }): Promise<Session> {
      if (session?.user && token.id && token.username && token.role) { // เพิ่ม token.role ในเงื่อนไข
        session.user.id = token.id; // TypeScript รู้ว่า token.id เป็น string จากเงื่อนไข
        session.user.username = token.username;
        session.user.role = token.role;
      }
      return session;
    },
    // async redirect({ url, baseUrl }) {
    //   // Allows relative callback URLs
    //   if (url.startsWith("/")) return `${baseUrl}${url}`
   
    //   // Allows callback URLs on the same origin
    //   if (new URL(url).origin === baseUrl) return url
   
    //   return baseUrl
    // }
      
  },
  pages: {
    signIn: '/signin',
    error: '/signin' // เพิ่มหน้า error
  }
})

