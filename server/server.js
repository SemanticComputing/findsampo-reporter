const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const shrinkRay = require('shrink-ray-current');

// Import Controllers
const validatedFindsController = require('./controllers/validatedFindsController');
const nlsofMapLayersController = require('./controllers/nlsofMapLayersController');
const fhaWfsMapLayerController = require('./controllers/fhaWfsMapLayerController');
const reportController = require('./controllers/reportController');
const myFindsController = require('./controllers/myFindsController');
const photoController = require('./controllers/photoController');
const smartHelper = require('./controllers/smartHelpController');


/*************************** APP settings  ***********************************/
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
// Provide images through data url
app.use('/data', express.static(path.join(__dirname, '..', 'users', 'applications')));

// Use express.json middleware
app.use(express.json());


/*************************** APIs ***********************************/

/**
 * APIs for fetching validated finds
 */
const FINDS_END_POINT = '/api/v1/finds';
app.use(FINDS_END_POINT, validatedFindsController);

/**
 * APIs for fetching map layers of National Land Survey Of Finland
 */
const NLSOF_END_POINT = '/api/v1/nlsof';
app.use(NLSOF_END_POINT, nlsofMapLayersController);

/**
 * APIs for fetching Finnish Heritage Agent WMTS layers
 */
const FHA_WFS_END_POINT = '/api/v1/fha_wfs';
app.use(FHA_WFS_END_POINT, fhaWfsMapLayerController);

/**
 * APIs for handling reports
 */
const REPORT_END_POINT = '/api/v1/report';
app.use(REPORT_END_POINT, reportController);

/**
 * APIs for handling my finds related requests
 */

// Disable Cathing in myfinds page
const nocache = (req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
};

const MY_FINDS_END_POINT = '/api/v1/myfinds';
app.use(MY_FINDS_END_POINT, nocache, myFindsController);

/**
 * APIs for handling report images related requests
 */
const PHOTO_END_POINT = '/api/v1/photo';
app.use(PHOTO_END_POINT, photoController);

/**
 * APIs for handling report smart helper related requests
 */
const SMART_HELPER_END_POINT = '/api/v1/smart-helper';
app.use(SMART_HELPER_END_POINT, smartHelper);

/*************************** LISTEN APPLICATION ***********************************/
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Express server started on port ${port}`);
});


