import { createLogic } from 'redux-logic';
import axios from 'axios';
import {
  MY_FINDS_GET_REPORTS,
  MY_FINDS_GET_REPORTS_SUCCESS,
  MY_FINDS_GET_REPORTS_FAIL
} from '../constants/actionTypes';

const MY_FINDS_END_POINT = '/api/v1/myfinds';

const getMyFinds = createLogic({
  type: MY_FINDS_GET_REPORTS,
  latest: true,

  processOptions: {
    dispatchReturn: true,
    successType: MY_FINDS_GET_REPORTS_SUCCESS,
    failType: MY_FINDS_GET_REPORTS_FAIL,
  },

  async process({ getState }) {
    return await axios.get(MY_FINDS_END_POINT, {
      params: { uid: getState().auth.uid }
    });
  }
});

export default [
  getMyFinds
];