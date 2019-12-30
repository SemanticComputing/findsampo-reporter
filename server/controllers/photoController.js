const express = require('express');
const router = express.Router();
const Busboy = require('busboy');
const sharp = require('sharp');
const path = require('path');
const fsExtra = require('fs-extra');
const constants = require('../helpers/constants');

const FILE_MAX_LIMIT = 1024 * 1024 * 30;
const FILE_MAX_NUMBERS = 10;

/**
 * API for saving chunks of find or find site images
 */
router.post(['/find', '/find-site'], async (req, res, next) => {
  try {
    saveChunks(req, res);
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
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
 * API for merging find or find site chunks
 */
router.post(['/find-merge', '/find-site-merge'], async (req, res, next) => {
  try {
    mergeChunks(req, res);
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
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
 * API for deleting photos
 */
router.put('/delete', async (req, res, next) => {
  try {
    deletePhotos(req, res);
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
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

const deletePhotos = (req, res) => {
  const dirPath = path.join(__dirname, '..', '..', 'users', 'applications', 'images');
  const results = [];

  for (const id of req.body.photoIds) {
    let filePath = path.join(dirPath, id);
    const promise = new Promise((resolve, reject) => {
      fsExtra.unlink(filePath, function (err) {
        if (err) reject(true);
        // if no error, file has been deleted successfully
        resolve(true);
      });
    });
    results.push(promise);
  }

  Promise.all(results)
    .then(() => {
      res.status(constants.statuses.HTTP_NO_CONTENT).send();
    })
    .catch(() => {
      res.status(constants.statuses.HTTP_SERVER_ERROR).send();
    });
};

/**
 * Merge the saved chunks
 * 
 * @param {request} req 
 * @param {response} res 
 */
const mergeChunks = (req, res) => {
  const { totalFileSize, currentFindIndex, fileName, tempFolderName, partNames } = req.body;
  const imageUrl = `//${req.get('host')}/data/images/${fileName}.png`;
  const dirPath = path.join(__dirname, '..', '..', 'users', 'applications', 'images');
  const concatFilePath = path.join(dirPath, tempFolderName);
  const buffers = [];

  partNames.forEach((name) => {
    const buffer = fsExtra.readFileSync(path.join(concatFilePath, name));
    buffers.push(buffer);
  });

  // Check if all parts are uploaded
  fsExtra.readdir(concatFilePath, (err, files) => {
    if (files.length !== partNames.length) {
      throw 'PhotoController: Some chunks are missing ';
    } else {
      createAndResizePhoto(Buffer.concat(buffers), dirPath, fileName, totalFileSize);
    }
  });

  fsExtra.remove(concatFilePath, (err) => {
    if (err) {
      console.error('An error occured during the deletion of chunk files', err);
    }
  });

  res.send({
    currentFindIndex,
    imageUrl
  });
};

/**
 * Saves the image chunks in a temp folder
 * 
 * @param {request} req 
 * @param {result} res 
 */
const saveChunks = (req, res) => {
  const fileWrites = [];
  // Create a new Busboy object with some limitations
  const busboy = new Busboy({ headers: req.headers, limit: { files: FILE_MAX_LIMIT, fileSize: FILE_MAX_NUMBERS } });
  const fields = {};
  // This code will process each non-file field in the form.
  busboy.on('field', (fieldname, val) => {
    fields[fieldname] = val;
  });

  // This code will process each file uploaded.
  busboy.on('file', async (fieldname, file) => {
    const dirPath = path.join(__dirname, '..', '..', 'users', 'applications', 'images', fields['tempFolderName']);
    const filePath = path.join(dirPath, fields['partName']);

    // If the temp folder is not exist create it
    fsExtra.mkdir(dirPath, { recursive: true }, (err) => {
      if (err) throw err;
      // Save file on the disk
      const writeStream = fsExtra.createWriteStream(filePath);
      file.pipe(writeStream);

      // File was processed by Busboy; wait for it to be written to disk.
      const promise = new Promise((resolve, reject) => {
        file.on('end', () => {
          writeStream.end();
        });
        // When saving is end change file format and resize it
        writeStream.on('finish', () => {
          resolve(true);
        });
        writeStream.on('error', reject);
      });
      fileWrites.push(promise);
    });
  });

  // Triggered once all uploaded files are processed by Busboy.
  busboy.on('finish', async () => {
    Promise.all(fileWrites).then(() => {
      res.status(constants.statuses.HTTP_NO_CONTENT).send();
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
const createAndResizePhoto = async (file, directory, fieldName, totalFileSize) => {
  // Check that the file size is correct
  if (file.byteLength !== totalFileSize) {
    fsExtra.remove(directory, err => {
      console.error(err);
    });
    throw 'PhotoController: The total size of chunks and orginal file size does not match!';
  }
  // Convert uploaded image to png
  const output = path.join(directory, `${fieldName}.png`);
  const thumbOutput = path.join(directory, `${fieldName}_thumb.png`);

  try {
    // Convert file to png and rename it
    const formattedImg = await sharp(file)
      .png()
      .toFile(output);

    // Create a thumbler size
    if (formattedImg) {
      await sharp(output)
        .resize(128, null)
        .toFile(thumbOutput);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = router;