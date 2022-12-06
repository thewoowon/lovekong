import NextAuth, { NextAuthOptions, Session } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '../../../lib/prismadb'
import KakaoProvider from 'next-auth/providers/kakao'
import NaverProvider from 'next-auth/providers/naver'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    // KakaoProvider({
    //   clientId: process.env.KAKAO_CLIENT_ID ?? '',
    //   clientSecret: process.env.KAKAO_CLIENT_SECRET ?? '',
    // }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID ?? '',
      clientSecret: process.env.NAVER_CLIENT_SECRET ?? '',
    }),
  ],
  session: {
    strategy: 'database',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  callbacks: {
    session: async ({ session, token, user }) => {
      session.id = user.id
      return Promise.resolve(session)
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
