import React from 'react';

import authReducer from './auth-lib/auth-reducer';
import { isEmpty } from './auth-lib/auth-helper-functions';
import { isNotSevenCharLong } from './auth-lib/auth-helper-functions';

export const AuthContext = React.createContext({
  username: {},
  usernameInputHandler: () => {},
  usernameWasTouched: () => {},
  password: {},
  passwordInputHandler: () => {},
  passwordWasTouched: () => {},
  formButtonHandler: () => {},
  logInMenu: true,
  switchLogInMenu: () => {},
});

const defaultAuthState = {
  username: {
    value: '',
    wasTouched: false,
    hasError: false,
  },
  password: {
    value: '',
    wasTouched: false,
    hasError: false,
  },
  logInMenu: true,
};

export function AuthContextProvider(props) {
  const [authState, dispatchAuthAction] = React.useReducer(
    authReducer,
    defaultAuthState
  );

  function usernameInputHandler(event) {
    dispatchAuthAction({
      field: 'username',
      type: 'input-typing',
      data: event.target.value,
    });
  }

  function usernameWasTouched() {
    dispatchAuthAction({
      field: 'username',
      type: 'was-touched',
    });
  }

  function passwordInputHandler(event) {
    dispatchAuthAction({
      field: 'password',
      type: 'input-typing',
      data: event.target.value,
    });
  }

  function passwordWasTouched() {
    dispatchAuthAction({
      field: 'password',
      type: 'was-touched',
    });
  }

  function formButtonHandler() {
    dispatchAuthAction({
      field: 'button',
    });

    if (
      isEmpty(authState.username.value) ||
      isNotSevenCharLong(authState.password.value)
    ) {
      return;
    }

    console.log('OK');
  }

  function switchLogInMenu() {
    dispatchAuthAction({ field: 'switch-menu' });
  }

  const context = {
    username: authState.username,
    usernameInputHandler,
    usernameWasTouched,
    password: authState.password,
    passwordInputHandler,
    passwordWasTouched,
    formButtonHandler,
    logInMenu: authState.logInMenu,
    switchLogInMenu,
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
}
