import { useContext } from 'react';
import { AuthContext } from '../../context/auth-context';

import AuthorizationUsernameField from './authorization-textfields/authorization-username-field';
import AuthorizationPasswordField from './authorization-textfields/authorization-password-field';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Authorization() {
  const ctx = useContext(AuthContext);
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50% , -50%)',
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '10px',
        border: '1px solid black',
        zIndex: 1,
      }}
    >
      <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
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
  );
}
