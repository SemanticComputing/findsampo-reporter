import { MAP_FETCH_DATA_SUCCESS } from '../constants/actionTypes';

const initialState = {
  fetchResults: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MAP_FETCH_DATA_SUCCESS:
      return {
        ...state,
        fetchResults: action.payload
      };
    default:
      return state;
  }
};