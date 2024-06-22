import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async signIn({ account, profile, user }: any) {
      if (account.provider === 'google') {
        const response = await axios.post('http://localhost:8080/api/auth/token', {
          email: profile.email,
          name: profile.given_name,
          surname: profile.family_name,
        });

        if (response.data.token) {
          user.jwt = response.data.token;
          return true;
        }
        return false;
      }
      return true;
    },
    async jwt({ token, user }: any) {
      // Si hay un user, esto ocurre durante el login, asigna el JWT al token
      if (user) {
        token.jwt = user.jwt;
      }
      return token;
    },
    async session({ session, token }: any) {
      // Asigna el JWT del token a la sesión
      session.jwt = token.jwt;
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
});
