module.exports = (property) => {
  return `
    PREFIX  sualt: <http://ldf.fi/schema/sualt/>
    SELECT ?property (COUNT(?property) AS ?count)
    WHERE {
      ?id a sualt:Find .
      OPTIONAL { ?id sualt:${property}  ?property }
    }
    GROUP BY ?property`;
};


