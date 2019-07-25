// Creates unique IDs
const uuidv1 = require('uuid/v1');

const FIND_TAG = 'fs-find';
const FIND_SCHEMA_TAG = 'fs-schema:report-find';
const FIND_IMAGE_TAG = 'fs-find:find-image';
const FIND_IMAGE_SCHEMA_TAG = 'fs-schema:find-image';
const FIND_SITE_IMAGE_TAG = 'fs-find:find-site-image';
const FIND_SITE_IMAGE_SCHEMA_TAG = 'fs-schema:find-site-image';

const createPostQuery = (user, data) => {
  const finds = new Map(data.finds.map(find => [uuidv1(), find]));
  const prefixes = getPrefixes();
  const reportDetails = getReportDetails(user, data, finds);
  const findsDetails = getFindsDetails(finds);

  return `
    ${prefixes}
    
    INSERT DATA {
      GRAPH fs-user:${user.uid} {
        # Report information
        ${reportDetails}
        # Find information
        ${findsDetails}
      } 
    }  
  `;
};

/**
 *  Add Needed prefixes to the query
 */
const getPrefixes = () => (`
	PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
  PREFIX wgs84: <http://www.w3.org/2003/01/geo/wgs84_pos#>

  PREFIX fs-schema: <http://ldf.fi/schema/findsampo/>
	PREFIX fs-report: <http://ldf.fi/findsampo/report/>
	PREFIX fs-user: <http://ldf.fi/findsampo/user/>
	PREFIX fs-find-site: <http://ldf.fi/findsampo/find-site/>
	PREFIX fs-find: <http://ldf.fi/findsampo/find/>
	PREFIX fs-find-image: <http://ldf.fi/findsampo/find-image/>
`);

/**
 * Add report information to the query
 */
const getReportDetails = (user, data, finds) => {
  return `fs-report:${uuidv1()} a fs-schema:Report ;
  fs-schema:report-municipality "${data.municipality}" ;
  fs-schema:report-owner "${user.email}" ;
  fs-schema:report-submission-date "${data.date}"^^xsd:date ;
  fs-schema:report-status "${data.status}" ;
  fs-schema:report-current-step "${data.currentStep}" ; 
  ${getProperties(FIND_SCHEMA_TAG, FIND_TAG, finds)}`;
};



/**
 * Returns all available properties
 */
const getProperties = (schema, tag, container) => {
  let result = '';
  if (container.size > 0) {
    result += schema;
    for (let k = 0; k < container.size; k++) {
      if (k === container.size - 1) {
        result += ` ${tag}:${container.keys()[k]} .`;
      } else {
        result += ` ${tag}:${container.keys()[k]},`;
      }
    }
  }
  return result;
};

/**
 * 
 * Returns find, find site, find image and find site image details
 */
const getFindsDetails = (finds) => {
  let findsDetails = '';
  for (let [id, find] of finds.entries()) {
    const findSiteId = uuidv1();
    const findImages = new Map(find.photos.map(img => [uuidv1(), img]));

    findsDetails += `fs-find:${id} a fs-schema:Find ;
      fs-schema:find-depth "${find.depth}" ;
      fs-schema:find-additional-materials "${find.additionalMaterials}" ;
      fs-schema:find-material "${find.material}" ;
      fs-schema:find-type "${find.type}" ;
      fs-schema:find-period "${find.timing}" ;
      fs-schema:find-site fs-find-site:${findSiteId} ;
      ${getProperties(FIND_IMAGE_SCHEMA_TAG, FIND_IMAGE_TAG, findImages)}
      
      # Find images
      ${getFindImageDetails(findImages)}
      
      # Find Site
      ${getFindSiteDetails(findSiteId, find.findSite)}
      `;
  }

  return findsDetails;
};

/**
 * Returns find image details
 */
const getFindImageDetails = (findImages) => {
  let findImageResult = '';
  for (let [id, image] of findImages.entries()) {
    findImageResult += `fs-find-image:${id} a fs-schema:FindImage ;
      fs-schema:find-image-url "${image}" .
    `;

    return findImageResult;
  }
};

/**
 * Returns find site details
 */
const getFindSiteDetails = (id, findSite) => {
  const findSiteImages = new Map(findSite.photos.map(img => [uuidv1(), img]));

  return `fs-find-site:${id} a fs-schema:FindSite ;
      wgs84:lat ${findSite.coords.lat} ;
      wgs84:long ${findSite.coords.lng} ;
      ${getProperties(FIND_SITE_IMAGE_SCHEMA_TAG, FIND_SITE_IMAGE_TAG, findSiteImages)}

      # Find site images
      ${getFindSiteImageDetails(findSiteImages)}`;
};

/**
 * Returns find site image details
 */
const getFindSiteImageDetails = (findSiteImages) => {
  let findSiteImageResult = '';
  for (let [id, image] of findSiteImages.entries()) {
    findSiteImageResult += `fs-find:find-site-image:${id} a fs-schema:FindSiteImage ;
        fs-schema:find-site-image-url "${image}" .
      `;

    return findSiteImageResult;
  }
};


/**
 * Gets all available finds
 */
const getReport = `
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  SELECT * WHERE {
    ?sub ?pred ?obj .
  } 
`;

/**
 * Delete the report
 */
const deleteReport = (user) => (`
  ${getPrefixes()}
  DROP GRAPH fs-user:${user.uid} 
`);

exports.getReport = getReport;
exports.postReport = createPostQuery;
exports.deleteReport = deleteReport;
