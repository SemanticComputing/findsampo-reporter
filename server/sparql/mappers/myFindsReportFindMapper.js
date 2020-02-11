module.exports = (finds) => {
  const result = finds.map(f => {
    return {
      id: f.find.value,
      reportId: f.report.value,
      ...(Object.prototype.hasOwnProperty.call(f, 'depth') && { depth: f.depth.value }),
      ...(Object.prototype.hasOwnProperty.call(f, 'material') && { material: f.material.value }),
      ...(Object.prototype.hasOwnProperty.call(f, 'type') && { type: f.type.value }),
      ...(Object.prototype.hasOwnProperty.call(f, 'period') && { period: f.period.value }),
      ...(Object.prototype.hasOwnProperty.call(f, 'additionalMaterials') && { additionalMaterials: f.additionalMaterials.value }),
      findSite: {
        coords: {
          ...(Object.prototype.hasOwnProperty.call(f, 'lat') && { lat: f.lat.value }),
          ...(Object.prototype.hasOwnProperty.call(f, 'long') && { lng: f.long.value }),
        },
        photos: Object.prototype.hasOwnProperty.call(f, 'findSiteImageUrl') && f.findSiteImageUrl.value.split(';')
      },
      photos: Object.prototype.hasOwnProperty.call(f, 'findImageUrl') && f.findImageUrl.value.split(';')
    };
  });

  return result;
};