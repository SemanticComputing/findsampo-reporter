import initalState from '../helpers/data/report';
import { REPORT_CHANGE_QUESTION, FIND_NOTIFICATION_RESET } from '../constants/actionTypes';

const DEFAULT_CURRENT_STEP = 0;

export default (state = initalState, action) => {
  switch (action.type) {
    case REPORT_CHANGE_QUESTION:
      return {
        ...state,
        currentStep: action.step
      };
    case FIND_NOTIFICATION_RESET:
      return {
        ...state,
        currentStep: DEFAULT_CURRENT_STEP
      };
    default:
      return state;
  }
};