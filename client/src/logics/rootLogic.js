import auth from './auth';
import locale from './locale';
import findNotification from './findNotification';

// Combines all logic files
export default [
  ...auth,
  ...locale,
  ...findNotification
];