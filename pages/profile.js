import { connectToDatabase } from '../lib/auth';
import { authOptions } from './api/auth/[...nextauth]';

import { useRouter } from 'next/router';
import { unstable_getServerSession } from 'next-auth';
import Profile from '../components/profile/profile';

export default function Page(props) {
  if (typeof window === 'undefined') return null;
  const router = useRouter();
  const parsedData = JSON.parse(props.data);
  const parsedUser = JSON.parse(props.user);

  if (parsedUser) {
    return <Profile data={parsedData} user={parsedUser} />;
  } else if (router.pathname === '/auth') {
    return;
  } else router.push('/auth');
  return <p>Redirecting...</p>;
}

export async function getServerSideProps(context) {
  const { req, res } = context;

  const session = await unstable_getServerSession(req, res, authOptions);
  let data = null;
  let user = null;

  if (session) {
    user = session.user;
    const client = await connectToDatabase();
    const database = client.db('clothing-store');
    const collection = database.collection('orders');
    data = await collection.find({ user: user }).toArray();
    client.close();
  }

  return {
    props: { data: JSON.stringify(data), user: JSON.stringify(user) },
  };
}
