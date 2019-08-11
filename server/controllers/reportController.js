const express = require('express');
const router = express.Router();
const axios = require('axios');
const uuidv1 = require('uuid/v1');
const querystring = require('querystring');
const url = require('url');

const report = require('../sparql/queries/report');

const HTTP_OK = 200;
const defaultreportHeaders = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Accept': 'application/sparql-results+json; charset=utf-8'
};

router.post('/', async (req, res, next) => {
  try {
    const reportId = req.body.data.reportId ? req.body.data.reportId : uuidv1();
    const update = report.postReport(reportId, req.body.user, req.body.data);

    const response = await axios({
      method: 'post',
      headers: defaultreportHeaders,
      url: url.parse(`http://${process.env.FUSEKI_UPDATE_URL}`),
      data: querystring.stringify({ update })
    });

    // Send report id to client when saving is succeeded
    if (response.status == HTTP_OK) {
      res.send({ reportId });
    }
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


router.get('/', async (req, res, next) => {
  try {
    const query = report.getReport;
    const response = await axios({
      method: 'post',
      headers: defaultreportHeaders,
      url: url.parse(`http://${process.env.FUSEKI_SPARQL_URL}`),
      data: querystring.stringify({ query })
    });
    res.send(response.data.results.bindings);
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

// Delete a report
router.put('/', async (req, res, next) => {
  try {
    const update = report.deleteReport(req.body.reportId);
    const response = await axios({
      method: 'post',
      headers: defaultreportHeaders,
      url: url.parse(`http://${process.env.FUSEKI_UPDATE_URL}`),
      data: querystring.stringify({ update })
    });
    // Ensure that deletion is succeed
    if (response.status == HTTP_OK) {
      res.send('Deletion is done!');
    }
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