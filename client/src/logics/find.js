import { createLogic } from 'redux-logic';
import axios from 'axios';
import {
  FIND_GET_VALIDATED_FINDS,
} from '../constants/actionTypes';

const FINDS_END_POINT = '/api/v1/finds';

const getValidatedFinds = createLogic({
  type: FIND_GET_VALIDATED_FINDS,
  latest: true,

  processOptions: {
    dispatchReturn: true,
  },

  process() {
    axios.get(FINDS_END_POINT);
  }
});

export default [
  getValidatedFinds
];