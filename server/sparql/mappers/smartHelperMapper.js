module.exports = (sparqlBindings) => {
  const results = sparqlBindings.map(b => {
    return {
      ...(Object.prototype.hasOwnProperty.call(b, 'property') && { property: b.property.value }),
      ...(Object.prototype.hasOwnProperty.call(b, 'count') && { count: parseInt(b.count.value )}),
    };
  });
  return results;
};
