import { unstable_getServerSession } from 'next-auth/next';
import {
  connectToDatabase,
  hashPassword,
  verifyPassword,
} from '../../lib/auth';
import { authOptions } from './auth/[...nextauth]';

export default async (req, res) => {
  if (req.method !== 'PATCH') {
    return;
  }

  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    // Signed in

    const { oldPassword, newPassword } = req.body;

    const client = await connectToDatabase();

    const db = client.db();

    const usersCollection = await db.collection('users');

    const user = await usersCollection.findOne({ username: session.user });

    const currentPassword = user.password;

    const passwordsAreEqual = await verifyPassword(
      oldPassword,
      currentPassword
    );

    if (!passwordsAreEqual) {
      res.status(403).json({ message: 'Invalid old password.' });
      client.close();
      return;
    }

    const hashedPassword = await hashPassword(newPassword);

    const result = await usersCollection.updateOne(
      { username: session.user },
      { $set: { password: hashedPassword } }
    );

    res.status(200).json({ message: 'Password updated!' });

    client.close();
  } else {
    // Not Signed in
    res.status(401);
  }
};
