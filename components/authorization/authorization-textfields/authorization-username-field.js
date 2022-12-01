import { useContext } from "react";

import { useDispatch, useSelector } from "react-redux";

import { AuthContext } from "../../../context/auth-context";

import AccountCircle from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { authActions } from "../../../store/auth/auth-slice";

export default function AuthorizationUsernameField() {
  const ctx = useContext(AuthContext);

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
