import { createLogic } from 'redux-logic';
import axios from 'axios';
import {
  REPORT_GET,
  REPORT_POST,
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
  },
  
  async process() {
    return await axios.post(REPORT_END_POINT);
  }
});

export default [
  getReport,
  postReport
];