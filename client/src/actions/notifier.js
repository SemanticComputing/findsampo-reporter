import {
  NOTIFIER_ENQUEUE_SNACKBAR,
  NOTIFIER_REMOVE_SNACKBAR,
  NOTIFIER_CHANGE_STATUS
} from '../constants/actionTypes';

export const enqueueSnackbar = notification => ({
  type: NOTIFIER_ENQUEUE_SNACKBAR,
  notification: {
    key: new Date().getTime() + Math.random(),
    ...notification,
  },
});

export const removeSnackbar = (key) => ({
  type: NOTIFIER_REMOVE_SNACKBAR,
  key,
});

export const changeSnipperStatus = (status) => ({
  type: NOTIFIER_CHANGE_STATUS,
  status,
});

