import { API } from '@/services';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

const routeHandler = NextAuth({
  providers: [
    // the custom login provider
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        login_type: { value: 'normal' },
      },
      async authorize(credentials, req) {
        // create request data for custom login
        const requestData = {
          email: credentials?.email!,
          password: credentials?.password!,
        };

        // make the api call to the backend for login

        const response = await API.post('/auth/login/', requestData);

        // handle when the login is successful

        if (response.status == 200) {
          const user = {
            ...response.data.user,
            access_token: response.data.access_token,
            refresh_token: response.data.refresh_token,
          };

          return user;

          // handle when login fail
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (trigger === 'update' && session?.user) {
        return { ...token, ...session.user };
      }

      if (user) {
        return { ...token, ...user };
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token as any;

      return session;
    },
  },
  pages: {
    signIn: '/',
    newUser: '/register',
    verifyRequest: '/verification',
  },
});

export { routeHandler as GET, routeHandler as POST };
