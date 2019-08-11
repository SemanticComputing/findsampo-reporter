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
const imageController = require('./controllers/imageController');


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
const MY_FINDS_END_POINT = '/api/v1/myfinds';
app.use(MY_FINDS_END_POINT, myFindsController);

/**
 * APIs for handling report images related requests
 */
const IMAGE_END_POINT = '/api/v1/image';
app.use(IMAGE_END_POINT, imageController);


/*************************** LISTEN APPLICATION ***********************************/
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Express server started on port ${port}`);
});
