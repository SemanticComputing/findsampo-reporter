const path = require('path');
const express = require('express');
const url = require('url');
const querystring = require('querystring');
const axios = require('axios');
const dotenv = require('dotenv');
const shrinkRay = require('shrink-ray-current');
const uuidv1 = require('uuid/v1');

const finds = require('./sparql/queries/finds');
const report = require('./sparql/queries/report');
const mapFinds = require('./sparql/mappers/findsMapper');
const getMyFinds = require('./sparql/queries/myFinds');

const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3001;


// Define Environment Variables
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.test' });
}

// Compress all requests
app.use(shrinkRay());

// Define static files path
app.use(express.static(publicPath));

// Use express.json middleware
app.use(express.json());


/* FIXME
// Find Notifications API
const FIND_NOTIFICATION_END_POINT = '/api/v1/findNotification';
// TODO: Get data to database
app.get(FIND_NOTIFICATION_END_POINT, (req, res) => {
  res.send('Your GET request has been received!');
});
// TODO: Save received data to database
app.post(FIND_NOTIFICATION_END_POINT, (req, res) => {
  res.send('Your POST request has been received!');
});*/


//Finds
const FINDS_END_POINT = '/api/v1/finds';
const defaultSelectHeaders = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Accept': 'application/sparql-results+json; charset=utf-8',
  'Authorization': `Basic ${process.env.FHA_FINDS_AUTH}`
};

app.get(FINDS_END_POINT, async (req, res, next) => {
  try {
    const query = finds.getValidatedFinds;
    const response = await axios({
      method: 'post',
      headers: defaultSelectHeaders,
      url: 'https://ldf.fi/sualt-fha-finds/sparql',
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


//National Land Survey Of Finland
const NLSOF_END_POINT = '/api/v1/nlsof';
const nlsofHeader = {
  'Content-Type': 'image/png',
  'Authorization': `Basic ${process.env.NLSOF_AUTH}`
};

app.get(NLSOF_END_POINT, async (req, res, next) => {
  const url = `https://karttakuva.maanmittauslaitos.fi/maasto/wmts/1.0.0/${req.query.type}/default/WGS84_Pseudo-Mercator/${req.query.z}/${req.query.y}/${req.query.x}.png`;
  try {
    const response = await axios({
      method: 'get',
      url,
      responseType: 'arraybuffer',
      headers: nlsofHeader,
    });
    res.end(response.data, 'base64');
  } catch (error) {
    next(error);
  }
});



//Finnish Heritage Agent WMTS End point
const FHA_WFS_END_POINT = '/api/v1/fha_wfs';

app.get(FHA_WFS_END_POINT, async (req, res, next) => {
  const url = `
     http://kartta.nba.fi/arcgis/services/WFS/MV_Kulttuuriymparisto/MapServer/WFSServer?request=GetFeature` +
    `&service=WFS&version=2.0.0&typeName=${req.query.layer}&srsName=EPSG:4326&outputformat=geojson&bbox=${req.query.boxBounds}
  `;
  try {
    const response = await axios({
      method: 'get',
      url,
    });
    res.send(response.data.features);
  } catch (error) {
    next(error);
  }
});



//Report
const REPORT_END_POINT = '/api/v1/report';
const HTTP_OK = 200;
const defaultreportHeaders = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Accept': 'application/sparql-results+json; charset=utf-8'
};

app.post(REPORT_END_POINT, async (req, res, next) => {
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


app.get(REPORT_END_POINT, async (req, res, next) => {
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


app.put(REPORT_END_POINT, async (req, res, next) => {
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



// Get My Finds
const MY_FINDS_END_POINT = '/api/v1/myfinds';
const defaultMyFindsHeaders = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Accept': 'application/sparql-results+json; charset=utf-8'
};

app.get(MY_FINDS_END_POINT, async (req, res, next) => {
  try {
    const query = getMyFinds(req.query.uid);
    const response = await axios({
      method: 'post',
      headers: defaultMyFindsHeaders,
      url: url.parse(`http://${process.env.FUSEKI_SPARQL_URL}`),
      data: querystring.stringify({ query })
    });
    //const mappedResults = mapFinds(response.data.results.bindings);
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



// Application
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Express server started on port ${port}`);
});
