import { createLogic } from 'redux-logic';
import axios from 'axios';
import {
  REPORT_GET,
  REPORT_POST,
  REPORT_DELETE,
  FIND_NOTIFICATION_SEND_SUCCESS,
  FIND_NOTIFICATION_RESET,
  FIND_NOTIFICATION_SEND_FAIL,
  FIND_NOTIFICATION_DELETION_SUCCESS,
  NOTIFIER_CHANGE_STATUS
} from '../constants/actionTypes';
import { enqueueSnackbar } from '../actions/notifier';
import { history } from '../routers/AppRouter';
import { RouterPaths } from '../helpers/enum/enums';


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

  async process({ getState, action }, dispatch, done) {
    // If there is a report with the same id firstly delete it and then post the same report with the new attributes
    if (getState().findNotification.reportId) {
      await axios.put(REPORT_END_POINT, { reportId: getState().findNotification.reportId })
        .then(() => {
          dispatch({ type: FIND_NOTIFICATION_DELETION_SUCCESS });
          postMyReport(dispatch, getState, action, done);
        })
        .catch((error) => {
          console.log(`Deleting the report with failed with error ${error}`);
        });
    } else {
      postMyReport(dispatch, getState, action, done);
    }
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

/**
 * Helper function for posting a report
 * @param {*} dispatch 
 * @param {*} getState 
 * @param {*} action 
 * @param {*} done 
 */
const postMyReport = async (dispatch, getState, action, done) => {
  return await axios.post(REPORT_END_POINT,
    {
      user: {
        uid: getState().auth.uid,
        email: getState().auth.email
      },
      data: getState().findNotification
    })
    .then((result) => {
      dispatch({ type: FIND_NOTIFICATION_SEND_SUCCESS, payload: result });
      // If find notification is sent totally, reset it
      if (action.isFinalised) {
        // Reset notification
        dispatch({ type: FIND_NOTIFICATION_RESET });
        // Disable spinner
        dispatch({ type: NOTIFIER_CHANGE_STATUS, status: false });
        // Redirect user to my finds page
        history.push(RouterPaths.MY_FINDS_PAGE);
        // Show confirmation
        dispatch(enqueueSnackbar({
          message: 'Your report has been sent successfully!',
          options: {
            variant: 'success',
          }
        }));
      }
    })
    .catch((error) => {
      dispatch({ type: FIND_NOTIFICATION_SEND_FAIL, payload: error });
      dispatch(enqueueSnackbar({
        message: error.message,
        options: {
          variant: 'error',
        },
      }));
    })
    .then(() => done());
};

export default [
  getReport,
  postReport,
  deleteReport
];