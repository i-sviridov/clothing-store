import { isEmpty } from './auth-helper-functions';
import { isNotSevenCharLong } from './auth-helper-functions';

export default function authReducer(state, action) {
  if (action.field === 'username') {
    if (action.type === 'input-typing') {
      return {
        username: {
          value: action.data,
          hasError: isEmpty(action.data) && state.username.wasTouched,
          wasTouched: state.username.wasTouched,
        },
        password: state.password,
        logInMenu: state.logInMenu,
      };
    }
    if (action.type === 'was-touched') {
      return {
        username: {
          value: state.username.value,
          hasError: isEmpty(state.username.value),
          wasTouched: true,
        },
        password: state.password,
        logInMenu: state.logInMenu,
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
      };
    }
  }
  if (action.field === 'button') {
    return {
      username: {
        value: state.username.value,
        hasError: state.username.value.trim() === '',
        wasTouched: true,
      },
      password: {
        value: state.password.value,
        hasError: state.password.value.trim().length < 7,
        wasTouched: true,
      },
      logInMenu: state.logInMenu,
    };
  }
  if (action.field === 'switch-menu') {
    return {
      logInMenu: !state.logInMenu,
      username: state.username,
      password: state.password,
    };
  }
}
