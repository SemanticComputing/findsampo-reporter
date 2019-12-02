import { createLogic } from 'redux-logic';
import axios from 'axios';
import {
  MY_FINDS_GET_REPORTS,
  MY_FINDS_GET_REPORTS_SUCCESS,
  MY_FINDS_GET_REPORTS_FAIL,
  MY_FINDS_GET_CERTAIN_FINDS,
  MY_FINDS_GET_CERTAIN_FINDS_SUCESS,
  MY_FINDS_GET_CERTAIN_FINDS_FAIL
} from '../constants/actionTypes';

const MY_FINDS_END_POINT = '/api/v1/myfinds';
const headers = {
  'Cache-Control': 'no-store'
};

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
      params: { uid: getState().auth.uid },
      headers
    });
  }
});


/**
 * Get certain finds by id
 */
const getCertainFinds = createLogic({
  type: MY_FINDS_GET_CERTAIN_FINDS,
  latest: true,

  async process({ action }, dispatch, done) {
    await axios.post(MY_FINDS_END_POINT, { finds: action.finds }, { headers })
      .then((result) => {
        dispatch({ type: MY_FINDS_GET_CERTAIN_FINDS_SUCESS, result, index: action.index });
      })
      .catch((error) => {
        dispatch({ type: MY_FINDS_GET_CERTAIN_FINDS_FAIL, error });
      })
      .then(() => done());
  }
});

export default [
  getMyFinds,
  getCertainFinds
];