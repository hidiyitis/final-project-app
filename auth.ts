import { BASE_URL_API } from '@/lib/config';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  jwt:{
    maxAge: 29*60
  },
  session:{
    strategy: 'jwt',
    maxAge: 29*60,
  },
  pages: {
    signIn: '/'
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const res = await fetch(`${BASE_URL_API}/users/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });

        const {data} = await res.json();
        if (res.ok && data) {
          return {
            id: data.id,
            name: data.name,
            accessRole: data.accessRole,
            accessToken: data.accessToken,
            accessTokenExpiresIn: data.accessTokenExpiresIn
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: ({token, user})=>{
      if (user) {
        return{
          ...token,
          user:{
            name: user.name!,
            accessToken: user.accessToken!,
            accessRole: user.accessRole!,
            accessTokenExpiresIn: (Date.now() + user.accessTokenExpiresIn!)
          }
        }
      }
      return token
    },
    session: ({session, token})=>{
      session.user = {
          ...session.user,
          id: token.sub!,
          name: token.user!.name,
          accessRole: token.user!.accessRole,
          accessToken: token.user!.accessToken,
          accessTokenExpiresIn:  token.user!.accessTokenExpiresIn!
      };
      return session
    }
  },
});
