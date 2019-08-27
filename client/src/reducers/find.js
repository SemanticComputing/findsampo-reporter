import {
  FIND_GET_VALIDATED_SUCCESS,
  FIND_GET_VALIDATED_FIND_SUCCESS,
  FIND_GET_VALIDATED_FAIL
} from '../constants/actionTypes';

const initialState = {
  activeFind: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FIND_GET_VALIDATED_SUCCESS:
      return {
        ...state,
        validatedFinds: action.payload.data
      };

    case FIND_GET_VALIDATED_FIND_SUCCESS:
      return {
        ...state,
        activeFind: action.payload.data[0]
      };
    case FIND_GET_VALIDATED_FAIL:
      return state;
    default:
      return state;
  }
};