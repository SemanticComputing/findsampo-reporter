import { createLogic } from 'redux-logic';
import axios from 'axios';
import { countBy } from 'lodash';
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
  FIND_NOTIFICATION_SET_PROPERTY_SMART_HELP,
  FIND_NOTIFICATION_SET_PROPERTY_SMART_HELP_SUCCESS
} from '../constants/actionTypes';

const FIND_NOTIFICATION_END_POINT = '/api/v1/findNotification';
const FIND_NOTIFICATION_FIND_IMAGE_END_POINT = '/api/v1/photo/find';
const FIND_NOTIFICATION_FIND_IMAGE_MERGE_END_POINT = '/api/v1/photo/find-merge';
const FIND_NOTIFICATION_FIND_SITE_IMAGE_END_POINT = '/api/v1/photo/find-site';
const FIND_NOTIFICATION_FIND_SITE_IMAGE_MERGE_END_POINT = '/api/v1/photo/find-site-merge';

const SMART_HELPER_END_POINT = '/api/v1/smart-helper';
const SMART_HELPER_NEARBY_END_POINT = '/api/v1/smart-helper/nearby';

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
      + action.coords.lat.toFixed(4)
      + ','
      + action.coords.lng.toFixed(4)
      + ','
      + '30'
      + '&mode=retrieveAddresses&maxresults=1&gen=9&app_id=L9k8kxVsNc55DWwMOnT2&app_code=8kryvSwXkpsixfo9Pc-PgQ');
  }
});

const setFindPhotos = createLogic({
  type: FIND_NOTIFICATION_SET_FIND_PHOTOS,
  latest: false,

  process({ action, getState }, dispatch, done) {
    const currentFindIndex = getState().findNotification.currentFindIndex;
    const currentFind = action[currentFindIndex];

    for (let i in currentFind.photos) {
      // Image information
      const axiosPromiseArray = [];
      const imgIndex = parseInt(i) + parseInt(action.imgIndex);
      const fileName = `${getState().findNotification.reportId}_find-${currentFindIndex}_img-${imgIndex}`;
      const photo = currentFind.photos[i];
      const partNames = [];
      // Chunk information
      const chunkSize = 256 * 1000;
      const blockCount = Math.ceil(photo.size / chunkSize);

      for (let j = 0; j < blockCount; j++) {
        const formData = new FormData();
        const start = j * chunkSize;
        const end = Math.min(photo.size, start + chunkSize);
        const partName = fileName + '_part-' + j;

        // Save partnames to sent afterwards
        partNames.push(partName);
        // Insert form data
        formData.append('tempFolderName', `${getState().findNotification.reportId}_${i}`);
        formData.append('partName', fileName + '_part-' + j);
        formData.append('file', blobSlice.call(photo, start, end));

        axiosPromiseArray.push(
          axios({
            method: 'post',
            url: FIND_NOTIFICATION_FIND_IMAGE_END_POINT,
            data: formData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
          })
        );
      }

      axios.all(axiosPromiseArray).then(() => {
        return axios({
          method: 'post',
          url: FIND_NOTIFICATION_FIND_IMAGE_MERGE_END_POINT,
          data: {
            totalFileSize: photo.size,
            tempFolderName: `${getState().findNotification.reportId}_${i}`,
            fileName,
            partNames,
            currentFindIndex
          }
        })
          .then((result) => {
            dispatch({
              type: FIND_NOTIFICATION_SET_FIND_PHOTOS_SUCCESS,
              payload: result
            });
          })
          .then(() => {
            // Finish the process when all photos are received
            if (i == currentFind.photos.length) {
              done();
            }
          });
      });
    }
  }
});


