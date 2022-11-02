import { isNotSevenCharLong } from '../../lib/helper-functions';

export default function changePasswordReducer(state, action) {
  if (action.field === 'old-password') {
    if (action.type === 'input-typing') {
      return {
        ...state,
        oldPassword: {
          value: action.data,
          hasError:
            isNotSevenCharLong(action.data) && state.oldPassword.wasTouched,
          wasTouched: state.oldPassword.wasTouched,
          errorMessage:
            isNotSevenCharLong(action.data) &&
            state.oldPassword.wasTouched &&
            'Password should be at least 7 characters long',
        },
      };
    }
    if (action.type === 'was-touched') {
      return {
        ...state,
        oldPassword: {
          value: state.oldPassword.value,
          hasError: isNotSevenCharLong(state.oldPassword.value),
          wasTouched: true,
          errorMessage:
            isNotSevenCharLong(state.oldPassword.value) &&
            'Password should be at least 7 characters long',
        },
      };
    }
  }
  if (action.field === 'new-password') {
    if (action.type === 'input-typing') {
      return {
        ...state,
        newPassword: {
          value: action.data,
          hasError:
            isNotSevenCharLong(action.data) && state.newPassword.wasTouched,
          wasTouched: state.newPassword.wasTouched,
        },
      };
    }
    if (action.type === 'was-touched') {
      return {
        ...state,
        newPassword: {
          value: state.newPassword.value,
          hasError: isNotSevenCharLong(state.newPassword.value),
          wasTouched: true,
        },
      };
    }
  }
  if (action.type === 'confirm-button-clicked') {
    return {
      oldPassword: {
        value: state.oldPassword.value,
        hasError: state.oldPassword.value.trim().length < 7,
        errorMessage:
          isNotSevenCharLong(state.oldPassword.value) &&
          'Password should be at least 7 characters long',
        wasTouched: true,
      },
      newPassword: {
        value: state.newPassword.value,
        hasError: state.newPassword.value.trim().length < 7,
        errorMessage:
          isNotSevenCharLong(state.newPassword.value) &&
          'Password should be at least 7 characters long',
        wasTouched: true,
      },
      loading: state.loading,
    };
  }

  // if (action.field === 'old-password-error') {
  //   if (action.type === 'user-exists') {
  //     return {
  //       username: {
  //         value: state.username.value,
  //         hasError: true,
  //         wasTouched: true,
  //         errorMessage: 'Username already exists',
  //       },
  //       password: state.password,
  //       loading: state.loading,
  //     };
  //   }
  // }

  if (action.field === 'loading') {
    if (action.type === 'start') {
      return {
        ...state,
        loading: true,
      };
    }
    if (action.type === 'end') {
      return {
        ...state,
        loading: false,
      };
    }
  }
}
