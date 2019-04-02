const MOBILE_SCREEN_MAX_WIDTH = 600;

export const isMobileScreen = (window) => {
  return window.innerWidth < MOBILE_SCREEN_MAX_WIDTH;
};