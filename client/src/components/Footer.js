import React from 'react';
import { AppBar, Slide, Toolbar } from '@material-ui/core';
import { isMobileScreen } from '../helpers/functions/functions';
import { RouterPaths } from '../helpers/enum/enums';

const Footer = () => {
  return (
    !isMobileScreen(window) &&
    <Slide direction="up" in={window.location.pathname !== RouterPaths.NEARBY_PAGE} mountOnEnter unmountOnExit>
      <div>
        <AppBar position="static" className='footer'>
          <Toolbar className="footer__toolbar">
            <div className="footer__logo-container">
              <a
                className="footer__link"
                href="https://www.aalto.fi/"
                target='_blank'
                rel='noopener noreferrer'
              >
                <img className="footer__img footer__img-small" src="images/logos/logo_aalto-compressor.png" alt='Aalto University logo' />
              </a>

              <a
                className="footer__link"
                href="https://www.helsinki.fi/"
                target='_blank'
                rel='noopener noreferrer'
              >
                <img className="footer__img" src="images/logos/logo_helsinki-compressor.png" alt='University of Helsinki logo' />
              </a>

              <a
                className="footer__link"
                href="http://www.heldig.fi/"
                target='_blank'
                rel='noopener noreferrer'
              >
                <img className="footer__img footer__img-small" src="images/logos/logo_heldig-compressor.png" alt='HELDIG logo' />
              </a>

              <a
                className="footer__link"
                href="https://seco.cs.aalto.fi/"
                target='_blank'
                rel='noopener noreferrer'
              >
                <img className="footer__img" src="images/logos/logo_seco-compressor.png" alt='SeCo logo' />
              </a>

              <a
                className="footer__link"
                href="https://www.museovirasto.fi/"
                target='_blank'
                rel='noopener noreferrer'
              >
                <img className="footer__img" src="images/logos/logo_fha-compressor.png" alt='FHA logo' />
              </a>
            </div>
            <div className="footer__social-media-container">
              <a
                className="footer__link"
                href="https://www.facebook.com/SuALTProject/"
                target='_blank'
                rel='noopener noreferrer'
              >
                <img src="images/facebook.ico" alt='Facebook' />
              </a>
              <a
                className="footer__link"
                href="https://twitter.com/sualtproject"
                target='_blank'
                rel='noopener noreferrer'
              >
                <img src="images/twitter.ico" alt='Twitter' />
              </a>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </Slide>
  );
};

export default Footer;