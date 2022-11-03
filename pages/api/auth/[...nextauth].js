import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/auth';

export const authOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials) {
        const client = await connectToDatabase();
        const usersCollection = client.db().collection('users');
        const user = await usersCollection.findOne({
          username: credentials.username,
        });
        if (!user) {
          client.close();
          throw new Error('No user found!');
        }
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        if (!isValid) {
          client.close();
          throw new Error('Incorrect password!');
        }
        client.close();

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.user = token.username;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.username = user.username;
      }

      return token;
    },
  },
};
export default NextAuth(authOptions);
