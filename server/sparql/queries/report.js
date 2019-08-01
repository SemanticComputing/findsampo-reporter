// Creates unique IDs
const uuidv1 = require('uuid/v1');

const FIND_TAG = 'fs-find';
const FIND_SCHEMA_TAG = 'fs-schema:report-find';
const FIND_IMAGE_TAG = 'fs-find-image';
const FIND_IMAGE_SCHEMA_TAG = 'fs-schema:find-image';
const FIND_SITE_IMAGE_TAG = 'fs-find-site-image';
const FIND_SITE_IMAGE_SCHEMA_TAG = 'fs-schema:find-site-image';

/**
 * Create a post request for saving report information in database
 * 
 * @param {Report owner information} user 
 * @param {Report Data} data 
 */
const createPostQuery = (reportId, user, data) => {
  const finds = new Map(data.finds.map(find => [uuidv1(), find]));
  const prefixes = getPrefixes();
  return `
    ${prefixes}
    
    INSERT DATA {
      GRAPH fs-report:${reportId} {
        # Report information
        ${getReportDetails(reportId, user, data, finds)}
        # Find information
        ${getFindsDetails(finds)}
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
	PREFIX fs-report-owner: <http://ldf.fi/findsampo/report-owner/>
	PREFIX fs-find: <http://ldf.fi/findsampo/find/>
  PREFIX fs-find-image: <http://ldf.fi/findsampo/find-image/>
  PREFIX fs-find-site: <http://ldf.fi/findsampo/find-site/>
  PREFIX fs-find-site-image: <http://ldf.fi/findsampo/find-site-image/>
`);

/**
 * Add report information to the query
 */
const getReportDetails = (reportId, user, data, finds) => {
  return `fs-report:${reportId} a fs-schema:Report ;
    ${data.municipality ? `fs-schema:report-municipality "${data.municipality}" ;` : ''}
    ${data.date ? `fs-schema:report-submission-date "${data.date}"^^xsd:date ;` : ''}
    ${data.status ? `fs-schema:report-status "${data.status}" ;` : ''}
    ${data.currentStep ? `fs-schema:report-current-step "${data.currentStep}" ;` : ''}
    fs-schema:report-owner fs-report-owner:${user.uid} ${finds.size > 0 ? ';' : '.'}
    # Find details
    ${getProperties(FIND_SCHEMA_TAG, FIND_TAG, finds)}
    # Report owner details
    ${getOwnerDetails(user)}`;

};

/**
 * Returns all available properties
 */
const getProperties = (schema, tag, container) => {
  let result = ' ';
  if (container.size > 0) {
    result += schema;
    for (let k = 0; k < container.size; k++) {
      const key = Array.from(container.keys())[k];
      result += k === container.size - 1 ? ` ${tag}:${key} .` : ` ${tag}:${key},`;
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
    const findImages = find.photos && new Map(find.photos.map(img => [uuidv1(), img]));

    findsDetails += `fs-find:${id} a fs-schema:Find ;
      ${find.depth ? `fs-schema:find-depth "${find.depth}" ;` : ''}
      ${find.additionalMaterials ? `fs-schema:find-additional-materials "${find.additionalMaterials}" ;` : ''}
      ${find.material ? `fs-schema:find-material "${find.material}" ;` : ''}
      ${find.type ? `fs-schema:find-type "${find.type}" ;` : ''}
      ${find.timing ? `fs-schema:find-period "${find.timing}" ;` : ''}
      fs-schema:find-site fs-find-site:${findSiteId} ${findImages ? ';' : '.'}
      ${findImages ? getProperties(FIND_IMAGE_SCHEMA_TAG, FIND_IMAGE_TAG, findImages) : ''}
      
      # Find images
      ${findImages ? getFindImageDetails(findImages) : ''}
      
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
  }

  return findImageResult;
};

/**
 * Returns find site details
 */
const getFindSiteDetails = (id, findSite) => {
  const findSiteImages = findSite.photos && new Map(findSite.photos.map(img => [uuidv1(), img]));

  return `fs-find-site:${id} a fs-schema:FindSite ;
      wgs84:lat ${findSite.coords.lat} ;
      wgs84:long ${findSite.coords.lng} ;
      ${findSiteImages ? getProperties(FIND_SITE_IMAGE_SCHEMA_TAG, FIND_SITE_IMAGE_TAG, findSiteImages) : ''}

      # Find site images
      ${findSiteImages ? getFindSiteImageDetails(findSiteImages) : ''}`;
};

/**
 * Returns find site image details
 */
const getFindSiteImageDetails = (findSiteImages) => {
  let findSiteImageResult = '';
  for (let [id, image] of findSiteImages.entries()) {
    findSiteImageResult += `fs-find-site-image:${id} a fs-schema:FindSiteImage ;
        fs-schema:find-site-image-url "${image}" .
      `;
  }

  return findSiteImageResult;
};

/**
 * Returns report owner details
 */
const getOwnerDetails = (user) => {
  return `
  fs-report-owner:${user.uid} a fs-schema:ReportOwner ;
    fs-schema:report-owner-email "${user.email}" . 
  `;
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
const deleteReport = (reportId) => (`
  ${getPrefixes()}
  DROP GRAPH fs-report:${reportId}
`);

exports.getReport = getReport;
exports.postReport = createPostQuery;
exports.deleteReport = deleteReport;
