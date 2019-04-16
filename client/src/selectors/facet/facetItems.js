import { createSelector } from 'reselect';
import { FacetFilters } from '../../helpers/enum/enums';

const findsSelector = (state) => state.finds.validatedFinds;

const getAvailableMaterials = (finds) => {
  if (finds) {
    const materials = finds.map((f) => {
      if (f[FacetFilters.MATERIAL]) {
        return f[FacetFilters.MATERIAL].value;
      }
    });
    return [...new Set(materials.sort())];

  }
  return [];
};

const getAvailableTypes = (finds) => {
  if (finds) {
    const types = finds.map((f) => {
      if (f[FacetFilters.TYPE]) {
        return f[FacetFilters.TYPE].value;
      }
    });
    return [...new Set(types.sort())];

  }
  return [];
};

const getAvailableMunicipality = (finds) => {
  if (finds) {
    const municipalities = finds.map((f) => {
      if (f[FacetFilters.MUNICIPALITY]) {
        return f[FacetFilters.MUNICIPALITY].value;
      }
    });
    return [...new Set(municipalities.sort())];

  }
  return [];
};

const getAvailablePeriod = (finds) => {
  if (finds) {
    const periods = finds.map((f) => {
      if (f[FacetFilters.PERIOD]) {
        return f[FacetFilters.PERIOD].value;
      }
    });
    return [...new Set(periods.sort())];

  }
  return [];
};

export const materialSelector = createSelector(
  findsSelector,
  getAvailableMaterials
);

export const typeSelector = createSelector(
  findsSelector,
  getAvailableTypes
);

export const municipalitySelector = createSelector(
  findsSelector,
  getAvailableMunicipality
);

export const periodSelector = createSelector(
  findsSelector,
  getAvailablePeriod
);