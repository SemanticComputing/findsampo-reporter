import update from 'immutability-helper';
import {
  MY_FINDS_GET_REPORTS_SUCCESS,
  MY_FINDS_GET_CERTAIN_FINDS_SUCESS
} from '../constants/actionTypes';

const initialState = {
  reports: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MY_FINDS_GET_REPORTS_SUCCESS:
      return {
        ...state,
        reports: action.payload.data
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
    default:
      return state;
  }
};