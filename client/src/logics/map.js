import { createLogic } from 'redux-logic';
import axios from 'axios';
import {
  MAP_FETCH_DATA,
  MAP_FETCH_DATA_SUCCESS,
  MAP_FETCH_DATA_FAIL
} from '../constants/actionTypes';


const fetchWMTSData = createLogic({
  type: MAP_FETCH_DATA,
  latest: true,
  debounce: 1000,
  throttle: 2000,

  processOptions: {
    dispatchReturn: true,
    successType: MAP_FETCH_DATA_SUCCESS,
    failType: MAP_FETCH_DATA_FAIL
  },

  async process({ action }) {
    const boxBounds = `${action.bounds._southWest.lng},${action.bounds._southWest.lat},${action.bounds._northEast.lng},${action.bounds._northEast.lat}`;
    const requests = [];

    // Create urls for the requests
    for (let layer of action.layers) {
      let url = `/api/v1/fha_wfs?layer=${layer}&boxBounds=${boxBounds}`;
      requests.push(url);
    }

    try {
      const response = await axios.all(requests.map((e) => (axios.get(e))));
      const responseArray = response.map((r) => ({ layer: r.request.responseURL.match('layer=(.*)&')[1], data: r.data }));
      return responseArray;
    } catch (error) {
      console.error(error);
    }
  }
});

export default [
  fetchWMTSData
];