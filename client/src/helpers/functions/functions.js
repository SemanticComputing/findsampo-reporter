import { invert } from 'lodash';

const MOBILE_SCREEN_MAX_WIDTH = 650;

export const isMobileScreen = (window) => {
  return window.innerWidth < MOBILE_SCREEN_MAX_WIDTH;
};

export const isDesktopScreen = (window) => {
  return window.innerWidth > MOBILE_SCREEN_MAX_WIDTH;
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
