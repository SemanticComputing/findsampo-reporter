import { invert, countBy, filter } from 'lodash';
import intl from 'react-intl-universal';

const MOBILE_SCREEN_MAX_WIDTH = 650;

export const isMobileScreen = (window) => {
  return window.innerWidth < MOBILE_SCREEN_MAX_WIDTH;
};

export const isDesktopScreen = (window) => {
  return window.innerWidth > MOBILE_SCREEN_MAX_WIDTH;
};

export const isIOSDevice = (window) => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
};

export const getIdfromUri = (seperator, text) => {
  return text.split(`${seperator}/`).pop();
};

export const getThumbId = (text) => {
  const [id] = text.split('.png');
  return `${id}_thumb.png`;
};

export const getIdsfromArrayUri = (seperator, array) => {
  return array.map((id) => id.split(`${seperator}/`).pop());
};

export const getWMTSLayerKeyByValue = (value) => {
  const names = {
    // arkeologiset_loydot: 'Arkeologiset löydöt',
    // arkeologiset_kohteet_alue: 'Muinaisjäännösalueet',
    // arkeologiset_kohteet_piste: 'Muinaisjäännöspisteet',
    // maailmanperinto_alue: 'Maailmanperintökohteet alueet',
    // maailmanperinto_piste: 'Maailmanperintökohteet pisteet',
    // rakennusperinto_alue: 'Rakennusperintörekisterin suojellut alueet',
    // rakennusperinto_piste: 'Rakennusperintörekisterin suojellut rakennukset',
    // arkeologisten_kohteiden_alakohteet_piste: 'Muinaisjäännösten alakohteet',
    // rky_alue: 'Valtakunnallisesti merkittävät rakennetut kulttuuriympäristöt alueet',
    // rky_piste: 'Valtakunnallisesti merkittävät rakennetut kulttuuriympäristöt pisteet',
    // rky_viiva: 'Valtakunnallisesti merkittävät rakennetut kulttuuriympäristöt viivat'
    arkeologiset_loydot: 'Archaeological finds',
    arkeologiset_kohteet_alue: 'Archaeological sites, areas',
    arkeologiset_kohteet_piste: 'Archaeological sites, points',
    maailmanperinto_alue: 'World heritage sites, areas',
    maailmanperinto_piste: 'World heritage sites, points',
    rakennusperinto_alue: 'Architectural heritage, areas',
    rakennusperinto_piste: 'Architectural heritage, buildings',
    arkeologisten_kohteiden_alakohteet_piste: 'Archaeological sites, subparts, points',
    rky_alue: 'Notable cultural environments, areas',
    rky_piste: 'Notable cultural environments, points',
    rky_viiva: 'Notable cultural environments, lines'
  };

  return invert(names)[value];
};

export const createThumbUrl = (url) => {
  return url.replace('.png', '_thumb.png');
};

export const getWMTSLayerValueByKey = (value) => {
  const names = {
    // arkeologiset_loydot: 'Arkeologiset löydöt',
    // arkeologiset_kohteet_alue: 'Muinaisjäännösalueet',
    // arkeologiset_kohteet_piste: 'Muinaisjäännöspisteet',
    // maailmanperinto_alue: 'Maailmanperintökohteet alueet',
    // maailmanperinto_piste: 'Maailmanperintökohteet pisteet',
    // rakennusperinto_alue: 'Rakennusperintörekisterin suojellut alueet',
    // rakennusperinto_piste: 'Rakennusperintörekisterin suojellut rakennukset',
    // arkeologisten_kohteiden_alakohteet_piste: 'Muinaisjäännösten alakohteet',
    // rky_alue: 'Valtakunnallisesti merkittävät rakennetut kulttuuriympäristöt alueet',
    // rky_piste: 'Valtakunnallisesti merkittävät rakennetut kulttuuriympäristöt pisteet',
    // rky_viiva: 'Valtakunnallisesti merkittävät rakennetut kulttuuriympäristöt viivat'
    arkeologiset_loydot: 'Archaeological finds',
    arkeologiset_kohteet_alue: 'Archaeological sites, areas',
    arkeologiset_kohteet_piste: 'Archaeological sites, points',
    maailmanperinto_alue: 'World heritage sites, areas',
    maailmanperinto_piste: 'World heritage sites, points',
    rakennusperinto_alue: 'Architectural heritage, areas',
    rakennusperinto_piste: 'Architectural heritage, buildings',
    arkeologisten_kohteiden_alakohteet_piste: 'Archaeological sites, subparts, points',
    rky_alue: 'Notable cultural environments, areas',
    rky_piste: 'Notable cultural environments, points',
    rky_viiva: 'Notable cultural environments, lines'
  };

  return names[value];
};

export const convertToTableData = (data) => {
  const tableData = [];
  for (let d of data) {
    tableData.push(
      {
        title: d.title,
        material: d.main_material ? d.main_material : '-',
        type: d.type ? d.type : '-',
        period: d.period ? d.period : '-',
        municipality: d.municipality ? d.municipality : '-',
        description: d.description ? d.description : intl.get('nearByPage.table.noAdditionalInformation'),
        image: d.image_url ? d.image_url : '',
        specification: d.specification ? d.specification : intl.get('nearByPage.table.notProvidedValue'),
        province: d.province ? d.province : intl.get('nearByPage.table.notProvidedValue')
      }
    );
  }
  return tableData;
};

export const convertToChartData = (data, activeProperty) => {
  const dataWithPropery = filter(data, (d) => d[activeProperty]);
  const result = countBy(dataWithPropery, (d) => d[activeProperty]);

  return {
    labels: Object.keys(result),
    series: Object.values(result)
  };
};

/**
 * Creates marker data from finds to show on a map
 */
export const createMarkerDataFromFind = (finds) => {
  const markerData = [];
  finds.map((f) => {
    markerData.push({
      id: f.id,
      reportId: f.reportId,
      lat: f.findSite.coords.lat,
      long: f.findSite.coords.lng,
      image_url: f.photos[0] // Only one photo is shown
    });
  });

  return markerData;
};
