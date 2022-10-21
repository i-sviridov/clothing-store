import { useState, useContext } from 'react';

import { AuthContext } from '../../../context/auth-context';

import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import FormHelperText from '@mui/material/FormHelperText';

export default function AuthorizationPasswordField() {
  const ctx = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl
      error={ctx.password.hasError}
      fullWidth
      variant="outlined"
      color="secondary"
      onBlur={ctx.passwordWasTouched}
    >
      <InputLabel htmlFor="password-text-field">Password</InputLabel>
      <OutlinedInput
        id="password-text-field"
        type={showPassword ? 'text' : 'password'}
        aria-describedby="password-helper-text"
        value={ctx.password.value}
        onChange={ctx.passwordInputHandler}
        startAdornment={
          <InputAdornment position="start">
            <LockIcon color={ctx.password.hasError ? 'error' : 'inherit'} />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              color={ctx.password.hasError ? 'error' : 'inherit'}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
      <FormHelperText id="password-helper-text">
        {ctx.password.hasError
          ? 'Password should be at least 7 characters long'
          : 'Demo Password: TestPass123'}
      </FormHelperText>
    </FormControl>
  );
}