const setFindSitePhotos = createLogic({
  type: FIND_NOTIFICATION_SET_FIND_SITE_PHOTOS,
  latest: false,

  process({ action, getState }, dispatch, done) {
    const currentFindIndex = getState().findNotification.currentFindIndex;
    const currentFind = action[currentFindIndex];

    for (let i in currentFind.photos) {
      // Image information
      const axiosPromiseArray = [];
      const imgIndex = parseInt(i) + parseInt(action.imgIndex);
      const fileName = `${getState().findNotification.reportId}_find-site_img-${imgIndex}`;
      const photo = currentFind.photos[i];
      const partNames = [];
      // Chunk information
      const chunkSize = 256 * 1000;
      const blockCount = Math.ceil(photo.size / chunkSize);

      for (let j = 0; j < blockCount; j++) {
        const formData = new FormData();
        const start = j * chunkSize;
        const end = Math.min(photo.size, start + chunkSize);
        const partName = fileName + '_part-' + j;

        // Save partnames to sent afterwards
        partNames.push(partName);
        // Insert form data
        formData.append('tempFolderName', `${getState().findNotification.reportId}_${i}`);
        formData.append('partName', fileName + '_part-' + j);
        formData.append('file', blobSlice.call(photo, start, end));

        axiosPromiseArray.push(
          axios({
            method: 'post',
            url: FIND_NOTIFICATION_FIND_SITE_IMAGE_END_POINT,
            data: formData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
          })
        );
      }

      axios.all(axiosPromiseArray).then(() => {
        axios({
          method: 'post',
          url: FIND_NOTIFICATION_FIND_SITE_IMAGE_MERGE_END_POINT,
          data: {
            totalFileSize: photo.size,
            tempFolderName: `${getState().findNotification.reportId}_${i}`,
            fileName,
            partNames,
            currentFindIndex
          }
        })
          .then((result) => {
            dispatch({
              type: FIND_NOTIFICATION_SET_FIND_SITE_PHOTOS_SUCCESS,
              payload: result
            });
          })
          .then(() => {
            // Finish the process when all photos are received
            if (i == currentFind.photos.length) {
              done();
            }
          });
      });
    }
  }
});


/********************* Helper Methods for providing help with the smart assistant *********************/
const getLocationBasedSmartHelp = createLogic({
  type: FIND_NOTIFICATION_SET_COORDS,
  latest: true,

  processOptions: {
    dispatchReturn: true,
    successType: FIND_NOTIFICATION_SET_NEARBY_SMART_HELP
  },

  async process({ action }) {
    return await axios.post(SMART_HELPER_NEARBY_END_POINT, { coords: action.coords });
  }
});


const getFindPropertyBasedSmartHelp = createLogic({
  type: FIND_NOTIFICATION_SET_PROPERTY_SMART_HELP,
  latest: true,

  processOptions: {
    dispatchReturn: true,
    successType: FIND_NOTIFICATION_SET_PROPERTY_SMART_HELP_SUCCESS
  },

  async process({ action, getState }) {
    // If nearby data is available group them by property
    let nearByData = {};
    const nearbyFinds = getState().findNotification.smartHelper.nearbyFinds.data;
    if (nearbyFinds.length > 0) {
      nearByData = getNearbyFindsSummary(action.property, nearbyFinds);
    }
    // Fetch data for creating a summary chart
    const helpData = await axios.post(SMART_HELPER_END_POINT, { property: action.property });
    const summaryHelpData = {};

    // Reorganise the data
    for (const e of helpData.data) {
      if (e.property) {
        summaryHelpData[e.property] = e.count;
      }
    }

    return {
      property: action.property,
      summaryHelpData,
      nearByData
    };
  }
});

const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;

const getNearbyFindsSummary = (property, finds) => {
  const filteredFinds = finds.filter((f) => f[property]);
  return countBy(filteredFinds, (f) => f[property]);
};

export default [
  sendFindNotification,
  getFindMunicapility,
  setFindPhotos,
  setFindSitePhotos,
  getLocationBasedSmartHelp,
  getFindPropertyBasedSmartHelp
];
