import { createSelector } from 'reselect';
import { FacetFilters } from '../../helpers/enum/enums';
import { groupBy, merge, head, intersectionWith, isEqual, keyBy, keys, countBy, omit, size } from 'lodash';

const findsSelector = (state) => state.finds.validatedFinds;
const filtersSelector = (state) => state.facetFilters;

/**
 * The main selector function for filtering all finds based on the selected facet filters.
 * 
 * @param {All available finds} finds 
 * @param {Selected filters} filters 
 * returns results with filter values and amounts
 */
const filterFinds = (finds, filters) => {
  let results = [];
  let searchResults = [];
  const groupedFilters = groupBy(filters, (filter) => filter.criteria); // Group filters by filter name

  // If finds are available and there are selected filters then start filtering / processing
  if (finds && filters.length > 0) {
    for (let filterKey in groupedFilters) {
      let result = getFindsByCriteria(finds, filterKey, groupedFilters[filterKey]);
      // Save search results for counting filter value amounts
      if (filterKey === FacetFilters.TITLE) {
        searchResults = results;
      }
      // If there is not result it merge otherwise intersect results
      if (results.length === 0) {
        results = merge(results, result);
      } else {
        results = intersectionWith(results, result, isEqual);
      }
    }
  } else {
    results = finds;
  }

  return {
    results,
    materials: getFilterValuesWithAmount(results, searchResults, FacetFilters.MATERIAL, finds, groupedFilters),
    types: getFilterValuesWithAmount(results, searchResults, FacetFilters.TYPE, finds, groupedFilters),
    municipalities: getFilterValuesWithAmount(results, searchResults, FacetFilters.MUNICIPALITY, finds, groupedFilters),
    periods: getFilterValuesWithAmount(results, searchResults, FacetFilters.PERIOD, finds, groupedFilters),
  };
};

/**
 * Filter find by selected criteria
 * 
 * @param {All available finds} finds 
 * @param {The name of the selected filter} filterKey 
 * @param {Array of Selected filters} filters 
 * returns filtered finds for a certain criteria
 */
const getFindsByCriteria = (finds, filterKey, filters) => {
  const result = [];
  for (let find of finds) {
    if (filterKey === FacetFilters.TITLE) {
      filterBySearchKeyword(find, filters) && result.push(filterBySearchKeyword(find, filters));
    } else {
      for (let filter of filters) {
        filterByOtherProperties(find, filter) && result.push(filterByOtherProperties(find, filter));
      }
    }
  }
  return result;
};

/**
 * Filter the given find by the search keyword
 * @param {The key of the selected filter} filterKey 
 * @param {Selected filter} filters
 */
const filterBySearchKeyword = (find, filters) => {
  if (find.title.value.toLowerCase().includes(head(filters).label.toLowerCase())) {
    return find;
  }
};

/**
 * Filter the given find by the other properties than search keyword
 * @param {The key of the selected filter} filterKey 
 * @param {Selected filter} filter 
 */
const filterByOtherProperties = (find, filter) => {
  if (find[filter.criteria]) {
    if (find[filter.criteria].value === filter.label) {
      return find;
    }
  }
};

/**
 * Gets filter values with their current amount
 * @param { Filtered finds} results 
 * @param { Search results for a keyword } searchResults 
 * @param { Type of the filter } filterType 
 * @param { All available finds} finds 
 * @param { Grouped filters} groupedFilters 
 */
const getFilterValuesWithAmount = (results, searchResults, filterType, finds, groupedFilters) => {
  const result = [];
  const filterKey = filterType + '.value';
  const filtersWithoutTitle = omit(groupedFilters, FacetFilters.TITLE);
  const filterValues = keys(keyBy(finds, filterKey));
  let res;

  if (searchResults.length > 0) {
    if (size(filtersWithoutTitle) === 1 && filtersWithoutTitle.hasOwnProperty(filterType)) {
      res = searchResults;
    } else {
      res = results;
    }
  } else {
    if (size(filtersWithoutTitle) === 1 && filtersWithoutTitle.hasOwnProperty(filterType)) {
      res = finds;
    } else {
      res = results;
    }
  }

  for (const value of filterValues) {
    const amount = countBy(res, filterKey)[value];
    result.push({
      value,
      count: amount ? amount : 0
    });
  }
  return result;
};


export default createSelector(
  findsSelector,
  filtersSelector,
  filterFinds
);