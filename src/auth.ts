import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';
import CredentialsProvider from 'next-auth/providers/credentials';
import UserApi from './api/usersApi';
const userApi = new UserApi();

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
          user.token = response.data.token;
          return true;
        }
        return false;
      }
      return true;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.user = user;
        token.jwt = user.token;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user = token.user;
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
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any,) {
        if (credentials === null) return null;
        try {
          const data = await userApi.logUser(credentials);
          if (data) {
            return {
              ...data.user,
              token: data.token,
            };
          } else {
            throw new Error('Invalid Credentials');
          }
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
  ],
});
