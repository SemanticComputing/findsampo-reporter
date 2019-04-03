const MOBILE_SCREEN_MAX_WIDTH = 650;

export const isMobileScreen = (window) => {
  return window.innerWidth < MOBILE_SCREEN_MAX_WIDTH;
};

export const isDesktopScreen = (window) => {
  return window.innerWidth > MOBILE_SCREEN_MAX_WIDTH;
};