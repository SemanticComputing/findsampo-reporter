import auth from './auth';
import locale from './locale';

// Combines all logic files
export default [
  ...auth,
  ...locale
];