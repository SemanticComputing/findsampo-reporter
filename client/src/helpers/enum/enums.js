export const OptionTypes = Object.freeze({
  NUMBER_FIELD: 'number-field',
  TOGGLE: 'toggle',
  MAP: 'map',
  DATE_PICKER: 'date-picker',
  FIELD: 'field',
  PHOTOGRAPH: 'photograph',
  EXPANSION_PANEL: 'expansion-panel',
  TREE_VIEW: 'tree-view'
});

export const ButtonTypes = Object.freeze({
  STEPPER: 'stepper',
  EXECUTER: 'executer'
});

export const PhotosOf = Object.freeze({
  FIND: 'find',
  FIND_SITE: 'find-site'
});

export const TreeViewTypes = Object.freeze({
  MATERIAL: 'material',
  TYPE: 'type',
  ERAS: 'eras'
});

export const ButtonActions = Object.freeze({
  CHANGE_CURRENT_FIND_INDEX: 'change-current-find-index',
  SEND_FIND_NOTIFICATION: 'send-find-notification'
});

export const RouterPaths = Object.freeze({
  HOME_PAGE: '/',
  REPORT_PAGE: '/report',
  LOGIN_PAGE: '/login',
  SIGNUP_PAGE: '/signup',
  MY_FINDS_PAGE: '/myfinds',
  MY_FINDS_REPORT_OVERVIEW_PAGE: '/myfinds-report-overview',
  MORE_PAGE: '/more',
  NEARBY_PAGE: '/nearby',
  LEGALITY_CHECKER_PAGE: '/amisafe',
});

export const QuestionDependencies = Object.freeze({
  LOCATION: 'location',
  FIND_SITE_PHOTO: 'find-site-photo',
  FIND_PHOTO: 'find-photo'
});

export const FacetFilters = Object.freeze({
  TITLE: 'title',
  TYPE: 'type',
  MATERIAL: 'main_material',
  MUNICIPALITY: 'municipality',
  PERIOD: 'period',
  PROVINCE: 'province',
});

export const MapMode = Object.freeze({
  HEATMAP: 'heat-map',
  CLUSTURED_MAP: 'clustured-map'
});

export const Fha_Wfs_Layer = Object.freeze({
  ARCHEOLOGICAL_PLACES_AREAS: 'arkeologiset_kohteet_alue',
  ARCHEOLOGICAL_PLACES_POINT: 'Arkeologiset_kohteet_piste',
  WORLD_HERITAGE_SITE_AREAS: 'maailmanperinto_alue',
  WORLD_HERITAGE_SITE_POINT: 'maailmanperinto_piste',
  ARCHITECTURAL_HERITAGE_AREAS: 'rakennusperinto_alue',
  ARCHITECTURAL_HERITAGE_POINT: 'rakennusperinto_piste',
  ARCHEOLOGICAL_SUBPLACES_POINT: 'arkeologisten_kohteiden_alakohteet_piste',
  RKY_AREAS: 'rky_alue',
  RKY_POINTS: 'rky_piste',
  RKY_LINES: 'rky_viiva',
  ARCHEOLOGICAL_FINDS: 'arkeologiset_loydot',
});

export const Colors = Object.freeze({
  PINK: '#e91e63',
  PURPLE: '#9c27b0',
  DEEP_PURPLE: '#673ab7',
  BLUE: '#2196f3',
  CYAN: '#00bcd4',
  TEAL: '#009688',
  GREEN: '#4caf50',
  LIME: '#cddc39',
  YELLOW: '#ffeb3b',
  ORANGE: '#ff9800',
  BROWN: '#795548',
  GREY: '#e0e0e0',
  DARK_YELLOW: '#ffc107',
  DARK_LIME: '#eeff41',
  DARK_GREEN: '#43a047',
  DARK_RED: '#dd2c00',
  INDIGO: '#3f51b5'
});

export const ReportStatuses = Object.freeze({
  DRAFT: 'draft',
  AWAIT_REVIEW: 'await_review',
  IN_REVIEW: 'in_review',
  VALIDATED: 'validated',
  REJECTED: 'rejected',
  PENDING_USER: 'peding_user'
});

export const ReportSteps = Object.freeze({
  LOCATION: 3,
  MATERIAL: 9,
  TYPE: 10,
  PERIOD: 11
});

export const SmartHelpers = Object.freeze({
  NEARBY_HELPER: 'nearby_helper',
  MATERIAL_HELPER: 'material_helper',
  TYPE_HELPER: 'type_helper',
  PERIOD_HELPER: 'period_helper'
});