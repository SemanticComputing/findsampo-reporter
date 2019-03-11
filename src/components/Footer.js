import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const Footer = () => {
  return (
    <div>
      <AppBar position="static" className='footer'>
        <Toolbar>
          <p>Copyright © 2019 FindSampo</p>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Footer;