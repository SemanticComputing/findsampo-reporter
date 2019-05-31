import { createLogic } from 'redux-logic';
import axios from 'axios';
import {
  FIND_NOTIFICATION_SEND,
  FIND_NOTIFICATION_SEND_SUCCESS,
  FIND_NOTIFICATION_SEND_FAIL
} from '../constants/actionTypes';

const FIND_NOTIFICATION_END_POINT = '/api/v1/findNotification';

const sendFindNotification = createLogic({
  type: FIND_NOTIFICATION_SEND,
  latest: true,

  processOptions: {
    dispatchReturn: true,
    successType: FIND_NOTIFICATION_SEND_SUCCESS,
    failType: FIND_NOTIFICATION_SEND_FAIL,
  },

  process({getState}){
    axios.post(FIND_NOTIFICATION_END_POINT, getState().findNotification);
  }
});

export default [
  sendFindNotification
];