import { useState } from 'react';

import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';

export default function ProfileChangePasswordInput(props) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <FormControl
      error={props.data.hasError}
      fullWidth
      variant="outlined"
      color="secondary"
      onBlur={props.data.passwordWasTouched}
      sx={{ mb: 2 }}
    >
      <InputLabel htmlFor={props.data.htmlFor}>{props.data.label}</InputLabel>
      <OutlinedInput
        id={props.data.htmlFor}
        type={showPassword ? 'text' : 'password'}
        aria-describedby="password-helper-text"
        value={props.data.value}
        onChange={props.data.passwordInputHandler}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              color={props.data.hasError ? 'error' : 'inherit'}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={props.data.label}
      />
      <FormHelperText id="password-helper-text">
        {props.data.hasError
          ? 'Password should be at least 7 characters long'
          : props.data.helperText}
      </FormHelperText>
    </FormControl>
  );
}
