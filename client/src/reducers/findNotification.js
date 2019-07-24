import update from 'immutability-helper';
import {
  FIND_NOTIFICATION_SET_DATE,
  FIND_NOTIFICATION_SET_COORDS,
  REPORT_CHANGE_QUESTION,
  FIND_NOTIFICATION_SET_FIND_PHOTOS,
  FIND_NOTIFICATION_SET_FIND_SITE_PHOTOS,
  FIND_NOTIFICATION_SET_FIND_ADDITIONAL_MATERIALS,
  FIND_NOTIFICATION_CHANGE_FIND_INDEX,
  FIND_NOTIFICATION_SET_FIND_TYPE,
  FIND_NOTIFICATION_SET_FIND_MATERIAL,
  FIND_NOTIFICATION_SET_FIND_TIMING,
  FIND_NOTIFICATION_SET_FIND_DEPTH
} from '../constants/actionTypes';

const initialState = {
  status: 'draft',
  currentStep: 0,
  currentFindIndex: 0,
  findSiteCoords: null,
  date: new Date(),
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
      // If there is no photos then create a new objet
      if (!state.finds[action.index]) {
        return (
          {
            ...state,
            finds: [...state.finds, action[action.index]]
          }
        );
      } else { // if there is already, update it
        return update(state, {
          finds: {
            [action.index]: {
              photos: { $set: [...state.finds[action.index].photos, ...action[action.index].photos] }
            }
          }
        });
      }
    case FIND_NOTIFICATION_SET_FIND_ADDITIONAL_MATERIALS:
      return update(state, {
        finds: {
          [action.index]: {
            $merge: { additionalMaterials: action.additionalMaterials }
          }
        }
      });
    case FIND_NOTIFICATION_CHANGE_FIND_INDEX:
      return {
        ...state,
        currentFindIndex: action.index
      };
    case FIND_NOTIFICATION_SET_FIND_TYPE:
      return update(state, {
        finds: {
          [action.index]: {
            $merge: { type: action.findType }
          }
        }
      });
    case FIND_NOTIFICATION_SET_FIND_MATERIAL:
      return update(state, {
        finds: {
          [action.index]: {
            $merge: { material: action.findMaterial }
          }
        }
      });
    case FIND_NOTIFICATION_SET_FIND_TIMING:
      return update(state, {
        finds: {
          [action.index]: {
            $merge: { timing: action.findTiming }
          }
        }
      });
    case FIND_NOTIFICATION_SET_FIND_DEPTH:
      return update(state, {
        finds: {
          [action.index]: {
            $merge: { depth: action.findDepth }
          }
        }
      });
    default:
      return state;
  }
};