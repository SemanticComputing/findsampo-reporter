const express = require('express');
const router = express.Router();
const axios = require('axios');
const querystring = require('querystring');

const finds = require('../sparql/queries/finds');
const mapFinds = require('../sparql/mappers/findsMapper');

const FINDS_END_POINT = 'https://ldf.fi/sualt-fha-finds/sparql';

/**
 * Get all validated finds
 */
router.get('/', async (req, res, next) => {
  const defaultSelectHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/sparql-results+json; charset=utf-8',
    'Authorization': `Basic ${process.env.FHA_FINDS_AUTH}`
  };

  try {
    const query = finds.getValidatedFinds;
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


router.post('/', async (req, res, next) => {
  const defaultSelectHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/sparql-results+json; charset=utf-8',
    'Authorization': `Basic ${process.env.FHA_FINDS_AUTH}`
  };

  try {
    const query = finds.getValidatedFind(req.body.id);
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

module.exports = router;
