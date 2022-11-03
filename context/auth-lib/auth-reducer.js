import { isEmpty } from '../../lib/helper-functions';
import { isNotSevenCharLong } from '../../lib/helper-functions';

export default function authReducer(state, action) {
  if (action.field === 'username') {
    if (action.type === 'input-typing') {
      return {
        ...state,
        username: {
          value: action.data,
          hasError: isEmpty(action.data) && state.username.wasTouched,
          wasTouched: state.username.wasTouched,
          errorMessage:
            isEmpty(action.data) &&
            state.username.wasTouched &&
            'Username should not be empty',
        },
      };
    }
    if (action.type === 'was-touched') {
      return {
        ...state,
        username: {
          value: state.username.value,
          hasError: isEmpty(state.username.value),
          wasTouched: true,
          errorMessage:
            isEmpty(state.username.value) && 'Username should not be empty',
        },
      };
    }
  }
  if (action.field === 'password') {
    if (action.type === 'input-typing') {
      return {
        ...state,
        password: {
          value: action.data,
          hasError:
            isNotSevenCharLong(action.data) && state.password.wasTouched,
          wasTouched: state.password.wasTouched,
        },
      };
    }
    if (action.type === 'was-touched') {
      return {
        ...state,
        password: {
          value: state.password.value,
          hasError: isNotSevenCharLong(state.password.value),
          wasTouched: true,
        },
      };
    }
  }
  if (action.type === 'form-button-clicked') {
    return {
      ...state,
      username: {
        value: state.username.value,
        hasError: state.username.value.trim() === '',
        errorMessage:
          isEmpty(state.username.value) && 'Username should not be empty',
        wasTouched: true,
      },
      password: {
        value: state.password.value,
        hasError: state.password.value.trim().length < 7,
        wasTouched: true,
      },
    };
  }
  if (action.field === 'switch-menu') {
    return {
      ...state,
      logInMenu: !state.logInMenu,
    };
  }
  if (action.field === 'error') {
    if (action.type === 'user-exists') {
      return {
        ...state,
        username: {
          value: state.username.value,
          hasError: true,
          wasTouched: true,
          errorMessage: action.message,
        },
      };
    }
    if (action.type === 'no-user-found') {
      return {
        ...state,
        username: {
          value: state.username.value,
          hasError: true,
          wasTouched: true,
          errorMessage: action.message,
        },
      };
    }
    if (action.type === 'incorrect-password') {
      return {
        ...state,
        password: {
          value: state.password.value,
          hasError: true,
          wasTouched: true,
          errorMessage: action.message,
        },
      };
    }
  }
  if (action.field === 'loading') {
    if (action.type === 'start') {
      return {
        logInMenu: state.logInMenu,
        username: state.username,
        password: state.password,
        loading: true,
      };
    }
    if (action.type === 'end') {
      return {
        logInMenu: state.logInMenu,
        username: state.username,
        password: state.password,
        loading: false,
      };
    }
  }
}
