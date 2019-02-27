import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import LangMenu from './LangMenu';

const Header = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className='appbar__typography'>
            FindSampo
          </Typography>
          <LangMenu />
          <Button color="inherit">
            <Icon className='appbar__icon'>input</Icon>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;