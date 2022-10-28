import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/auth';

export const authOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      // credentials: {
      //   username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
      //   password: { label: 'Password', type: 'password' },
      // },
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
          throw new Error('Could not log you in!');
        }
        client.close();
        return { user: user.username };
      },
      // async authorize(credentials, req) {
      //   // Add logic here to look up the user from the credentials supplied
      //   const user = { id: '1', name: 'J Smith', email: 'jsmith@example.com' };

      //   if (user) {
      //     // Any object returned will be saved in `user` property of the JWT
      //     return user;
      //   } else {
      //     // If you return null then an error will be displayed advising the user to check their details.
      //     return null;

      //     // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      //   }
      // },
    }),
  ],
};
export default NextAuth(authOptions);

// import NextAuth from 'next-auth';
// import Providers from 'next-auth/providers';

// export default NextAuth({
//   session: {
//     jwt: true,
//   },
//   providers: [
//     Providers.Credentials({
//       async authorize(credentials) {
//         const client = await connectToDatabase();
//         const usersCollection = client.db().collection('users');
//         const user = await usersCollection.findOne({
//           username: credentials.username,
//         });
//         if (!user) {
//           client.close();
//           throw new Error('No user found!');
//         }
//         const isValid = await verifyPassword(
//           credentials.password,
//           user.password
//         );
//         if (!isValid) {
//           client.close();
//           throw new Error('Could not log you in!');
//         }
//         client.close();
//         return { email: user.email };
//       },
//     }),
//   ],
// });
