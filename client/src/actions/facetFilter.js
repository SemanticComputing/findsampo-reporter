import {
  FACET_FILTER_SET,
  FACET_FILTER_EMPTY,
  FACET_FILTER_REMOVE
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
