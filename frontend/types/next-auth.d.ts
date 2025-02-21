import NextAuth, { DefaultSession } from "next-auth"
import { Role } from "@prisma/client"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      username: string
      role: Role
      viewHistory: boolean
      canCreateuser: boolean
      canCreate: boolean
      canEdit: boolean
      canDelete: boolean
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    username: string
    role: Role
    viewHistory: boolean
    canCreateuser: boolean
    canCreate: boolean
    canEdit: boolean
    canDelete: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    username: string
    role: Role
    viewHistory: boolean
    canCreateuser: boolean
    canCreate: boolean
    canEdit: boolean
    canDelete: boolean
  }
}
