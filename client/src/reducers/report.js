import initalState from '../helpers/data/report';
import { REPORT_CHANGE_QUESTION } from '../constants/actionTypes';

export default (state = initalState, action) => {
  switch (action.type) {
    case REPORT_CHANGE_QUESTION:
      return {
        ...state,
        currentStep: action.step
      };
    default:
      return state;
  }
};