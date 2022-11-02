import React from 'react';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

import authReducer from './auth-lib/auth-reducer';
import { isEmpty } from '../lib/helper-functions';
import { isNotSevenCharLong } from '../lib/helper-functions';

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
  loading: false,
});

const defaultAuthState = {
  username: {
    value: '',
    wasTouched: false,
    hasError: false,
    errorMessage: null,
  },
  password: {
    value: '',
    wasTouched: false,
    hasError: false,
  },
  logInMenu: true,
  loading: false,
};

export function AuthContextProvider(props) {
  const router = useRouter();
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

  async function formButtonHandler() {
    dispatchAuthAction({
      type: 'form-button-clicked',
    });

    if (
      isEmpty(authState.username.value) ||
      isNotSevenCharLong(authState.password.value)
    ) {
      return;
    }

    dispatchAuthAction({
      field: 'loading',
      type: 'start',
    });

    const username = authState.username.value;
    const password = authState.password.value;

    if (authState.logInMenu) {
      const result = await signIn('credentials', {
        redirect: false,
        username,
        password,
      });

      if (!result.error) {
        router.replace('/');
      }
      dispatchAuthAction({
        field: 'loading',
        type: 'end',
      });
      return;
    } else {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        dispatchAuthAction({
          field: 'error',
          type: data.type,
          message: data.message,
        });
      }

      dispatchAuthAction({
        field: 'loading',
        type: 'end',
      });

      return data;
    }
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
    loading: authState.loading,
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
}
