import NextAuth, { type DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "../../prisma/client"
import bcrypt from "bcryptjs"
import { loginSchema } from "@/schemas/loginSchema"
import { ZodError } from "zod"

declare module "next-auth" {
  interface User {
    username: string
    role: string
  }

  interface Session {
    user: {
      id: string
      username: string
      role: string
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    username: string
    role: string
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        // try {
        //   const { username, password } = await loginSchema.parseAsync(
        //     credentials
        //   )

        //   const user = await prisma.user.findUnique({
        //     where: {
        //       username,
        //     },
        //   })

        //   if (!user) {
        //     return null
        //   }

        //   const isPasswordCorrect = await bcrypt.compare(
        //     password,
        //     user.password
        //   )

        //   if (!isPasswordCorrect) return null

        //   return user
        // } catch (error) {
        //   return null
        // }

        if (!credentials) {
          throw new Error("No credentials provided")
        }

        const { username, password } = await loginSchema.parseAsync(credentials)

        const user = await prisma.user.findUnique({
          where: {
            username,
          },
        })

        if (!user) {
          throw new Error("Invalid Credentials.")
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (isPasswordCorrect) {
          return user
        } else {
          throw new Error("Invalid Credentials.")
        }
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      if (token) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            username: token.username,
            role: token.role,
          },
        }
      }
      return session
    },
    jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id as string,
          username: user.username,
          role: user.role,
        }
      }
      return token
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.AUTH_SECRET,
})
