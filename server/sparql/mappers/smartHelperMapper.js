module.exports = (sparqlBindings) => {
  const results = sparqlBindings.map(b => {
    return {
      property: b.hasOwnProperty('property') && b.property.value,
      count: b.hasOwnProperty('count') && parseInt(b.count.value)
    };
  });
  return results;
};
