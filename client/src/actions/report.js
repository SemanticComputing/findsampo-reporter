import {
  REPORT_CHANGE_QUESTION,
  REPORT_GET,
  REPORT_POST,
  REPORT_DELETE
} from '../constants/actionTypes';

export const changeQuestion = (step) => ({
  type: REPORT_CHANGE_QUESTION,
  step
});

export const getReport = () => ({
  type: REPORT_GET
});

export const postReport = (isFinalised) => ({
  type: REPORT_POST,
  isFinalised
});

export const deleteReport = () => ({
  type: REPORT_DELETE
});
