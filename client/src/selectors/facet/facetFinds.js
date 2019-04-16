import { createSelector } from 'reselect';
import { FacetFilters } from '../../helpers/enum/enums';
import { groupBy, merge, head, intersectionWith, isEqual } from 'lodash';

const findsSelector = (state) => state.finds.validatedFinds;
const filtersSelector = (state) => state.facetFilters;

/**
 * The main selector function for filtering all finds based on the selected facets.
 * 
 * @param {All available finds} finds 
 * @param {Selected filters} filters 
 */
const getFilteredPosts = (finds, filters) => {
  let results = [];

  if (finds && filters.length > 0) {
    const groupedFilters = groupBy(filters, (filter) => filter.criteria);
    for (let filterKey in groupedFilters) {
      let result = getFindsByCriteria(finds, filterKey, groupedFilters[filterKey]);
      if (results.length == 0) {
        results = merge(results, result);
      } else {
        results = intersectionWith(results, result, isEqual);
      }
    }
  } else {
    results = finds;
  }

  return results;
};

/**
 * Filter find by selected criteria
 * 
 * @param {All available finds} finds 
 * @param {The key of the selected filter} filterKey 
 * @param {Selected filters} filters 
 */
const getFindsByCriteria = (finds, filterKey, filters) => {
  const result = [];

  for (let find of finds) {
    if (filterKey === FacetFilters.TITLE) {
      filterByTitle(find, filters) && result.push(filterByTitle(find, filters));
    } else {
      for (let f of filters) {
        filterByOthers(find, f) && result.push(filterByOthers(find, f));
      }
    }
  }

  return result;
};

/**
 * Filter the given find by the title
 * @param {The key of the selected filter} filterKey 
 * @param {Selected filters} filters 
 */
const filterByTitle = (find, filters) => {
  if (find.title.value.toLowerCase().includes(head(filters).label.toLowerCase())) {
    return find;
  }
};

/**
 * Filter the given find by the other attributes than title
 * @param {The key of the selected filter} filterKey 
 * @param {Selected filters} filters 
 */
const filterByOthers = (find, filter) => {
  if (find[filter.criteria]) {
    if (find[filter.criteria].value === filter.label) {
      return find;
    }
  }
};

export default createSelector(
  findsSelector,
  filtersSelector,
  getFilteredPosts
);