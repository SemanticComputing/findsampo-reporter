const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// FIXME 
router.get('/api/v1/mytest', async (req, res, next) => {
  try {
    const patddh = path.join(__dirname, '..', 'users', 'applications', 'images', 'myfile.png');

    // write_stream.js
    let writeStream = fs.createWriteStream(patddh);

    // write some data with a base64 encoding
    writeStream.write('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=', 'base64');

    // the finish event is emitted when all data has been flushed from the stream
    writeStream.on('finish', () => {
      console.log('wrote all data to file');
    });

    // close the stream
    writeStream.end();
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