import { MAP_FETCH_DATA } from '../constants/actionTypes';

export const fetchMapData = (layers, bounds) => ({
  type: MAP_FETCH_DATA,
  layers,
  bounds
});