module.exports = (sparqlBindings) => {
  const results = sparqlBindings.map(b => {
    return {
      id: b.reportId.value,
      status: b.status.value,
      ...(Object.prototype.hasOwnProperty.call(b, 'municipality') && { municipality: b.municipality.value }),
      date: b.date.value,
      currentStep: b.currentStep.value,
      currentFindIndex: b.currentFindIndex.value,
      finds: Object.prototype.hasOwnProperty.call(b, 'finds') && b.finds.value.split(';'),
      findImages: Object.prototype.hasOwnProperty.call(b, 'findImages') && b.findImages.value.split(';'),
      findSiteImages: Object.prototype.hasOwnProperty.call(b, 'findSiteImages') && b.findSiteImages.value.split(';'),
    };
  });
  return results;
};
