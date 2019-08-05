import {
  MY_FINDS_GET_REPORTS,
  MY_FINDS_GET_CERTAIN_FINDS
} from '../constants/actionTypes';

export const getMyFinds = () => ({
  type: MY_FINDS_GET_REPORTS
});

export const getCertainFinds = (index, finds) => ({
  type: MY_FINDS_GET_CERTAIN_FINDS,
  index,
  finds
});
