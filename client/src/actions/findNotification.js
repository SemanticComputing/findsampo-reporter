import {
  FIND_NOTIFICATION_SET_DATE,
  FIND_NOTIFICATION_SET_COORDS,
  FIND_NOTIFICATION_SET_FIND_PHOTOS,
  FIND_NOTIFICATION_SET_FIND_SITE_PHOTOS,
  FIND_NOTIFICATION_SET_ADDITIONAL_MATERIALS,
  FIND_NOTIFICATION_CHANGE_FIND_INDEX,
  FIND_NOTIFICATION_SET_FIND_TYPE,
  FIND_NOTIFICATION_SET_FIND_MATERIAL,
  FIND_NOTIFICATION_SET_FIND_TIMING,
  FIND_NOTIFICATION_SET_FIND_DEPTH
} from '../constants/actionTypes';

export const setDate = (date) => ({
  type: FIND_NOTIFICATION_SET_DATE,
  date
});

export const setCoordinates = (coords) => ({
  type: FIND_NOTIFICATION_SET_COORDS,
  coords
});

export const setFindPhotos = (photos, index) => ({
  type: FIND_NOTIFICATION_SET_FIND_PHOTOS,
  index,
  [index]: {
    photos
  }
});

export const changeFindIndex = (index) => ({
  type: FIND_NOTIFICATION_CHANGE_FIND_INDEX,
  index
});

export const setFindSitePhotos = (photos) => ({
  type: FIND_NOTIFICATION_SET_FIND_SITE_PHOTOS,
  photos
});

export const setAdditionalMaterial = (text) => ({
  type: FIND_NOTIFICATION_SET_ADDITIONAL_MATERIALS,
  text
});

export const setFindType = (findType, index) => ({
  type: FIND_NOTIFICATION_SET_FIND_TYPE,
  findType,
  index
});

export const setFindMaterial = (findMaterial, index) => ({
  type: FIND_NOTIFICATION_SET_FIND_MATERIAL,
  findMaterial,
  index
});

export const setFindTiming = (findTiming, index) => ({
  type: FIND_NOTIFICATION_SET_FIND_TIMING,
  findTiming,
  index
});

export const setFindDepth = (findDepth, index) => ({
  type: FIND_NOTIFICATION_SET_FIND_DEPTH,
  findDepth,
  index
});

