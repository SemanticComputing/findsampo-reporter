import {
  FIND_NOTIFICATION_SET_DATE,
  FIND_NOTIFICATION_SET_COORDS,
  FIND_NOTIFICATION_SET_FIND_PHOTOS,
  FIND_NOTIFICATION_SET_FIND_SITE_PHOTOS
} from '../constants/actionTypes';

export const setDate = (date) => ({
  type: FIND_NOTIFICATION_SET_DATE,
  date
});

export const setCoordinates = (coords) => ({
  type: FIND_NOTIFICATION_SET_COORDS,
  coords
});

export const setFindPhotos = (photos) => ({
  type: FIND_NOTIFICATION_SET_FIND_PHOTOS,
  photos
});

export const setFindSitePhotos = (photos) => ({
  type: FIND_NOTIFICATION_SET_FIND_SITE_PHOTOS,
  photos
});