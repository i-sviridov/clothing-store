import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../store/auth/auth-slice";

import AccountCircle from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

export default function AuthorizationUsernameField() {
  const dispatch = useDispatch();
  const usernameState = useSelector((state) => state.auth.username);

  return (
    <TextField
      id="username-text-field"
      label="Username"
      variant="outlined"
      fullWidth
      error={usernameState.hasError}
      color="secondary"
      sx={{ my: 2 }}
      value={usernameState.value}
      onBlur={() => {
        dispatch(authActions.usernameWasTouched());
      }}
      onChange={(event) => {
        dispatch(authActions.usernameInput(event.target.value));
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <AccountCircle
              color={usernameState.hasError ? "error" : "inherit"}
            />
          </InputAdornment>
        ),
      }}
      helperText={
        usernameState.hasError
          ? usernameState.errorMessage
          : "Demo Username: TestUser"
      }
    />
  );
}
