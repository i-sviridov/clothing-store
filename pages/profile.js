import { useSession } from 'next-auth/react';
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';

export default function Page(props) {
  const { data: session } = useSession();
  const router = useRouter();

  if (typeof window === 'undefined') return null;

  if (!session) {
    router.push('/auth');
    return <p>Redirecting...</p>;
  }

  if (session) {
    return (
      <>
        <Typography sx={{ mt: 25 }}>Protected Page</Typography>
        <p>You can view this page because you are signed in.</p>
      </>
    );
  }
}
