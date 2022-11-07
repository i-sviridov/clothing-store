import React from 'react';

import changePasswordReducer from './change-password-lib/change-password-reducer';
import { isNotSevenCharLong } from '../lib/helper-functions';

export const ChangePassword = React.createContext({
  oldPassword: {},
  oldPasswordInputHandler: () => {},
  oldPasswordWasTouched: () => {},
  newPassword: {},
  newPasswordInputHandler: () => {},
  newPasswordWasTouched: () => {},
  confirmButtonHandler: () => {},
  snackbarStatus: null,
});

const defaultPassState = {
  oldPassword: {
    value: '',
    wasTouched: false,
    hasError: false,
    errorMessage: null,
  },
  newPassword: {
    value: '',
    wasTouched: false,
    hasError: false,
    errorMessage: null,
  },
  snackbarStatus: null,
};

export function ChangePasswordProvider(props) {
  const [passwordState, dispatchPasswordAction] = React.useReducer(
    changePasswordReducer,
    defaultPassState
  );

  function oldPasswordInputHandler(event) {
    dispatchPasswordAction({
      field: 'old-password',
      type: 'input-typing',
      data: event.target.value,
    });
  }

  function oldPasswordWasTouched() {
    dispatchPasswordAction({
      field: 'old-password',
      type: 'was-touched',
    });
  }

  function newPasswordInputHandler(event) {
    dispatchPasswordAction({
      field: 'new-password',
      type: 'input-typing',
      data: event.target.value,
    });
  }

  function newPasswordWasTouched() {
    dispatchPasswordAction({
      field: 'new-password',
      type: 'was-touched',
    });
  }

  async function confirmButtonHandler() {
    dispatchPasswordAction({
      type: 'confirm-button-clicked',
    });

    dispatchPasswordAction({
      field: 'snackbar-status',
      type: 'start-loading',
    });

    const oldPassword = passwordState.oldPassword.value;
    const newPassword = passwordState.newPassword.value;

    if (isNotSevenCharLong(oldPassword) || isNotSevenCharLong(newPassword)) {
      dispatchPasswordAction({
        field: 'snackbar-status',
        type: 'error',
      });
      dispatchPasswordAction({
        field: 'snackbar-status',
        type: 'end-loading',
      });
      return;
    }

    const response = await fetch('/api/change-password', {
      method: 'PATCH',
      body: JSON.stringify({ oldPassword, newPassword }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      dispatchPasswordAction({
        field: 'snackbar-status',
        type: 'success',
      });
    } else {
      const parsedResponse = await response.json();

      if (parsedResponse.message === 'Invalid old password.') {
        dispatchPasswordAction({
          field: 'error',
          type: 'old-password',
          errorMessage: parsedResponse.message,
        });
      }
      if (
        parsedResponse.message === 'New password is the same as the old one.'
      ) {
        dispatchPasswordAction({
          field: 'error',
          type: 'new-password',
          errorMessage: parsedResponse.message,
        });
      }
      if (
        parsedResponse.message ===
        'Unable to change password for a TestUser, its a demo account. Create your own one!'
      ) {
        dispatchPasswordAction({
          field: 'error',
          type: 'old-password',
          errorMessage: parsedResponse.message,
        });
      }

      dispatchPasswordAction({
        field: 'snackbar-status',
        type: 'error',
      });
    }
  }

  const context = {
    oldPassword: passwordState.oldPassword,
    oldPasswordInputHandler,
    oldPasswordWasTouched,
    newPassword: passwordState.newPassword,
    newPasswordInputHandler,
    newPasswordWasTouched,
    confirmButtonHandler,
    snackbarStatus: passwordState.snackbarStatus,
  };

  return (
    <ChangePassword.Provider value={context}>
      {props.children}
    </ChangePassword.Provider>
  );
}
