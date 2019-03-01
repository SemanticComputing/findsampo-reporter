import { createLogic } from 'redux-logic';
import firebase, { googleAuthProvider } from '../firebase/firebase';
import {
  AUTH_START_GOOGLE_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_START_EMAIL_LOGIN,
  AUTH_LOGOUT,
  AUTH_LOGOUT_SUCCESS
} from '../constants/actionTypes';

const startGoogleLogin = createLogic({
  type: AUTH_START_GOOGLE_LOGIN,
  latest: true,

  processOptions: {
    dispatchReturn: true,
    successType: AUTH_LOGIN_SUCCESS
  },

  process() {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  }
});

const startEmailLogin = createLogic({
  type: AUTH_START_EMAIL_LOGIN,
  latest: true,

  processOptions: {
    dispatchReturn: true,
    successType: AUTH_LOGIN_SUCCESS
  },

  process({ action }) {
    return firebase.auth().signInWithEmailAndPassword(
      action.credentials.email,
      action.credentials.password
    );
  }
});

const logout = createLogic({
  type: AUTH_LOGOUT,
  latest: true,

  processOptions: {
    dispatchReturn: true,
    successType: AUTH_LOGOUT_SUCCESS
  },

  process() {
    return firebase.auth().signOut();
  }
});


export default [
  startGoogleLogin,
  startEmailLogin,
  logout
];