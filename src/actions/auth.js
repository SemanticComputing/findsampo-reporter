import {
  AUTH_START_GOOGLE_LOGIN,
  AUTH_START_EMAIL_LOGIN,
  AUTH_LOGOUT,
  AUTH_LOGIN_LOGGED_USER,
  AUTH_SIGNUP
} from '../constants/actionTypes';

// Auth Login
export const startGoogleLogin = () => {
  return ({
    type: AUTH_START_GOOGLE_LOGIN
  });
};

export const startEmailLogin = (credentials) => {
  return ({
    type: AUTH_START_EMAIL_LOGIN,
    credentials
  });
};

export const loginLoggedUser = (credentials) => {
  return ({
    type: AUTH_LOGIN_LOGGED_USER,
    credentials
  });
};

export const logout = () => ({
  type: AUTH_LOGOUT
});

// Auth Signup
export const signup = (credentials) => {
  return ({
    type: AUTH_SIGNUP,
    credentials
  });
};
