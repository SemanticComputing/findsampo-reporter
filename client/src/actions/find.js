import {
  FIND_GET_VALIDATED_FINDS,
  FIND_GET_VALIDATED_FIND
} from '../constants/actionTypes';

export const getValidatedFinds = () => ({
  type: FIND_GET_VALIDATED_FINDS
});

export const getValidatedFind = (id) => ({
  type: FIND_GET_VALIDATED_FIND,
  id
});