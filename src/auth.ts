import NextAuth from "next-auth"
import google from "next-auth/providers/google"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async signIn({ account, profile} : any) {
      if (account?.provider === "google") {
        return profile?.email_verified
      }
      return true
    }
  },
  session: {
    strategy: "jwt"
  },
  providers: [
    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
})