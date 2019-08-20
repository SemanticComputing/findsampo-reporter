import { createLogic } from 'redux-logic';
import axios from 'axios';
import L from 'leaflet';
import {
  FIND_NOTIFICATION_SEND,
  FIND_NOTIFICATION_SEND_SUCCESS,
  FIND_NOTIFICATION_SEND_FAIL,
  FIND_NOTIFICATION_SET_MUNICIPALITY,
  FIND_NOTIFICATION_SET_MUNICIPALITY_SUCCESS,
  FIND_NOTIFICATION_SET_FIND_PHOTOS,
  FIND_NOTIFICATION_SET_FIND_SITE_PHOTOS,
  FIND_NOTIFICATION_SET_FIND_PHOTOS_SUCCESS,
  FIND_NOTIFICATION_SET_FIND_SITE_PHOTOS_SUCCESS,
  FIND_NOTIFICATION_SET_COORDS,
  FIND_NOTIFICATION_SET_NEARBY_SMART_HELP,
  //FIND_NOTIFICATION_SET_MATERIAL_SMART_HELP,
  //FIND_NOTIFICATION_SET_MATERIAL_SMART_HELP_SUCCESS
} from '../constants/actionTypes';

const FIND_NOTIFICATION_END_POINT = '/api/v1/findNotification';
const FIND_NOTIFICATION_FIND_IMAGE_END_POINT = '/api/v1/photo/find';
const FIND_NOTIFICATION_FIND_SITE_IMAGE_END_POINT = '/api/v1/photo/find';
const NEARBY_FINDS_DISTANCE_LIMIT = 30000;

const sendFindNotification = createLogic({
  type: FIND_NOTIFICATION_SEND,
  latest: true,

  processOptions: {
    dispatchReturn: true,
    successType: FIND_NOTIFICATION_SEND_SUCCESS,
    failType: FIND_NOTIFICATION_SEND_FAIL,
  },

  process({ getState }) {
    axios.post(FIND_NOTIFICATION_END_POINT, getState().findNotification);
  }
});


const getFindMunicapility = createLogic({
  type: FIND_NOTIFICATION_SET_MUNICIPALITY,
  latest: true,

  processOptions: {
    dispatchReturn: true,
    successType: FIND_NOTIFICATION_SET_MUNICIPALITY_SUCCESS
  },

  process({ action }) {
    return axios.get(
      'https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?prox='
      + action.coords.lat.toFixed(4).toString()
      + ','
      + action.coords.lng.toFixed(4).toString()
      + ','
      + '30'
      + '&mode=retrieveAddresses&maxresults=1&gen=9&app_id=L9k8kxVsNc55DWwMOnT2&app_code=8kryvSwXkpsixfo9Pc-PgQ');
  }
});

const setFindPhotos = createLogic({
  type: FIND_NOTIFICATION_SET_FIND_PHOTOS,
  latest: true,

  processOptions: {
    dispatchReturn: true,
    successType: FIND_NOTIFICATION_SET_FIND_PHOTOS_SUCCESS
  },

  process({ action, getState }) {
    // Add images to formdata
    const formData = new FormData();
    const currentFindIndex = getState().findNotification.currentFindIndex;
    const currentFind = action[currentFindIndex];

    for (let i in currentFind.photos) {
      const imgIndex = parseInt(i) + parseInt(action.imgIndex);
      const fileName = `${getState().findNotification.reportId}_find-${currentFindIndex}_img-${imgIndex}`;
      const photo = currentFind.photos[i];
      formData.append(fileName, photo);
    }

    // Add current find index
    formData.append('currentFindIndex', currentFindIndex);

    // And send them to server
    return axios({
      method: 'post',
      url: FIND_NOTIFICATION_FIND_IMAGE_END_POINT,
      data: formData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } }
    });
  }
});

const setFindSitePhotos = createLogic({
  type: FIND_NOTIFICATION_SET_FIND_SITE_PHOTOS,
  latest: true,

  processOptions: {
    dispatchReturn: true,
    successType: FIND_NOTIFICATION_SET_FIND_SITE_PHOTOS_SUCCESS
  },

  process({ action, getState }) {
    // Add images to formdata
    const formData = new FormData();
    const currentFindIndex = getState().findNotification.currentFindIndex;
    const findSite = action[currentFindIndex];

    for (let i in findSite.photos) {
      const imgIndex = parseInt(i) + parseInt(action.imgIndex);
      const fileName = `${getState().findNotification.reportId}_find-site_img-${imgIndex}`;
      const photo = findSite.photos[i];
      formData.append(fileName, photo);
    }

    // Add current find index
    formData.append('currentFindIndex', currentFindIndex);

    // And send them to server
    return axios({
      method: 'post',
      url: FIND_NOTIFICATION_FIND_SITE_IMAGE_END_POINT,
      data: formData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } }
    });
  }
});

/********************* Helper Methods for providing smart assistant *********************/
const getLocationBasedSmartHelp = createLogic({
  type: FIND_NOTIFICATION_SET_COORDS,
  latest: true,

  processOptions: {
    dispatchReturn: true,
    successType: FIND_NOTIFICATION_SET_NEARBY_SMART_HELP
  },

  async process({ action, getState }) {
    if (getState().finds.validatedFinds && getState().finds.validatedFinds.length > 0) {
      return getNearByFinds(action.coords, getState().finds.validatedFinds);
    } else {
      const validatedFindsResult = await getValidatedFinds();
      if (validatedFindsResult.data.length > 0) {
        return getNearByFinds(action.coords, validatedFindsResult.data);
      }
    }
  }
});

/**
 * Helper method for fetching the date of validated finds
 */
const getValidatedFinds = async () => {
  const FINDS_END_POINT = '/api/v1/finds';
  try {
    return await axios.get(FINDS_END_POINT);
  } catch (error) {
    console.log(error);
  }
};

/**
 *  Helper method for finding nearby finds of a certain point
 * @param {*} coords 
 * @param {*} validatedFinds 
 */
const getNearByFinds = (coords, validatedFinds) => {
  const result = [];
  for (const find of validatedFinds) {
    if (find.lat && find.long) {
      const distance = L.latLng(coords.lat, coords.lng).distanceTo(L.latLng(parseFloat(find.lat), parseFloat(find.long)));
      distance < NEARBY_FINDS_DISTANCE_LIMIT && result.push(find);
    }
  }
  return result;
};


/*const getMaterialBasedSmartHelp = createLogic({
  type: FIND_NOTIFICATION_SET_MATERIAL_SMART_HELP,
  latest: true,

  processOptions: {
    dispatchReturn: true,
    successType: FIND_NOTIFICATION_SET_MATERIAL_SMART_HELP_SUCCESS
  },

  async process({ action, getState }) {
    if (getState().finds.validatedFinds && getState().finds.validatedFinds.length > 0) {
      //return getNearByFinds(action.coords, getState().finds.validatedFinds);
    } else {
      const validatedFindsResult = await getValidatedFinds();
      if (validatedFindsResult.data.length > 0) {
        //return getNearByFinds(action.coords, validatedFindsResult.data);
      }
    }
  }
});

const getMaterialHelpdata = () => {

}; */

export default [
  sendFindNotification,
  getFindMunicapility,
  setFindPhotos,
  setFindSitePhotos,
  getLocationBasedSmartHelp,
  //getMaterialBasedSmartHelp
];
