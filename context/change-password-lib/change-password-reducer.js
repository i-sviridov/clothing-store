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
          errorMessage:
            isNotSevenCharLong(action.data) &&
            state.newPassword.wasTouched &&
            'Password should be at least 7 characters long',
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
          errorMessage:
            isNotSevenCharLong(state.newPassword.value) &&
            'Password should be at least 7 characters long',
        },
      };
    }
  }
  if (action.type === 'confirm-button-clicked') {
    return {
      ...state,
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
    };
  }

  if (action.field === 'snackbar-status') {
    if (action.type === 'start-loading') {
      return {
        ...state,
        snackbarStatus: 'loading',
      };
    }
    if (action.type === 'end-loading') {
      return {
        ...state,
        snackbarStatus: null,
      };
    }
    if (action.type === 'success') {
      return {
        ...state,
        snackbarStatus: 'success',
      };
    }
    if (action.type === 'error') {
      return {
        ...state,
        snackbarStatus: 'error',
      };
    }
  }

  if (action.field === 'error') {
    if (action.type === 'old-password') {
      return {
        ...state,
        oldPassword: {
          value: state.oldPassword.value,
          hasError: true,
          wasTouched: true,
          errorMessage: action.errorMessage,
        },
      };
    }
    if (action.type === 'new-password') {
      return {
        ...state,
        newPassword: {
          value: state.newPassword.value,
          hasError: true,
          wasTouched: true,
          errorMessage: action.errorMessage,
        },
      };
    }
  }
}
