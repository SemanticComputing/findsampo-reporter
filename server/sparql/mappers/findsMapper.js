module.exports = function mapFinds(sparqlBindings) {
  const results = sparqlBindings.map(b => {
    return {
      id: b.id.value,
      title: b.title.value,
      specification: b.hasOwnProperty('specification') ? b.specification.value : '-',
      municipality: b.hasOwnProperty('municipality') ? b.municipality.value : '-',
      province: b.hasOwnProperty('province') ? b.province.value : '-',
      type: b.hasOwnProperty('type') ? b.type.value : '-',
      sub_category: b.hasOwnProperty('sub_category') ? b.sub_category.value : '-',
      typological_extension: b.hasOwnProperty('typological_extension') ? b.typological_extension.value : '-',
      main_material: b.hasOwnProperty('main_material') ? b.main_material.value : '-',
      period: b.hasOwnProperty('period') ? b.period.value : '-',
      start_year: b.hasOwnProperty('start_year') ? b.start_year.value : '-',
      extension_one: b.hasOwnProperty('extension_one') ? b.extension_one.value : '-',
      end_year: b.hasOwnProperty('end_year') ? b.end_year.value : '-',
      extension_two: b.hasOwnProperty('extension_two') ? b.extension_two.value : '-',
      description: b.hasOwnProperty('description') ? b.description.value : '-',
      archaeological_site_url: b.hasOwnProperty('archaeological_site_url') ? b.archaeological_site_url.value : '-',
      image_url: b.hasOwnProperty('image_url') ? b.image_url.value : '-',
      lat: b.hasOwnProperty('lat') ? b.lat.value : '-',
      long: b.hasOwnProperty('long') ? b.long.value : '-',
    };
  });
  return results;
};
