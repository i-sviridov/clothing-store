import { createSlice } from "@reduxjs/toolkit";
import { isEmpty, isNotSevenCharLong } from "../../lib/helper-functions";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    username: {
      value: "",
      wasTouched: false,
      hasError: false,
      errorMessage: null,
    },
    password: {
      value: "",
      wasTouched: false,
      hasError: false,
      errorMessage: null,
      showPassword: false,
    },
    logInMenu: true,
    loading: false,
  },
  reducers: {
    usernameInput(state, action) {
      state.username = {
        value: action.payload,
        hasError: isEmpty(action.payload) && state.username.wasTouched,
        wasTouched: state.username.wasTouched,
        errorMessage:
          isEmpty(action.payload) &&
          state.username.wasTouched &&
          "Username should not be empty",
      };
    },
    usernameWasTouched(state) {
      state.username = {
        value: state.username.value,
        hasError: isEmpty(state.username.value),
        wasTouched: true,
        errorMessage:
          isEmpty(state.username.value) && "Username should not be empty",
      };
    },
    passwordInput(state, action) {
      state.password = {
        value: action.payload,
        hasError:
          isNotSevenCharLong(action.payload) && state.password.wasTouched,
        wasTouched: state.password.wasTouched,
        errorMessage:
          isNotSevenCharLong(action.payload) &&
          state.password.wasTouched &&
          "Password should be at least 7 characters long",
        showPassword: state.password.showPassword,
      };
    },
    passwordWasTouched(state) {
      state.password = {
        value: state.password.value,
        hasError: isNotSevenCharLong(state.password.value),
        wasTouched: true,
        errorMessage:
          isNotSevenCharLong(state.password.value) &&
          "Password should be at least 7 characters long",
        showPassword: state.password.showPassword,
      };
    },
    isPasswordVisible(state) {
      state.password.showPassword = !state.password.showPassword;
    },
  },
});

export default authSlice;
export const authActions = authSlice.actions;
