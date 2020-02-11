module.exports = (uid) => {
  return `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX fs-schema: <http://ldf.fi/schema/findsampo/>
    PREFIX fs-report: <http://ldf.fi/findsampo/report/>
    PREFIX fs-report-owner: <http://ldf.fi/findsampo/report-owner/>
    PREFIX fs-find-site: <http://ldf.fi/findsampo/find-site/>
    PREFIX fs-find: <http://ldf.fi/findsampo/find/>
    PREFIX fs-find-image: <http://ldf.fi/findsampo/find-image/>
    
    SELECT ?reportId ?date ?municipality ?status ?currentStep ?currentFindIndex
        (GROUP_CONCAT(DISTINCT ?find_; SEPARATOR=";") AS ?finds)
        (GROUP_CONCAT(DISTINCT ?findImage_; SEPARATOR=";") AS ?findImages)
        (GROUP_CONCAT(DISTINCT ?findSiteImage_; SEPARATOR=";") AS ?findSiteImages)
    WHERE {
        graph ?reportId {
          { 
              SELECT *
              WHERE {
                # Report Data
                ?reportId a fs-schema:Report ; 
                  fs-schema:report-owner fs-report-owner:${uid} ;
                  fs-schema:report-status ?status ;
                  fs-schema:report-current-step ?currentStep ;
                  fs-schema:report-current-find-index ?currentFindIndex ;
                  fs-schema:report-submission-date ?date ;
                  fs-schema:report-municipality ?municipality ;
                  fs-schema:report-find ?find_ .

                # Find Data
                ?find a fs-schema:Find ;
                  fs-schema:find-site ?findSite ;
                  fs-schema:find-image/fs-schema:find-image-url ?findImage_ .

                # FindSite Data
                ?findSite fs-schema:find-site-image/fs-schema:find-site-image-url ?findSiteImage_ .
              }
          }
        } 
    }
    GROUP BY ?reportId ?date ?municipality ?status ?currentStep ?currentFindIndex
  `;
};
