import { isEmpty } from '../../lib/helper-functions';
import { isNotSevenCharLong } from '../../lib/helper-functions';

export default function authReducer(state, action) {
  if (action.field === 'username') {
    if (action.type === 'input-typing') {
      return {
        username: {
          value: action.data,
          hasError: isEmpty(action.data) && state.username.wasTouched,
          wasTouched: state.username.wasTouched,
          errorMessage:
            isEmpty(action.data) &&
            state.username.wasTouched &&
            'Username should not be empty',
        },
        password: state.password,
        logInMenu: state.logInMenu,
        loading: state.loading,
      };
    }
    if (action.type === 'was-touched') {
      return {
        username: {
          value: state.username.value,
          hasError: isEmpty(state.username.value),
          wasTouched: true,
          errorMessage:
            isEmpty(state.username.value) && 'Username should not be empty',
        },
        password: state.password,
        logInMenu: state.logInMenu,
        loading: state.loading,
      };
    }
  }
  if (action.field === 'password') {
    if (action.type === 'input-typing') {
      return {
        password: {
          value: action.data,
          hasError:
            isNotSevenCharLong(action.data) && state.password.wasTouched,
          wasTouched: state.password.wasTouched,
        },
        username: state.username,
        logInMenu: state.logInMenu,
        loading: state.loading,
      };
    }
    if (action.type === 'was-touched') {
      return {
        password: {
          value: state.password.value,
          hasError: isNotSevenCharLong(state.password.value),
          wasTouched: true,
        },
        username: state.username,
        logInMenu: state.logInMenu,
        loading: state.loading,
      };
    }
  }
  if (action.type === 'form-button-clicked') {
    return {
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
      logInMenu: state.logInMenu,
      loading: state.loading,
    };
  }
  if (action.field === 'switch-menu') {
    return {
      logInMenu: !state.logInMenu,
      username: state.username,
      password: state.password,
      loading: state.loading,
    };
  }
  if (action.field === 'error') {
    if (action.type === 'user-exists') {
      return {
        logInMenu: state.logInMenu,
        username: {
          value: state.username.value,
          hasError: true,
          wasTouched: true,
          errorMessage: 'Username already exists',
        },
        password: state.password,
        loading: state.loading,
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
