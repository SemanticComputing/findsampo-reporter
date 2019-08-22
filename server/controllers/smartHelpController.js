const express = require('express');
const router = express.Router();
const axios = require('axios');
const querystring = require('querystring');
const smartHelper = require('../sparql/queries/smartHelper');
const mapSmartHelpData = require('../sparql/mappers/smartHelperMapper');
const mapFinds = require('../sparql/mappers/findsMapper');

const FINDS_END_POINT = 'https://ldf.fi/sualt-fha-finds/sparql';

/**
 * Fetch nearby finds for providing help with smart helper
 */
router.post('/nearby', async (req, res, next) => {
  // Header Settings
  const defaultSelectHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/sparql-results+json; charset=utf-8',
    'Authorization': `Basic ${process.env.FHA_FINDS_AUTH}`
  };
  try {
    const query = smartHelper.getNearbySmartHelpData(req.body.coords);
    const response = await axios({
      method: 'post',
      headers: defaultSelectHeaders,
      url: FINDS_END_POINT,
      data: querystring.stringify({ query })
    });
    const mappedResults = mapFinds(response.data.results.bindings);
    res.send(mappedResults);
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      //console.log(error.response.status);
      //console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
    next(error);
  }
});

/**
 * Fetch count of materials/types/periods of finds for providing help with smart helper
 */
router.post('/', async (req, res, next) => {
  // Header Settings
  const defaultSelectHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/sparql-results+json; charset=utf-8',
    'Authorization': `Basic ${process.env.FHA_FINDS_AUTH}`
  };
  try {
    const query = smartHelper.getSmartHelpData(req.body.property);
    const response = await axios({
      method: 'post',
      headers: defaultSelectHeaders,
      url: FINDS_END_POINT,
      data: querystring.stringify({ query })
    });
    const mappedResults = mapSmartHelpData(response.data.results.bindings);
    res.send(mappedResults);
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      //console.log(error.response.status);
      //console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
    next(error);
  }
});

module.exports = router;