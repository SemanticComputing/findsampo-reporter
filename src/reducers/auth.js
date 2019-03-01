import { AUTH_LOGIN_SUCCESS, AUTH_LOGOUT_SUCCESS, AUTH_LOGIN_LOGGED_USER } from '../constants/actionTypes';

const initialState = {
  authError: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        uid: action.payload.user.uid,
        email: action.payload.user.email,
        displayName: action.payload.user.displayName
      };
    case AUTH_LOGOUT_SUCCESS:
      return {};
    case AUTH_LOGIN_LOGGED_USER:
      return {
        ...state,
        uid: action.credentials.uid,
        email: action.credentials.email,
        displayName: action.credentials.displayName
      };
    default:
      return state;
  }
};