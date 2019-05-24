import { MAP_FETCH_DATA, MAP_START_SPINNER } from '../constants/actionTypes';

export const fetchMapData = (layers, bounds) => ({
  type: MAP_FETCH_DATA,
  layers,
  bounds
});

export const startMapSpinner = () => ({
  type: MAP_START_SPINNER
});