module.exports = (sparqlBindings) => {
  const results = sparqlBindings.map(b => {
    return {
      id: b.reportId.value,
      status: b.status.value,
      municipality: b.municipality.value,
      date: b.date.value,
      currentStep: b.currentStep.value,
      currentFindIndex: b.currentFindIndex.value,
      finds: b.hasOwnProperty('finds') && b.finds.value.split(';'),
    };
  });
  return results;
};
