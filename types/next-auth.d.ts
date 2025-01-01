import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface User {
    name: string,
    accessToken?: string,
    accessRole?: string,
    accessTokenExpiresIn?: number
  }
  interface Session {
    user: User
  }
  interface JWT {
    user: User
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: {
      name: string,
      accessToken: string,
      accessRole: string,
      accessTokenExpiresIn: number
    }
  }
}