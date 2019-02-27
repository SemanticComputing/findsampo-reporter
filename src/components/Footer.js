import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const Footer = () => {
  return (
    <div>
      <AppBar position="static" id='footer'>
        <Toolbar>
          <Button color='inherit'>FOOOOOTEEEERRR</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Footer;