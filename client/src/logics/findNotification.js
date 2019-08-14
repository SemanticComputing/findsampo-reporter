import { createLogic } from 'redux-logic';
import axios from 'axios';
import {
  FIND_NOTIFICATION_SEND,
  FIND_NOTIFICATION_SEND_SUCCESS,
  FIND_NOTIFICATION_SEND_FAIL,
  FIND_NOTIFICATION_SET_MUNICIPALITY,
  FIND_NOTIFICATION_SET_MUNICIPALITY_SUCCESS,
  FIND_NOTIFICATION_SET_FIND_PHOTOS,
  FIND_NOTIFICATION_SET_FIND_SITE_PHOTOS,
  FIND_NOTIFICATION_SET_FIND_PHOTOS_SUCCESS,
  FIND_NOTIFICATION_SET_FIND_SITE_PHOTOS_SUCCESS
} from '../constants/actionTypes';

const FIND_NOTIFICATION_END_POINT = '/api/v1/findNotification';
const FIND_NOTIFICATION_FIND_IMAGE_END_POINT = '/api/v1/photo/find';
const FIND_NOTIFICATION_FIND_SITE_IMAGE_END_POINT = '/api/v1/photo/find';


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

export default [
  sendFindNotification,
  getFindMunicapility,
  setFindPhotos,
  setFindSitePhotos
];



