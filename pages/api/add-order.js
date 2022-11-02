import { unstable_getServerSession } from 'next-auth/next';
import { connectToDatabase } from '../../lib/auth';
import { authOptions } from './auth/[...nextauth]';

export default async (req, res) => {
  if (req.method !== 'POST') {
    return;
  }

  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    // Signed in

    const items = req.body;

    const client = await connectToDatabase();

    const db = client.db();

    const result = await db.collection('orders').insertOne({
      items,
      user: session.user,
    });

    res.status(201).json({ message: 'Added order!' });
    client.close();
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
};
