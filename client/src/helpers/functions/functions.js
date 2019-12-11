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

export const getIdsfromArrayUri = (seperator, array) => {
  return array.map((id) => id.split(`${seperator}/`).pop());
};

export const getWMTSLayerKeyByValue = (value) => {
  const names = {
    arkeologiset_loydot: 'Arkeologiset löydöt',
    arkeologiset_kohteet_alue: 'Muinaisjäännösalueet',
    arkeologiset_kohteet_piste: 'Muinaisjäännöspisteet',
    maailmanperinto_alue: 'Maailmanperintökohteet alueet',
    maailmanperinto_piste: 'Maailmanperintökohteet pisteet',
    rakennusperinto_alue: 'Rakennusperintörekisterin suojellut alueet',
    rakennusperinto_piste: 'Rakennusperintörekisterin suojellut rakennukset',
    arkeologisten_kohteiden_alakohteet_piste: 'Muinaisjäännösten alakohteet',
    rky_alue: 'Valtakunnallisesti merkittävät rakennetut kulttuuriympäristöt alueet',
    rky_piste: 'Valtakunnallisesti merkittävät rakennetut kulttuuriympäristöt pisteet',
    rky_viiva: 'Valtakunnallisesti merkittävät rakennetut kulttuuriympäristöt viivat'
  };

  return invert(names)[value];
};

export const createThumbUrl = (url) => {
  return url.replace('.png', '_thumb.png');
};

export const getWMTSLayerValueByKey = (value) => {
  const names = {
    arkeologiset_loydot: 'Arkeologiset löydöt',
    arkeologiset_kohteet_alue: 'Muinaisjäännösalueet',
    arkeologiset_kohteet_piste: 'Muinaisjäännöspisteet',
    maailmanperinto_alue: 'Maailmanperintökohteet alueet',
    maailmanperinto_piste: 'Maailmanperintökohteet pisteet',
    rakennusperinto_alue: 'Rakennusperintörekisterin suojellut alueet',
    rakennusperinto_piste: 'Rakennusperintörekisterin suojellut rakennukset',
    arkeologisten_kohteiden_alakohteet_piste: 'Muinaisjäännösten alakohteet',
    rky_alue: 'Valtakunnallisesti merkittävät rakennetut kulttuuriympäristöt alueet',
    rky_piste: 'Valtakunnallisesti merkittävät rakennetut kulttuuriympäristöt pisteet',
    rky_viiva: 'Valtakunnallisesti merkittävät rakennetut kulttuuriympäristöt viivat'
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
