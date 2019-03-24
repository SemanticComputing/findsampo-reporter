import { REPORT_CHANGE_QUESTION } from '../constants/actionTypes';

export const changeQuestion = (step) => ({
  type: REPORT_CHANGE_QUESTION,
  step
});