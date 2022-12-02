import { createSlice } from "@reduxjs/toolkit";

import reducerFunctions from "./auth-reducers";

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
    isLoadingSpinnerActive: false,
  },
  reducers: reducerFunctions,
});

export default authSlice;
export const authActions = authSlice.actions;
