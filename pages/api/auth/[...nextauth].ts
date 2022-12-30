import NextAuth, { ISODateString, NextAuthOptions, Session } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '../../../lib/prismadb'
import KakaoProvider from 'next-auth/providers/kakao'
import NaverProvider from 'next-auth/providers/naver'
import CredentialsProvider from 'next-auth/providers/credentials'
import * as bcrypt from 'bcrypt'
import { User } from '@prisma/client'

export interface CustomDefaultSession {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
  expires: ISODateString
  id?: string
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: 'signInWithEmail',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials?.email,
            },
          })
          if (user) {
            const result = await bcrypt.compare(
              credentials?.password ?? '',
              user?.password ?? ''
            )

            if (result) {
              return Promise.resolve(user)
            } else {
              return Promise.resolve(null)
            }
          } else {
            return Promise.resolve(null)
          }
        } catch (err) {
          console.log(err)
          return null
        }
      },
    }),
    GoogleProvider({
      id: 'google',
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    // KakaoProvider({
    //   clientId: process.env.KAKAO_CLIENT_ID ?? '',
    //   clientSecret: process.env.KAKAO_CLIENT_SECRET ?? '',
    // }),
    NaverProvider({
      id: 'naver',
      clientId: process.env.NAVER_CLIENT_ID ?? '',
      clientSecret: process.env.NAVER_CLIENT_SECRET ?? '',
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },

  callbacks: {
    session: async ({ session, token, user }) => {
      const newSession = session as CustomDefaultSession
      newSession.id = token.sub
      return Promise.resolve(newSession)
    },
    jwt: async ({ token, user, account, profile, isNewUser }) => {
      const isSignIn = user ? true : false
      return Promise.resolve(token)
    },
  },
  logger: {
    error(code, metadata) {
      console.log({ type: 'inside error logger', code, metadata })
    },
    warn(code) {
      console.log({ type: 'inside warn logger', code })
    },
    debug(code, metadata) {
      console.log({ type: 'inside debug logger', code, metadata })
    },
  },
  debug: true,
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/error/error',
  },
}

export default NextAuth(authOptions)
