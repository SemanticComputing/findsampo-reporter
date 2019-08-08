module.exports = (id) => {
  return `
    PREFIX wgs84: <http://www.w3.org/2003/01/geo/wgs84_pos#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX fs-schema: <http://ldf.fi/schema/findsampo/>
    PREFIX fs-report: <http://ldf.fi/findsampo/report/>
    PREFIX fs-report-owner: <http://ldf.fi/findsampo/report-owner/>
    PREFIX fs-find: <http://ldf.fi/findsampo/find/>
    PREFIX fs-find-image: <http://ldf.fi/findsampo/find-image/>
    PREFIX fs-find-site: <http://ldf.fi/findsampo/find-site/>
    PREFIX fs-find-site-image: <http://ldf.fi/findsampo/find-site-image/>
    
    SELECT ?find ?depth ?material ?type ?period  ?additionalMaterials ?findSite ?lat ?long
      (GROUP_CONCAT(DISTINCT ?findImageUrl_; SEPARATOR=";") AS ?findImageUrl)
      (GROUP_CONCAT(DISTINCT ?findSiteImageUrl_; SEPARATOR=";") AS ?findSiteImageUrl)
    
      WHERE {
        # Find information
        BIND(<${id}> AS ?find)
        ?find a fs-schema:Find .
        # Find Information
        OPTIONAL {
        ?find fs-schema:find-depth ?depth ;
          fs-schema:find-material ?material;
          fs-schema:find-type ?type;
          fs-schema:find-period ?period;
          fs-schema:find-additional-materials ?additionalMaterials.
        }
        #Find image information
        OPTIONAL {
          ?find fs-schema:find-image ?findImage .
          ?findImage fs-schema:find-image-url ?findImageUrl_ .
        }
        #Find site information
        OPTIONAL {
        ?find fs-schema:find-site ?findSite .
        ?findSite wgs84:lat ?lat ;
          wgs84:long ?long .
        }
        #Find site images information
        OPTIONAL {
        ?find fs-schema:find-site ?findSite .
        ?findSite fs-schema:find-site-image ?findSiteImage .
          ?findSiteImage fs-schema:find-site-image-url ?findSiteImageUrl_ .
        }
      } 
    GROUP BY ?find ?depth ?material ?type ?period  ?additionalMaterials ?findSite ?lat ?long
    `;
};
