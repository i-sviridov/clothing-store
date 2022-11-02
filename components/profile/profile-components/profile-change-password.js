import ProfileChangePasswordInput from './profile-change-password-input/profile-change-password-input';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useContext } from 'react';
import { ChangePassword } from '../../../context/change-password-context';

export default function ProfileChangePassword() {
  const ctx = useContext(ChangePassword);

  const oldPasswordProps = {
    value: ctx.oldPassword.value,
    passwordInputHandler: ctx.oldPasswordInputHandler,
    passwordWasTouched: ctx.oldPasswordWasTouched,
    hasError: ctx.oldPassword.hasError,
    htmlFor: 'oldPassword-text-field',
    label: 'Old Password',
    helperText: 'Enter your previous password',
  };
  const newPasswordProps = {
    value: ctx.newPassword.value,
    passwordInputHandler: ctx.newPasswordInputHandler,
    passwordWasTouched: ctx.newPasswordWasTouched,
    hasError: ctx.newPassword.hasError,
    htmlFor: 'newPassword-text-field',
    label: 'New Password',
    helperText: 'Enter your new password',
  };

  return (
    <>
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
