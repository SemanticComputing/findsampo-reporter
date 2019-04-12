import {
  FACET_FILTER_SET,
  FACET_FILTER_EMPTY,
  FACET_FILTER_REMOVE
} from '../constants/actionTypes';

const TITLE_CRITERIA = 'title';

export default (state = [], action) => {
  switch (action.type) {
    case FACET_FILTER_SET:
      if (action.filter.criteria === TITLE_CRITERIA) {
        return [
          ...state.filter((f) => (f.criteria !== action.filter.criteria)),
          action.filter,
        ];
      }
      return [
        ...state,
        action.filter,
      ];
    case FACET_FILTER_REMOVE:
      if (action.filter.criteria === TITLE_CRITERIA) {
        return state.filter((f) => (f.criteria !== action.filter.criteria));
      }
      return state.filter((f) => (
        f.label !== action.filter.label ||
        (f.label === action.filter.label && f.criteria !== action.filter.criteria))
      );
    case FACET_FILTER_EMPTY:
      return [];
    default:
      return state;
  }
};