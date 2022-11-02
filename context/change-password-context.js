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
  loading: false,
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
  loading: false,
};

export function ChangePasswordProvider(props) {
  // const router = useRouter();
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

    const oldPassword = passwordState.oldPassword.value;
    const newPassword = passwordState.newPassword.value;

    if (isNotSevenCharLong(oldPassword) || isNotSevenCharLong(newPassword)) {
      return;
    }

    dispatchPasswordAction({
      field: 'loading',
      type: 'start',
    });

    const response = await fetch('/api/change-password', {
      method: 'PATCH',
      body: JSON.stringify({ oldPassword, newPassword }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const parsedResponse = await response.json();
    console.log(parsedResponse);

    // if (passwordState.logInMenu) {
    //   const result = await signIn('credentials', {
    //     redirect: false,
    //     oldPassword,
    //     newPassword,
    //   });

    //   if (!result.error) {
    //     router.replace('/');
    //   }
    //   dispatchPasswordAction({
    //     field: 'loading',
    //     type: 'end',
    //   });
    //   return;
    // } else {

    //   const data = await response.json();

    //   if (!response.ok) {
    //     dispatchPasswordAction({
    //       field: 'old-password-error',
    //       type: data.type,
    //       message: data.message,
    //     });
    //   }

    dispatchPasswordAction({
      field: 'loading',
      type: 'end',
    });

    //   return data;
    // }
  }

  const context = {
    oldPassword: passwordState.oldPassword,
    oldPasswordInputHandler,
    oldPasswordWasTouched,
    newPassword: passwordState.newPassword,
    newPasswordInputHandler,
    newPasswordWasTouched,
    confirmButtonHandler,
    loading: passwordState.loading,
  };

  return (
    <ChangePassword.Provider value={context}>
      {props.children}
    </ChangePassword.Provider>
  );
}
