import { invert } from 'lodash';
import axios from 'axios';

const MOBILE_SCREEN_MAX_WIDTH = 650;

export const isMobileScreen = (window) => {
  return window.innerWidth < MOBILE_SCREEN_MAX_WIDTH;
};

export const isDesktopScreen = (window) => {
  return window.innerWidth > MOBILE_SCREEN_MAX_WIDTH;
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

export const fetchWMTSData = async (layer, bounds) => {
  const boxBounds = `${bounds._southWest.lng},${bounds._southWest.lat},${bounds._northEast.lng},${bounds._northEast.lat}`;
  const url = `/api/v1/fha_wfs?layer=${layer}&boxBounds=${boxBounds}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};