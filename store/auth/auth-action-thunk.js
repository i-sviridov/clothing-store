import { signIn } from "next-auth/react";

import { authActions } from "./auth-slice";
import { isEmpty, isNotSevenCharLong } from "../../lib/helper-functions";

export function formSubmitHandler(username, password, logInMenu, router) {
  return async (dispatch) => {
    // Initial input validation upon form submit

    dispatch(authActions.formButtonClicked());

    if (isEmpty(username) || isNotSevenCharLong(password)) {
      return;
    }

    dispatch(authActions.activateLoadingSpinner());

    // "Login with an existing accont" code

    if (logInMenu) {
      const result = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });

      if (result.error) {
        dispatch(authActions.setAuthError(result.error));
      } else {
        router.replace("/");
      }

      dispatch(authActions.disableLoadingSpinner());

      return;
    } else {
      // "Create a new account" code

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        dispatch(authActions.setAuthError(data.message));
      }

      if (response.ok) {
        const result = await signIn("credentials", {
          redirect: false,
          username,
          password,
        });
        router.replace("/");
      }
      dispatch(authActions.disableLoadingSpinner());

      return data;
    }
  };
}
