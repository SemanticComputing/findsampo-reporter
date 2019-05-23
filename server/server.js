const path = require('path');
const express = require('express');
const finds = require('./sparql/queries/finds');
const querystring = require('querystring');
const axios = require('axios');
const dotenv = require('dotenv');
const shrinkRay = require('shrink-ray-current');

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
    const { bindings } = response.data.results;
    res.send(bindings);
  } catch (error) {
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


// Application
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Express server started on port ${port}`);
});
