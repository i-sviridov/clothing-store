import { useSelector, useDispatch } from "react-redux";

import { authActions } from "../../../store/auth/auth-slice";

import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import FormHelperText from "@mui/material/FormHelperText";

export default function AuthorizationPasswordField() {
  const dispatch = useDispatch();
  const passwordState = useSelector((state) => state.auth.password);

  return (
    <FormControl
      error={passwordState.hasError}
      fullWidth
      variant="outlined"
      color="secondary"
      onBlur={() => {
        dispatch(authActions.passwordWasTouched());
      }}
    >
      <InputLabel htmlFor="password-text-field">Password</InputLabel>
      <OutlinedInput
        id="password-text-field"
        type={passwordState.showPassword ? "text" : "password"}
        aria-describedby="password-helper-text"
        value={passwordState.value}
        onChange={(event) => {
          dispatch(authActions.passwordInput(event.target.value));
        }}
        startAdornment={
          <InputAdornment position="start">
            <LockIcon color={passwordState.hasError ? "error" : "inherit"} />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => {
                dispatch(authActions.isPasswordVisible());
              }}
              onMouseDown={(event) => {
                event.preventDefault();
              }}
              edge="end"
              color={passwordState.hasError ? "error" : "inherit"}
            >
              {passwordState.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
      <FormHelperText id="password-helper-text">
        {passwordState.hasError
          ? passwordState.errorMessage
          : "Demo Password: TestPass123"}
      </FormHelperText>
    </FormControl>
  );
}
