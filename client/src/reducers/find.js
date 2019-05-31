import {
  FIND_GET_VALIDATED_SUCCESS,
  FIND_GET_VALIDATED_FAIL
} from '../constants/actionTypes';


export default (state = {}, action) => {
  switch (action.type) {
    case FIND_GET_VALIDATED_SUCCESS:
      return {
        ...state,
        validatedFinds: action.payload.data
      };
    case FIND_GET_VALIDATED_FAIL:
      return state;
    default:
      return state;
  }
};