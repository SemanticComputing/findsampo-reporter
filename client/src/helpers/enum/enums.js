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
  MORE_PAGE: '/more',
  NEARBY_PAGE: '/nearby',
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
});