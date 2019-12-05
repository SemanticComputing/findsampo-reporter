import {
  MY_FINDS_GET_REPORTS,
  MY_FINDS_GET_CERTAIN_FINDS,
  MY_FINDS_CONTINUE_FILLING_OUT,
  MY_FINDS_ORDER_REPORTS
} from '../constants/actionTypes';

export const getMyFinds = () => ({
  type: MY_FINDS_GET_REPORTS
});

export const getCertainFinds = (index, finds) => ({
  type: MY_FINDS_GET_CERTAIN_FINDS,
  index,
  finds
});

export const continueFillingOut = (report) => ({
  type: MY_FINDS_CONTINUE_FILLING_OUT,
  report
});

export const orderMyReports = (filter) => ({
  type: MY_FINDS_ORDER_REPORTS,
  filter
});
