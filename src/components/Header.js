import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LangMenu from './LangMenu';
import { logout } from '../actions/auth';



class Header extends Component {
  state = {
    anchorEl: null
  };

  handleMenu = (e) => {
    this.setState({ anchorEl: e.currentTarget });
  };

  onCloseMenuPresed = () => {
    this.setState({ anchorEl: null });
  }

  onLogoutPressed = () => {
    this.onCloseMenuPresed();
    this.props.logout();
  }

  render() {
    const open = !!this.state.anchorEl;

    return (
      <div>
        <AppBar position="static" className="appbar">
          <Toolbar className="appbar__toolbar">
            <Typography variant="h6" color="inherit" className='appbar__typography'>
              FindSampo
            </Typography>
            <LangMenu />
            {
              this.props.isAuthenticated ? (
                <div>
                  <IconButton
                    aria-owns={open ? 'menu-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    component={Link}
                    to="/"
                    color="inherit"
                  >
                    <Button className="appbar__button"variant="contained" color="default" size="small">
                      <Avatar className="button__avatar"size="small">{this.props.username.substring(0, 2).toUpperCase()}</Avatar>
                      <Icon>arrow_drop_down</Icon> 
                    </Button>
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.onCloseMenuPresed}
                  >
                    <MenuItem onClick={this.onLogoutPressed}>Log out</MenuItem>
                  </Menu>
                </div>

              ) : (
                <Button
                  component={Link}
                  to="/login"
                  color="inherit"
                >
                  <Icon className='appbar__icon'>input</Icon>
                  Login
                </Button>
              )
            }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid,
  username: state.auth.displayName
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);