import { useContext } from 'react';
import { AuthContext } from '../../context/auth-context';

import AuthorizationUsernameField from './authorization-textfields/authorization-username-field';
import AuthorizationPasswordField from './authorization-textfields/authorization-password-field';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Authorization() {
  const ctx = useContext(AuthContext);

  if (ctx.loading) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
      >
        <CircularProgress color="primary" />
      </Backdrop>
    );
  }

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Box
        sx={{
          mt: '25vh',
          mb: 5,
          padding: '2rem',
          backgroundColor: 'white',
          borderRadius: '10px',
          border: '1px solid black',
          zIndex: 1,
        }}
      >
        <Typography
          variant="h4"
          sx={{ textAlign: 'center', fontWeight: 'bold' }}
        >
          {ctx.logInMenu ? 'Log In' : 'Sign Up'}
        </Typography>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="column"
          component="form"
          sx={{ width: { xs: '15rem', md: '20rem' } }}
        >
          <AuthorizationUsernameField />
          <AuthorizationPasswordField />

          <Button
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: 'secondary.main',
              color: 'white',
              width: '10rem',
            }}
            onClick={ctx.formButtonHandler}
          >
            {ctx.logInMenu ? 'Log In' : 'Create Account'}
          </Button>
          <Typography
            variant="h5"
            sx={{
              textAlign: 'center',
              mt: 2,
              cursor: 'pointer',
              '&:hover': { color: 'rgb(178, 165, 138)' },
            }}
            onClick={ctx.switchLogInMenu}
          >
            {ctx.logInMenu
              ? 'Create a new account'
              : 'Login with an existing accont'}
          </Typography>
        </Grid>
      </Box>
    </Grid>
  );
}
