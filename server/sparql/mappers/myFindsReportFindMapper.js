module.exports = (finds) => {
  const result = finds.map(f => {
    return {
      id: f.find.value,
      depth: f.hasOwnProperty('depth') && f.depth.value,
      material: f.hasOwnProperty('material') && f.material.value,
      type: f.hasOwnProperty('type') && f.type.value,
      period: f.hasOwnProperty('period') && f.period.value,
      additionalMaterials: f.hasOwnProperty('additionalMaterials') && f.additionalMaterials.value,
      findSite: {
        coords: {
          lat: f.lat.value,
          lng: f.long.value
        },
        photos: f.findImageUrl.value.split(';')
      },
      photos: f.findImageUrl.value.split(';')
    };
  });

  return result;
};