//Finnish Heritage Agent WMTS End point

const express = require('express');
const router = express.Router();
const axios = require('axios');

/**
 * Gets Finnish Heritage Agent WMTS layers
 */
router.get('/', async (req, res, next) => {
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

module.exports = router;