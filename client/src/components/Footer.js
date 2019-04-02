import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { isMobileScreen } from '../helpers/functions/functions';

const Footer = () => {
  return (
    !isMobileScreen(window) && <div>
      <AppBar position="static" className='footer'>
        <Toolbar>
          <p>Copyright © 2019 FindSampo</p>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Footer;