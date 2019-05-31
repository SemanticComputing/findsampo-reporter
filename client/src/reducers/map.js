import { 
  MAP_FETCH_DATA_SUCCESS,
  MAP_START_SPINNER,
  MAP_FETCH_DATA_FAIL
} from '../constants/actionTypes';

const initialState = {
  fetchResults: null,
  fetchInProgress: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MAP_START_SPINNER:
      return {
        ...state,
        fetchInProgress: true
      };
    case MAP_FETCH_DATA_SUCCESS:
      return {
        ...state,
        fetchResults: action.payload,
        fetchInProgress: false
      };
    case MAP_FETCH_DATA_FAIL:
      return {
        ...state,
        fetchInProgress: false
      };
    default:
      return state;
  }
};