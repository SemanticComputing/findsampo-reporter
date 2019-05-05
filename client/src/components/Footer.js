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
          <Toolbar>
            <p>Copyright © 2019 FindSampo</p>
          </Toolbar>
        </AppBar>
      </div>
    </Slide>
  );
};

export default Footer;