import initialReport from '../helpers/data/report';
import { REPORT_CHANGE_QUESTION } from '../constants/actionTypes';

const initialState = initialReport;

export default (state = initialState, action) => {
  switch (action.type) {
    case REPORT_CHANGE_QUESTION:
      console.log(action);
      return {
        ...state,
        currentStep: action.step
      };
    default:
      return state;
  }
};