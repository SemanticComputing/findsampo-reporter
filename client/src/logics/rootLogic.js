import auth from './auth';
import locale from './locale';
import findNotification from './findNotification';
import find from './find';
import map from './map';

// Combines all logic files
export default [
  ...auth,
  ...locale,
  ...findNotification,
  ...find,
  ...map
];