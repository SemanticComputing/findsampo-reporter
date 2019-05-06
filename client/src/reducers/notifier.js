import { 
  NOTIFIER_ENQUEUE_SNACKBAR, 
  NOTIFIER_REMOVE_SNACKBAR,
  NOTIFIER_CHANGE_STATUS
} from '../constants/actionTypes';

const defaultState = {
  notifications: [],
  isLoading: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case NOTIFIER_ENQUEUE_SNACKBAR:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            ...action.notification,
          },
        ],
      };
    case NOTIFIER_REMOVE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.key !== action.key,
        ),
      };
    case NOTIFIER_CHANGE_STATUS:
      return {
        ...state,
        isLoading: action.status
      };
    default:
      return state;
  }
};
