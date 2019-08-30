const express = require('express');
const router = express.Router();
const Busboy = require('busboy');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const FILE_MAX_LIMIT = 1024 * 1024 * 30;
const FILE_MAX_NUMBERS = 10;

/**
 * Find images
 */
router.post(['/find', '/find-site'], async (req, res, next) => {
  try {
    savePhotos(req, res);
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
 * Saves photos on disk and returns reference urls to them
 * 
 * @param {request} req 
 * @param {response} res 
 */
const savePhotos = (req, res) => {
  // This array will accumulate all the uploaded files by their name.
  const uploads = [];
  const fileWrites = [];
  let currentFindIndex = null;

  // Create a new Busboy object with some limitations
  const busboy = new Busboy({ headers: req.headers, limit: { files: FILE_MAX_LIMIT, fileSize: FILE_MAX_NUMBERS } });

  // This code will process each non-file field in the form.
  busboy.on('field', (fieldname, val) => {
    if (fieldname === 'currentFindIndex') {
      currentFindIndex = val;
    }
  });

  // This code will process each file uploaded.
  busboy.on('file', async (fieldname, file, filename) => {
    const dirPath = path.join(__dirname, '..', '..', 'users', 'applications', 'images');
    const filePath = path.join(dirPath, filename);

    // Save uploaded files to a container with relevant urls
    const uploadUrl = `${req.protocol}://${req.get('host')}/data/images/${fieldname}.png`;
    uploads.push(uploadUrl);

    // Save file on the disk
    const writeStream = fs.createWriteStream(filePath);
    file.pipe(writeStream);

    // File was processed by Busboy; wait for it to be written to disk.
    const promise = new Promise((resolve, reject) => {
      file.on('end', () => {
        writeStream.end();
      });
      // When saving is end change file format and resize it
      writeStream.on('finish', () => {
        createAndResizePhoto(filePath, dirPath, fieldname);
        resolve(true);
      });
      writeStream.on('error', reject);
    });
    fileWrites.push(promise);
  });

  // Triggered once all uploaded files are processed by Busboy.
  busboy.on('finish', async () => {
    Promise.all(fileWrites).then(() => {
      res.send({
        currentFindIndex,
        uploads
      });
    });
  });
  req.pipe(busboy);
};

/**
 * Converts uploaded photo and creates a thumnnail image.
 * It also deletes the orginal file
 * 
 * @param {file name} fileName 
 * @param {directory} directory 
 * @param {field name} fieldName 
 */
const createAndResizePhoto = async (fileName, directory, fieldName) => {
  // Convert uploaded image to png
  const output = path.join(directory, `${fieldName}.png`);
  const thumbOutput = path.join(directory, `${fieldName}_thumb.png`);

  try {
    // Convert file to png and rename it
    const formattedImg = await sharp(fileName)
      .png()
      .toFile(output);

    // Create a thumbler size
    if (formattedImg) {
      await sharp(output)
        .resize(128, null)
        .toFile(thumbOutput);
    }
    // Delete the orginal file
    fs.unlink(fileName, (err) => {
      if (err) throw err;
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = router;