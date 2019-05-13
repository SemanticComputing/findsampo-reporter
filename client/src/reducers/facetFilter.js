import {
  FACET_FILTER_SET,
  FACET_FILTER_EMPTY,
  FACET_FILTER_REMOVE,
  FACET_FILTER_PANEL_SET,
  FACET_FILTER_PANEL_REMOVE
} from '../constants/actionTypes';

const TITLE_CRITERIA = 'title';

const initialState = {
  activeFilters: [],
  activeFilterPanels: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FACET_FILTER_SET:
      if (action.filter.criteria === TITLE_CRITERIA) {
        return {
          ...state,
          activeFilters: [
            ...state.activeFilters.filter((f) => (f.criteria !== action.filter.criteria)),
            action.filter
          ]
        };
      }
      return {
        ...state,
        activeFilters: [
          ...state.activeFilters,
          action.filter
        ]
      };
    case FACET_FILTER_REMOVE:
      if (action.filter.criteria === TITLE_CRITERIA) {
        return {
          ...state,
          activeFilters: state.activeFilters.filter((f) => (f.criteria !== action.filter.criteria))
        };
      }
      return {
        ...state,
        activeFilters: state.activeFilters.filter((f) => (
          f.label !== action.filter.label ||
          (f.label === action.filter.label && f.criteria !== action.filter.criteria))
        )
      };
    case FACET_FILTER_EMPTY:
      return {
        ...state,
        activeFilters: []
      };
    case FACET_FILTER_PANEL_SET:
      return {
        ...state,
        activeFilterPanels: [
          ...state.activeFilterPanels,
          action.filterPanel
        ]
      };
    case FACET_FILTER_PANEL_REMOVE:
      return {
        ...state,
        activeFilterPanels: state.activeFilterPanels.filter((f) => (f !== action.filterPanel))
      };
    default:
      return state;
  }
};