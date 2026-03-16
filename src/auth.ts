import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Nodemailer from 'next-auth/providers/nodemailer'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: {
        params: {
          scope: [
            'openid',
            'email',
            'profile',
            'https://www.googleapis.com/auth/drive.readonly',
          ].join(' '),
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    }),
    Nodemailer({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM ?? 'noreply@growbiz.media',
    }),
  ],
  pages: {
    signIn: '/clipiq/login',
    error: '/clipiq/login',
  },
  callbacks: {
    jwt({ token, account }) {
      if (account?.provider === 'google') {
        token.googleAccessToken = account.access_token
        token.googleRefreshToken = account.refresh_token
        token.googleTokenExpiry = account.expires_at
      }
      if (account) {
        token.role = 'free'
      }
      return token
    },
    session({ session, token }) {
      ;(session as unknown as Record<string, unknown>).googleAccessToken = token.googleAccessToken
      ;(session as unknown as Record<string, unknown>).googleTokenExpiry = token.googleTokenExpiry
      if (session.user) {
        ;(session.user as unknown as Record<string, unknown>).role = token.role ?? 'free'
      }
      return session
    },
  },
})
