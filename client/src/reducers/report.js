import initalState from '../helpers/data/report';
import {
  REPORT_CHANGE_QUESTION,
  FIND_NOTIFICATION_RESET,
  MY_FINDS_CONTINUE_FILLING_OUT,
  FIND_NOTIFICATION_SKIP_HELP_TUTORIAL_STEPS
} from '../constants/actionTypes';

const DEFAULT_CURRENT_STEP = 0;
const DEFAULT_STEP_WITHOUT_HELP = 3;

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
    case MY_FINDS_CONTINUE_FILLING_OUT:
      return {
        ...state,
        currentStep: action.report.currentStep
      };
    case FIND_NOTIFICATION_SKIP_HELP_TUTORIAL_STEPS:
      return {
        ...state,
        currentStep: DEFAULT_STEP_WITHOUT_HELP
      };
    default:
      return state;
  }
};