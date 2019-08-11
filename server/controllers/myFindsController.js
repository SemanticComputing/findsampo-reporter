const express = require('express');
const router = express.Router();
const url = require('url');
const querystring = require('querystring');
const axios = require('axios');

const mapMyFinds = require('../sparql/mappers/myFindsMapper');
const getMyFinds = require('../sparql/queries/myFinds');
const getCertainFinds = require('../sparql/queries/certainFinds');
const mapReportFinds = require('../sparql/mappers/myFindsReportFindMapper');

/**
 * Handles my finds related API requests
 */
const defaultMyFindsHeaders = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Accept': 'application/sparql-results+json; charset=utf-8'
};

router.get('/', async (req, res, next) => {
  try {
    const query = getMyFinds(req.query.uid);
    const response = await axios({
      method: 'post',
      headers: defaultMyFindsHeaders,
      url: url.parse(`http://${process.env.FUSEKI_SPARQL_URL}`),
      data: querystring.stringify({ query })
    });
    const mappedResults = mapMyFinds(response.data.results.bindings);
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
 * Get certain number of my finds
 */
router.post('/', async (req, res, next) => {
  const requestFinds = req.body.finds;
  const findRequests = [];

  // Create post requests for fetching finds information
  for (const find of requestFinds) {
    const query = getCertainFinds(find);
    findRequests.push(
      axios({
        method: 'post',
        headers: defaultMyFindsHeaders,
        url: url.parse(`http://${process.env.FUSEKI_SPARQL_URL}`),
        data: querystring.stringify({ query })
      })
    );
  }
  // Fetch data in parallel
  try {
    // Fetch find information
    const fetchedFinds = await Promise.all(findRequests);
    const findsToBeReturned = [];
    // Go through fetched finds and map them
    for (const find of fetchedFinds) {
      findsToBeReturned.push(
        mapReportFinds(find.data.results.bindings)[0]
      );
    }
    res.send(findsToBeReturned);
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