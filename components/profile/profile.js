import { signOut } from 'next-auth/react';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import ProfileChangePassword from './profile-components/profile-change-password';
import ProfileOrders from './profile-components/profile-orders';
import { ChangePasswordProvider } from '../../context/change-password-context';

import { motion } from 'framer-motion';

const ProductionVariants = {
  initial: { y: 150 },
  animate: {
    y: 0,
    transition: { type: 'spring', bounce: 0.4, duration: 2 },
  },
};

const MotionProps = {
  initial: 'initial',
  whileInView: 'animate',
  viewport: { once: true },
  variants: ProductionVariants,
};

export default function Profile(props) {
  return (
    <motion.div {...MotionProps}>
      <Typography variant="h4" textAlign="center" sx={{ mt: 15 }}>
        Welcome, {props.user} !
      </Typography>

      <Grid container justifyContent="center" alignContent="center" mb={3}>
        <Paper sx={{ mt: 5, px: 5, py: 2 }} elevation={5}>
          <ChangePasswordProvider>
            <ProfileChangePassword />
          </ChangePasswordProvider>
          <ProfileOrders orders={props.data} />
          <Grid container justifyContent="center" mt={2}>
            <Button
              variant="contained"
              color="secondary"
              sx={{ mx: 'auto' }}
              onClick={() => signOut({ callbackUrl: 'http://localhost:3000/' })}
            >
              Log out
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </motion.div>
  );
}
