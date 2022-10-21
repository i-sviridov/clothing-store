import { useContext } from 'react';

import { AuthContext } from '../../../context/auth-context';

import AccountCircle from '@mui/icons-material/AccountCircle';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

export default function AuthorizationUsernameField() {
  const ctx = useContext(AuthContext);

  return (
    <TextField
      id="username-text-field"
      label="Username"
      variant="outlined"
      fullWidth
      error={ctx.username.hasError}
      color="secondary"
      sx={{ my: 2 }}
      value={ctx.username.value}
      onBlur={ctx.usernameWasTouched}
      onChange={ctx.usernameInputHandler}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <AccountCircle
              color={ctx.username.hasError ? 'error' : 'inherit'}
            />
          </InputAdornment>
        ),
      }}
      helperText={
        ctx.username.hasError
          ? 'Username should not be empty'
          : 'Demo Username: TestUser'
      }
    />
  );
}
