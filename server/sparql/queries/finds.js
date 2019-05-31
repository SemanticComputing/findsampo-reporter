const getValidatedFinds = `
  PREFIX  skos: <http://www.w3.org/2004/02/skos/core#>
  PREFIX  wgs84: <http://www.w3.org/2003/01/geo/wgs84_pos#>
  PREFIX  rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX  sualt: <http://ldf.fi/schema/sualt/>
  PREFIX  foaf: <http://xmlns.com/foaf/0.1/>

  SELECT ?id ?title ?specification ?municipality ?province ?sub_category
    ?typological_extension ?main_material ?period ?start_year
    ?extension_one ?end_year ?extension_two ?description ?lat ?long
    (GROUP_CONCAT(DISTINCT ?image_url_; SEPARATOR=";") AS ?image_url)
    (GROUP_CONCAT(DISTINCT ?archaeological_site_url_; SEPARATOR=";") AS ?archaeological_site_url)
  WHERE {
    ?id a sualt:Find .
    ?id skos:prefLabel ?title .
    OPTIONAL { ?id sualt:specification ?specification }
    OPTIONAL { ?id sualt:municipality ?municipality }
    OPTIONAL { ?id sualt:province ?province }
    OPTIONAL { ?id sualt:type ?type }
    OPTIONAL { ?id sualt:sub_category ?sub_category }
    OPTIONAL { ?id sualt:typological_extension ?typological_extension }
    OPTIONAL { ?id sualt:main_material  ?main_material }
    OPTIONAL { ?id sualt:period ?period }
    OPTIONAL { ?id sualt:start_year ?start_year }
    OPTIONAL { ?id sualt:extension_one ?extension_one }
    OPTIONAL { ?id sualt:end_year ?end_year }
    OPTIONAL { ?id sualt:extension_two ?extension_two }
    OPTIONAL { ?id sualt:description ?description }
    OPTIONAL { ?id sualt:image_url ?image_url_ }
    OPTIONAL { ?id sualt:archaeological_site_url ?archaeological_site_url_ }
    OPTIONAL {
       ?id wgs84:lat ?lat ;
           wgs84:long ?long .
    }
  }
  GROUP BY ?id ?title ?specification ?municipality ?province ?sub_category
    ?typological_extension ?main_material ?period ?start_year
    ?extension_one ?end_year ?extension_two ?description ?lat ?long
`;

exports.getValidatedFinds = getValidatedFinds;
