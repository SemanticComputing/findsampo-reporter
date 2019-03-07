import { LOCALE_SET_SUCCESS } from '../constants/actionTypes';

// If language is not defined and it is not in localstorage
// then default lang is lang
const initialState = {
  locale: 'en'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOCALE_SET_SUCCESS:
      return action.locale;
    default:
      return state;
  }
};