import {
  FIND_NOTIFICATION_SET_DATE,
  FIND_NOTIFICATION_SET_COORDS,
  FIND_NOTIFICATION_SET_FIND_PHOTOS,
  FIND_NOTIFICATION_SET_FIND_SITE_PHOTOS,
  FIND_NOTIFICATION_SET_FIND_ADDITIONAL_MATERIALS,
  FIND_NOTIFICATION_CHANGE_FIND_INDEX,
  FIND_NOTIFICATION_SET_FIND_TYPE,
  FIND_NOTIFICATION_SET_FIND_MATERIAL,
  FIND_NOTIFICATION_SET_FIND_TIMING,
  FIND_NOTIFICATION_SET_FIND_DEPTH,
  FIND_NOTIFICATION_SET_MUNICIPALITY,
  FIND_NOTIFICATION_SET_STATUS_TO_AWAIT_REVIEW,
  FIND_NOTIFICATION_RESET,
  FIND_NOTIFICATION_SKIP_HELP_TUTORIAL_STEPS,
  FIND_NOTIFICATION_SET_PROPERTY_SMART_HELP,
  FIND_NOTIFICATION_SET_REPORT_ID,
  FIND_NOTIFICATION_DELETE_PHOTO
} from '../constants/actionTypes';

export const setDate = (date) => ({
  type: FIND_NOTIFICATION_SET_DATE,
  date
});

export const setCoordinates = (coords, index) => ({
  type: FIND_NOTIFICATION_SET_COORDS,
  index,
  coords,
  [index]: {
    findSite: {
      coords
    }
  }
});

export const setFindPhotos = (photos, index, imgIndex) => ({
  type: FIND_NOTIFICATION_SET_FIND_PHOTOS,
  index,
  [index]: {
    photos: [...photos]
  },
  imgIndex
});

export const changeFindIndex = (index) => ({
  type: FIND_NOTIFICATION_CHANGE_FIND_INDEX,
  index
});

export const setFindSitePhotos = (photos, index, imgIndex) => ({
  type: FIND_NOTIFICATION_SET_FIND_SITE_PHOTOS,
  index,
  [index]: {
    photos: [...photos]
  },
  imgIndex
});

export const setAdditionalMaterial = (additionalMaterials, index) => ({
  type: FIND_NOTIFICATION_SET_FIND_ADDITIONAL_MATERIALS,
  additionalMaterials,
  index
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

export const setMunicipality = (coords) => ({
  type: FIND_NOTIFICATION_SET_MUNICIPALITY,
  coords
});

export const setStatusToAwaitReview = () => ({
  type: FIND_NOTIFICATION_SET_STATUS_TO_AWAIT_REVIEW
});

export const setPropertySmartData = (property) => ({
  type: FIND_NOTIFICATION_SET_PROPERTY_SMART_HELP,
  property
});

export const skipHelpTutorialSteps = () => ({
  type: FIND_NOTIFICATION_SKIP_HELP_TUTORIAL_STEPS
});

export const resetFindNotification = () => ({
  type: FIND_NOTIFICATION_RESET
});

export const setReportId = (id) => ({
  type: FIND_NOTIFICATION_SET_REPORT_ID,
  id
});

export const deletePhotos = (photoIds, currentFindIndex, photoIndex, photoType) => ({
  type: FIND_NOTIFICATION_DELETE_PHOTO,
  photoIds,
  currentFindIndex,
  photoIndex,
  photoType
});