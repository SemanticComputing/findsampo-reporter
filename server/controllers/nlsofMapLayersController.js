const express = require('express');
const router = express.Router();
const axios = require('axios');

/**
 * Get map layers of National Land Survey Of Finland
 */
router.get('/', async (req, res, next) => {
  const url = `https://karttakuva.maanmittauslaitos.fi/maasto/wmts/1.0.0/${req.query.type}/default/WGS84_Pseudo-Mercator/${req.query.z}/${req.query.y}/${req.query.x}.png`;
  const nlsofHeader = {
    'Content-Type': 'image/png',
    'Authorization': `Basic ${process.env.NLSOF_AUTH}`
  };

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

module.exports = router;
