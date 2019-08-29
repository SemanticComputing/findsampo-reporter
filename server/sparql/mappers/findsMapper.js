module.exports = (sparqlBindings) => {
  const results = sparqlBindings.map(b => {
    return {
      id: b.id.value,
      title: b.title.value,
      ...(Object.prototype.hasOwnProperty.call(b, 'specification') && { specification: b.specification.value }),
      ...(Object.prototype.hasOwnProperty.call(b, 'municipality') && { municipality: b.municipality.value }),
      ...(Object.prototype.hasOwnProperty.call(b, 'province') && { province: b.province.value }),
      ...(Object.prototype.hasOwnProperty.call(b, 'type') && { type: b.type.value }),
      ...(Object.prototype.hasOwnProperty.call(b, 'sub_category') && { sub_category: b.sub_category.value }),
      ...(Object.prototype.hasOwnProperty.call(b, 'typological_extension') && { typological_extension: b.typological_extension.value }),
      ...(Object.prototype.hasOwnProperty.call(b, 'main_material') && { main_material: b.main_material.value }),
      ...(Object.prototype.hasOwnProperty.call(b, 'period') && { period: b.period.value }),
      ...(Object.prototype.hasOwnProperty.call(b, 'start_year') && { start_year: b.start_year.value }),
      ...(Object.prototype.hasOwnProperty.call(b, 'extension_one') && { extension_one: b.extension_one.value }),
      ...(Object.prototype.hasOwnProperty.call(b, 'end_year') && { end_year: b.end_year.value }),
      ...(Object.prototype.hasOwnProperty.call(b, 'extension_two') && { extension_two: b.extension_two.value }),
      ...(Object.prototype.hasOwnProperty.call(b, 'description') && { description: b.description.value }),
      ...(Object.prototype.hasOwnProperty.call(b, 'archaeological_site_url') && { archaeological_site_url: b.archaeological_site_url.value }),
      ...(Object.prototype.hasOwnProperty.call(b, 'image_url') && { image_url: b.image_url.value }),
      ...(Object.prototype.hasOwnProperty.call(b, 'lat') && { lat: b.lat.value }),
      ...(Object.prototype.hasOwnProperty.call(b, 'long') && { long: b.long.value })
    };
  });
  return results;
};
