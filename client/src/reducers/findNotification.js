import update from 'immutability-helper';
import { ReportStatuses, SmartHelpers } from '../helpers/enum/enums';
import {
  FIND_NOTIFICATION_SET_DATE,
  FIND_NOTIFICATION_SET_COORDS,
  REPORT_CHANGE_QUESTION,
  FIND_NOTIFICATION_SET_FIND_ADDITIONAL_MATERIALS,
  FIND_NOTIFICATION_CHANGE_FIND_INDEX,
  FIND_NOTIFICATION_SET_FIND_TYPE,
  FIND_NOTIFICATION_SET_FIND_MATERIAL,
  FIND_NOTIFICATION_SET_FIND_TIMING,
  FIND_NOTIFICATION_SET_FIND_DEPTH,
  FIND_NOTIFICATION_SET_MUNICIPALITY_SUCCESS,
  FIND_NOTIFICATION_SEND_SUCCESS,
  FIND_NOTIFICATION_SET_STATUS_TO_AWAIT_REVIEW,
  FIND_NOTIFICATION_RESET,
  MY_FINDS_CONTINUE_FILLING_OUT,
  FIND_NOTIFICATION_SKIP_HELP_TUTORIAL_STEPS,
  FIND_NOTIFICATION_SET_FIND_PHOTOS_SUCCESS,
  FIND_NOTIFICATION_SET_FIND_SITE_PHOTOS_SUCCESS,
  FIND_NOTIFICATION_SET_NEARBY_SMART_HELP,
  FIND_NOTIFICATION_SET_PROPERTY_SMART_HELP_SUCCESS
} from '../constants/actionTypes';

const initialState = {
  reportId: null,
  status: ReportStatuses.DRAFT,
  currentStep: 0,
  currentFindIndex: 0,
  date: new Date(),
  municipality: null,
  finds: [],
  smartHelper: {
    nearbyFinds: {
      data: []
    },
    material: {
      nearby: {},
      overall: {}
    },
    type: {
      nearby: {},
      overall: {}
    },
    period: {
      nearby: {},
      overall: {}
    },
    activeHelper: null
  }
};

const DEFAULT_STEP_WITHOUT_HELP = 3;

export default (state = initialState, action) => {
  switch (action.type) {
    case FIND_NOTIFICATION_SET_COORDS:
      // If there is no coordinates then create a new one
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
              findSite: {
                $merge: { coords: action.coords }
              }
            }
          }
        });
      }
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
    case FIND_NOTIFICATION_SET_FIND_SITE_PHOTOS_SUCCESS: {
      const { currentFindIndex, uploads } = action.payload.data;
      const currentPhotos = !state.finds[currentFindIndex].findSite.photos ? [] : state.finds[currentFindIndex].findSite.photos;
      return update(state, {
        finds: {
          [currentFindIndex]: {
            findSite: {
              photos: {
                $set: [...currentPhotos, ...uploads],
              }
            }
          }
        }
      });
    }
    case FIND_NOTIFICATION_SET_FIND_PHOTOS_SUCCESS: {
      const { currentFindIndex, uploads } = action.payload.data;
      // If there is no photos then create a new objet
      if (!state.finds[currentFindIndex].photos) {
        return update(state, {
          finds: {
            [currentFindIndex]: {
              photos: { $set: uploads }
            }
          }
        });
      } else { // if there is already, update it
        return update(state, {
          finds: {
            [currentFindIndex]: {
              photos: {
                $set: [...state.finds[currentFindIndex].photos, ...uploads],
              }
            }
          }
        });
      }
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
    case FIND_NOTIFICATION_SET_MUNICIPALITY_SUCCESS: {
      const city = action.payload.data.Response.View.length > 0 ?
        action.payload.data.Response.View[0].Result[0].Location.Address.City :
        'NotFound';
      return {
        ...state, // Check here maps reverse geocoding pages for more information
        municipality: city
      };
    }
    case FIND_NOTIFICATION_SEND_SUCCESS:
      return {
        ...state,
        reportId: action.payload.data.reportId
      };
    case FIND_NOTIFICATION_SET_STATUS_TO_AWAIT_REVIEW:
      return {
        ...state,
        status: ReportStatuses.AWAIT_REVIEW
      };
    case MY_FINDS_CONTINUE_FILLING_OUT:
      return action.report;
    case FIND_NOTIFICATION_SKIP_HELP_TUTORIAL_STEPS:
      return {
        ...state,
        currentStep: DEFAULT_STEP_WITHOUT_HELP
      };
    case FIND_NOTIFICATION_SET_NEARBY_SMART_HELP:
      return update(state, {
        smartHelper: {
          nearbyFinds: {
            data: {
              $set: [...state.smartHelper.nearbyFinds.data, ...action.payload],
            }
          },
          activeHelper: {
            $set: SmartHelpers.NEARBY_HELPER
          }
        }
      });
    case FIND_NOTIFICATION_SET_PROPERTY_SMART_HELP_SUCCESS: {
      const { property, nearByData, summaryHelpData } = action.payload;
      const findProperty = property === 'main_material' ? SmartHelpers.MATERIAL_HELPER
        : property === 'type' ? SmartHelpers.TYPE_HELPER
          : SmartHelpers.PERIOD_HELPER;

      return update(state, {
        smartHelper: {
          [findProperty]: {
            nearby: {
              $set: nearByData,
            },
            overall: {
              $set: summaryHelpData,
            }
          },
          activeHelper: {
            $set: findProperty
          }
        }
      });
    }
    case FIND_NOTIFICATION_RESET:
      return initialState;
    default:
      return state;
  }
};