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
  },
});

export default authSlice;
export const authActions = authSlice.actions;
