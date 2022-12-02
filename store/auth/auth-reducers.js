import { isEmpty, isNotSevenCharLong } from "../../lib/helper-functions";

const reducers = {
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
      hasError: isNotSevenCharLong(action.payload) && state.password.wasTouched,
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
  switchMenuType(state) {
    state.logInMenu = !state.logInMenu;
  },
  formButtonClicked(state) {
    state.username = {
      value: state.username.value,
      hasError: state.username.value.trim() === "",
      errorMessage:
        isEmpty(state.username.value) && "Username should not be empty",
      wasTouched: true,
    };
    state.password = {
      value: state.password.value,
      hasError: state.password.value.trim().length < 7,
      errorMessage:
        isNotSevenCharLong(state.password.value) &&
        "Password should be at least 7 characters long",
      wasTouched: true,
    };
  },
  activateLoadingSpinner(state) {
    state.isLoadingSpinnerActive = true;
  },
  disableLoadingSpinner(state) {
    state.isLoadingSpinnerActive = false;
  },
  setAuthError(state, action) {
    if (
      action.payload === "No user found!" ||
      action.payload === "User exists already!"
    )
      state.username = {
        value: state.username.value,
        hasError: true,
        wasTouched: true,
        errorMessage: action.payload,
      };
    if (action.payload === "Incorrect password!") {
      state.password = {
        value: state.password.value,
        hasError: true,
        wasTouched: true,
        errorMessage: action.payload,
      };
    }
  },
};

export default reducers;
