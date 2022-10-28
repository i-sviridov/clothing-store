import { hashPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/auth';

export default async function signUpHandler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const data = req.body;

  const { username, password } = data;

  if (!username || !password || password.trim().length < 7) {
    res.status(422).json({
      message: 'Invalid input',
    });
    return;
  }

  const client = await connectToDatabase();

  const db = client.db();

  const existingUser = await db
    .collection('users')
    .findOne({ username: username });

  if (existingUser) {
    res
      .status(422)
      .json({ message: 'User exists already!', type: 'user-exists' });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(password);

  const result = await db.collection('users').insertOne({
    username: username,
    password: hashedPassword,
  });

  res.status(201).json({ message: 'Created user!' });
  client.close();
}
