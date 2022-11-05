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

    const { oldPassword: enteredOldPassword, newPassword: enteredNewPassword } =
      req.body;

    const client = await connectToDatabase();

    const db = client.db();

    const usersCollection = await db.collection('users');

    const user = await usersCollection.findOne({ username: session.user });

    const currentPassword = user.password;

    const isOldPasswordCorrect = await verifyPassword(
      enteredOldPassword,
      currentPassword
    );

    if ((session.user = 'TestUser')) {
      res.status(403).json({
        message:
          'Unable to change password for a TestUser, its a demo account. Create your own one!',
      });
      client.close();
      return;
    }

    if (!isOldPasswordCorrect) {
      res.status(403).json({ message: 'Invalid old password.' });
      client.close();
      return;
    }

    const isNewPasswordSameAsCurrent = await verifyPassword(
      enteredNewPassword,
      currentPassword
    );

    if (isNewPasswordSameAsCurrent) {
      res
        .status(403)
        .json({ message: 'New password is the same as the old one.' });
      client.close();
      return;
    }

    const hashedPassword = await hashPassword(enteredNewPassword);

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
