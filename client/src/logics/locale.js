import { createLogic } from 'redux-logic';
import intl from 'react-intl-universal';
import localeFI from '../translations/localeFI';
import localeEN from '../translations/localeEN';
import localeSV from '../translations/localeSV';
import { LOCALE_SET, LOCALE_SET_SUCCESS } from '../constants/actionTypes';

const locales = {
  'fi': localeFI,
  'en': localeEN,
  'sv': localeSV
};

const setLocale = createLogic({
  type: LOCALE_SET,
  latest: true,

  process({ action }, dispatch, done) {
    intl.init({
      commonLocaleDataUrls: {
        fi: 'https://g.alicdn.com/react-intl-universal/locale-data/1.0.0/fi.js',
        en: 'https://g.alicdn.com/react-intl-universal/locale-data/1.0.0/en.js',
        sv: 'https://g.alicdn.com/react-intl-universal/locale-data/1.0.0/sv.js',
      },
      currentLocale: action.locale,
      locales,
    }).then(() => {
      dispatch({
        type: LOCALE_SET_SUCCESS,
        locale: action.locale
      });
      done();
    });
  }
});

export default [
  setLocale
];