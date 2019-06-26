const postReport = `
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX wgs84: <http://www.w3.org/2003/01/geo/wgs84_pos#>

    PREFIX fs-report: <http://ldf.fi/findsampo/report/>
    PREFIX fs-user: <http://ldf.fi/findsampo/user/>
    PREFIX fs-find-site: <http://ldf.fi/findsampo/find-site/>
    PREFIX fs-find: <http://ldf.fi/findsampo/find/>
    PREFIX fs-find-image: <http://ldf.fi/findsampo/find-image/>
    PREFIX fs-schema: <http://ldf.fi/schema/findsampo/>

    INSERT DATA {
    GRAPH fs-user:1 {
        # Report information
        fs-report:1 a fs-schema:Report ;
            fs-schema:report-description "description" ;
            fs-schema:report-municipality "Tornioooooooo" ;
            fs-schema:report-submission-date "2013-05-14"^^xsd:date;
            fs-schema:report-status "draft" ;
            fs-schema:report-current-step  ${new Date().getMilliseconds()} ;
            fs-schema:report-find-site fs-find-site:1 ;
            fs-schema:report-find fs-find:1 .
        
        # Find site information
        fs-find-site:1 a fs-schema:FindSite ;
        fs-schema:find-site-image fs-find:find-site-image:1 .
        
        # Find site images
        fs-find:find-site-image:1 a fs-schema:FindSiteImage ;
            fs-schema:find-site-image-url "url" .
        
        # Find information
        fs-find:1 a fs-schema:Find ;
            fs-schema:find-material "material";
            fs-schema:find-type "type";
            fs-schema:find-period "period";
            fs-schema:find-depth "depth";
            wgs84:lat 1.222222;
            wgs84:long 1.222222;
            fs-schema:find-image fs-find:find-image:1, fs-find:find-image:2 .
        
        # Find images
        fs-find-image:1 a fs-schema:FindImage ;
            fs-schema:find-image-url "url1" .
        fs-find-image:2 a fs-schema:FindImage ;
        fs-schema:find-image-url "url2" .
    } 
    }
`;

const getReport = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    SELECT * WHERE {
    ?sub ?pred ?obj .
    } 
`;

exports.getReport = getReport;
exports.postReport = postReport;
