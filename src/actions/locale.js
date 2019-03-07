import { LOCALE_SET } from '../constants/actionTypes';

export const setLocale = (locale) => ({
  type: LOCALE_SET,
  locale
});