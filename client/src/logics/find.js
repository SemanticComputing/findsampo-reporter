import { createLogic } from 'redux-logic';
import axios from 'axios';
import {
  FIND_GET_VALIDATED_FINDS,
  FIND_GET_VALIDATED_SUCCESS,
  FIND_NOTIFICATION_SEND_FAIL

} from '../constants/actionTypes';

const FINDS_END_POINT = '/api/v1/finds';

const getValidatedFinds = createLogic({
  type: FIND_GET_VALIDATED_FINDS,
  latest: true,

  processOptions: {
    dispatchReturn: true,
    successType: FIND_GET_VALIDATED_SUCCESS,
    failType: FIND_NOTIFICATION_SEND_FAIL,
  },

  async process() {
    return await axios.get(FINDS_END_POINT);
  }
});

export default [
  getValidatedFinds
];