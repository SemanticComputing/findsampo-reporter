import update from 'immutability-helper';
import { orderBy } from 'lodash';

import {
  MY_FINDS_GET_REPORTS_SUCCESS,
  MY_FINDS_GET_CERTAIN_FINDS_SUCESS,
  MY_FINDS_ORDER_REPORTS,
  MY_FINDS_GET_MY_REPORTS_FINDS_SUCCESS
} from '../constants/actionTypes';

const initialState = {
  reports: [],
  findIds: [],
  finds: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MY_FINDS_GET_REPORTS_SUCCESS:
      return {
        ...state,
        reports: action.payload.data,
        findIds: getFindsFromReports(action.payload.data)
      };
    case MY_FINDS_GET_CERTAIN_FINDS_SUCESS:
      return update(state, {
        reports: {
          [action.index]: {
            findsData: {
              $set: [...action.result.data],
            }
          }
        }
      });
    case MY_FINDS_ORDER_REPORTS:
      return {
        ...state,
        reports: orderBy(state.reports, action.filter)
      };
    case MY_FINDS_GET_MY_REPORTS_FINDS_SUCCESS:
      return {
        ...state,
        finds: action.payload.data
      };
    default:
      return state;
  }
};


const getFindsFromReports = (reports) => {
  let findIds = [];
  reports.map((r) => {
    findIds = [...findIds, ...r.finds];
  });

  return findIds;
};