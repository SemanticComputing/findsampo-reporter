import { REPORT_CHANGE_QUESTION, REPORT_GET, REPORT_POST } from '../constants/actionTypes';

export const changeQuestion = (step) => ({
  type: REPORT_CHANGE_QUESTION,
  step
});

export const getReport = () => {
  return ({
    type: REPORT_GET
  });
};

export const postReport = () => {
  return ({
    type: REPORT_POST
  });
};