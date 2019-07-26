import { createLogic } from 'redux-logic';
import axios from 'axios';
import {
  REPORT_GET,
  REPORT_POST,
  REPORT_DELETE,
  FIND_NOTIFICATION_SEND_SUCCESS,
  FIND_NOTIFICATION_DELETION_SUCCESS
} from '../constants/actionTypes';

const REPORT_END_POINT = '/api/v1/report';

const getReport = createLogic({
  type: REPORT_GET,
  latest: true,

  processOptions: {
    dispatchReturn: true,
  },

  async process() {
    return await axios.get(REPORT_END_POINT);
  }
});

const postReport = createLogic({
  type: REPORT_POST,
  latest: true,

  processOptions: {
    dispatchReturn: true,
    successType: FIND_NOTIFICATION_SEND_SUCCESS,
  },

  async process({ getState }) {
    return await axios.post(REPORT_END_POINT,
      {
        user: {
          uid: getState().auth.uid,
          email: getState().auth.email
        },
        data: getState().findNotification
      });
  }
});

const deleteReport = createLogic({
  type: REPORT_DELETE,
  latest: true,

  processOptions: {
    successType: FIND_NOTIFICATION_DELETION_SUCCESS,
    dispatchReturn: true,
  },

  async process({ getState }) {
    if (getState().findNotification.reportId) {
      return await axios.put(REPORT_END_POINT, { reportId: getState().findNotification.reportId });
    }
  }
});

export default [
  getReport,
  postReport,
  deleteReport
];