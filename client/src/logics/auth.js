import { createLogic } from 'redux-logic';
import firebase, { googleAuthProvider } from '../firebase/firebase';
import {
  AUTH_START_GOOGLE_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_START_EMAIL_LOGIN,
  AUTH_LOGOUT,
  AUTH_LOGOUT_SUCCESS,
  AUTH_SIGNUP,
  AUTH_SIGNUP_SUCCESS,
  NOTIFIER_CHANGE_STATUS
} from '../constants/actionTypes';
import { loginLoggedUser } from '../actions/auth';
import { enqueueSnackbar } from '../actions/notifier';

// Auth Login
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

  process({ action }, dispatch, done) {
    return firebase.auth().signInWithEmailAndPassword(
      action.credentials.email,
      action.credentials.password
    )
      .then((res) => {
        dispatch({ type: NOTIFIER_CHANGE_STATUS, status: false});
        dispatch({ type: AUTH_LOGIN_SUCCESS, payload: res });
      })
      .catch((error) => {
        dispatch({ type: NOTIFIER_CHANGE_STATUS, status: false});
        dispatch(enqueueSnackbar({
          message: error.message,
          options: {
            variant: 'error',
          },
        }));
      })
      .then(() => done());
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


// Auth Sign up
const signup = createLogic({
  type: AUTH_SIGNUP,
  latest: true,
  warnTimeout: 0,

  processOptions: {
    dispatchMultiple: true
  },

  process({ action }, dispatch) {
    return firebase.auth().createUserWithEmailAndPassword(
      action.credentials.email,
      action.credentials.password
    ).then((credential) => {
      dispatch({ type: AUTH_SIGNUP_SUCCESS });
      firebase.auth().currentUser.updateProfile({
        displayName: action.credentials.username
      }).then(() => {
        dispatch(loginLoggedUser({
          uid: credential.user.uid,
          email: credential.user.email,
          displayName: credential.user.displayName
        }));
      });
    });
  }
});

export default [
  startGoogleLogin,
  startEmailLogin,
  logout,
  signup
];