import {
  FIND_NOTIFICATION_SET_DATE,
  FIND_NOTIFICATION_SET_COORDS
} from '../constants/actionTypes';

export const setDate = (date) => ({
  type: FIND_NOTIFICATION_SET_DATE,
  date
});

export const setCoordinates = (coords) => ({
  type: FIND_NOTIFICATION_SET_COORDS,
  coords
});