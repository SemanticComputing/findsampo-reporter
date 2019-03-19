import {
  FIND_NOTIFICATION_SET_DATE,
  FIND_NOTIFICATION_SET_COORDS,
  REPORT_CHANGE_QUESTION,
  FIND_NOTIFICATION_SET_FIND_PHOTOS,
  FIND_NOTIFICATION_SET_FIND_SITE_PHOTOS
} from '../constants/actionTypes';

const initialState = {
  status: 'draft',
  currentStep: 0,
  findSiteCoords: null,
  date: new Date(),
  additionalMaterials: null,
  photoghraphs: [],
  finds: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FIND_NOTIFICATION_SET_COORDS:
      return {
        ...state,
        findSiteCoords: action.coords
      };
    case FIND_NOTIFICATION_SET_DATE:
      return {
        ...state,
        date: action.date
      };
    case REPORT_CHANGE_QUESTION:
      return {
        ...state,
        currentStep: action.step
      };
    case FIND_NOTIFICATION_SET_FIND_SITE_PHOTOS:
      return {
        ...state,
        photoghraphs: [...state.photoghraphs, ...action.photos]
      };
    case FIND_NOTIFICATION_SET_FIND_PHOTOS:
      return {
        ...state,
        finds: [...state.finds, ...action.photos]
      };
    default:
      return state;
  }
};