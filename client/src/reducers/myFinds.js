import { MY_FINDS_GET_REPORTS_SUCCESS } from '../constants/actionTypes';

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
    default:
      return state;
  }
};