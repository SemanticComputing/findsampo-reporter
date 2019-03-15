import {
  FIND_NOTIFICATION_SET_DATE,
  FIND_NOTIFICATION_SET_COORDS,
  REPORT_CHANGE_QUESTION
} from '../constants/actionTypes';

const initialState = {
  status: 'draft',
  currentStep: 0,
  findSiteCoords: null,
  date: new Date(),
  additionalMaterials: null,
  photoghraphs: null,
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
    default:
      return state;
  }
};