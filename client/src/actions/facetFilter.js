import {
  FACET_FILTER_SET,
  FACET_FILTER_EMPTY,
  FACET_FILTER_REMOVE,
  FACET_FILTER_PANEL_SET,
  FACET_FILTER_PANEL_REMOVE
} from '../constants/actionTypes';

export const setFacetFilter = (filter) => ({
  type: FACET_FILTER_SET,
  filter
});

export const removeFacetFilter = (filter) => ({
  type: FACET_FILTER_REMOVE,
  filter
});

export const emptyFacetFilter = () => ({
  type: FACET_FILTER_EMPTY
});

export const setFacetFilterPanel = (filterPanel) => ({
  type: FACET_FILTER_PANEL_SET,
  filterPanel
});

export const removeFacetFilterPanel = (filterPanel) => ({
  type: FACET_FILTER_PANEL_REMOVE,
  filterPanel
});
