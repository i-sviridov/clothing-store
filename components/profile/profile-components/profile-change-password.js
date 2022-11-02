import React from 'react';
import { useContext, useState, useEffect } from 'react';

import ProfileChangePasswordInput from './profile-change-password-input/profile-change-password-input';
import { ChangePassword } from '../../../context/change-password-context';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ProfileChangePassword() {
  const ctx = useContext(ChangePassword);
  const [snackbarVisibility, setSnackbarVisiblity] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState(null);

  console.log('ctx.snackbarStatus', ctx.snackbarStatus);
  console.log('snackbarVisibility', snackbarVisibility);
  console.log('snackbarSeverity', snackbarSeverity);

  useEffect(() => {
    if (ctx.snackbarStatus === 'loading') {
      setSnackbarVisiblity(true);
      setSnackbarSeverity('info');
      setSnackbarMessage('Loading...');
    }
    if (ctx.snackbarStatus === 'success') {
      setSnackbarSeverity('success');
      setSnackbarMessage('Success!');
    }
    if (ctx.snackbarStatus === 'error') {
      setSnackbarSeverity('error');
      setSnackbarMessage('Error!');
    }
    if (ctx.snackbarStatus === 'end-loading') {
      setSnackbarVisiblity(false);
      setSnackbarMessage('Closing...');
    }
  }, [ctx.snackbarStatus]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarVisiblity(false);
  };

  const oldPasswordProps = {
    value: ctx.oldPassword.value,
    passwordInputHandler: ctx.oldPasswordInputHandler,
    passwordWasTouched: ctx.oldPasswordWasTouched,
    hasError: ctx.oldPassword.hasError,
    htmlFor: 'oldPassword-text-field',
    label: 'Old Password',
    helperText: 'Enter your previous password',
    errorMessage: ctx.oldPassword.errorMessage,
  };
  const newPasswordProps = {
    value: ctx.newPassword.value,
    passwordInputHandler: ctx.newPasswordInputHandler,
    passwordWasTouched: ctx.newPasswordWasTouched,
    hasError: ctx.newPassword.hasError,
    htmlFor: 'newPassword-text-field',
    label: 'New Password',
    helperText: 'Enter your new password',
    errorMessage: ctx.newPassword.errorMessage,
  };

  return (
    <>
      <Snackbar
        open={snackbarVisibility}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          severity={snackbarSeverity}
          sx={{ width: '100vw' }}
          onClose={handleClose}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Typography variant="h5" textAlign="center">
        Change Password
      </Typography>
      <Divider sx={{ mt: 2 }} />
      <ProfileChangePasswordInput data={oldPasswordProps} />
      <ProfileChangePasswordInput data={newPasswordProps} />

      <Grid container justifyContent="center">
        <Button
          variant="contained"
          color="secondary"
          sx={{ mx: 'auto' }}
          onClick={ctx.confirmButtonHandler}
        >
          Confirm
        </Button>
      </Grid>

      <Divider sx={{ mt: 2 }} />
    </>
  );
}
