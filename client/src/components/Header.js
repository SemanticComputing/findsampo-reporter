import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import intl from 'react-intl-universal';
import {
  AppBar,
  Toolbar,
  Button,
  Icon,
  IconButton,
  Typography,
  MenuItem,
  Menu,
  Avatar
} from '@material-ui/core/';
import LangMenu from './LangMenu';
import { logout } from '../actions/auth';
import { isDesktopScreen } from '../helpers/functions/functions';
import { RouterPaths } from '../helpers/enum/enums';

class Header extends Component {
  state = {
    anchorEl: null,
    innerWidth: 0
  };

  componentDidMount() {
    window.addEventListener('resize', this.onScreenSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onScreenSizeChange);
  }

  onScreenSizeChange = () => {
    this.setState({ innerWidth: window.innerWidth });
  }

  onMenuPressed = (e) => {
    this.setState({ anchorEl: e.currentTarget });
  };

  onClosePresed = () => {
    this.setState({ anchorEl: null });
  }

  onLogoutPressed = () => {
    this.onClosePresed();
    this.props.logout();
  }

  renderIconContainer() {
    return (
      isDesktopScreen(window) && <div className="appbar__icon-container">
        <Button
          className="appbar__icon-container__icon"
          component={NavLink}
          to={RouterPaths.HOME_PAGE}
          isActive={(match, location) => location.pathname === RouterPaths.HOME_PAGE}
          activeClassName="appbar__icon-container__icon--selected"
        >
          <span className="appbar__icon-container__icon__label">
            {intl.get('bottomNavBar.home')}
          </span>
        </Button>
        <Button
          className="appbar__icon-container__icon"
          component={NavLink}
          to={RouterPaths.MY_FINDS_PAGE}
          isActive={(match, location) => location.pathname.startsWith(RouterPaths.MY_FINDS_PAGE)}
          activeClassName="appbar__icon-container__icon--selected"
        >
          <span className="appbar__icon-container__icon__label">
            {intl.get('bottomNavBar.mine')}
          </span>
        </Button>
        <Button
          className="appbar__icon-container__icon"
          component={NavLink}
          to={RouterPaths.NEARBY_PAGE}
          isActive={(match, location) => location.pathname.startsWith(RouterPaths.NEARBY_PAGE)}
          activeClassName="appbar__icon-container__icon--selected"
        >
          <span className="appbar__icon-container__icon__label">
            {intl.get('bottomNavBar.nearby')}
          </span>
        </Button>
        <Button
          className="appbar__icon-container__icon"
          component={NavLink}
          to={RouterPaths.REPORT_PAGE}
          isActive={(match, location) => location.pathname.startsWith(RouterPaths.REPORT_PAGE)}
          activeClassName="appbar__icon-container__icon--selected"
        >
          <span className="appbar__icon-container__icon__label">
            {intl.get('bottomNavBar.report')}
          </span>
        </Button>
        <Button
          className="appbar__icon-container__icon"
          component={NavLink}
          to={RouterPaths.MORE_PAGE}
          isActive={(match, location) => location.pathname.startsWith(RouterPaths.MORE_PAGE)}
          activeClassName="appbar__icon-container__icon--selected"
        >
          <span className="appbar__icon-container__icon__label">
            {intl.get('bottomNavBar.more')}
          </span>
        </Button>
      </div>
    );
  }



  render() {
    const open = !!this.state.anchorEl;
    const titleclass = isDesktopScreen(window) ? 'appbar__typography' : 'appbar__typography--mobile';
    return (
      <div>
        <AppBar position="static" className="appbar">
          <Toolbar className="appbar__toolbar">
            <Typography variant="h6" color="inherit" className={titleclass}>
              <Link className="appbar__title" to="/">
                {intl.get('header.title')}
              </Link>
            </Typography>
            {
              this.renderIconContainer()
            }
            <LangMenu />
            {
              this.props.isAuthenticated ? (
                <div>
                  <IconButton
                    aria-owns={open ? 'menu-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={this.onMenuPressed}
                    component={Link}
                    to="/"
                    color="inherit"
                  >
                    <Button className="appbar__button" variant="contained" size="small">
                      <Avatar className="appbar__avatar" color="primary" size="small">{this.props.username.substring(0, 2).toUpperCase()}</Avatar>
                      <Icon className="appbar__button__icon">arrow_drop_down</Icon>
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
                    onClose={this.onClosePresed}
                  >
                    <MenuItem onClick={this.onLogoutPressed}>
                      {intl.get('header.logout')}
                    </MenuItem>
                  </Menu>
                </div>

              ) : (
                <Button
                  component={Link}
                  to="/login"
                  color="inherit"
                >
                  <Icon className='appbar__icon'>input</Icon>
                  {intl.get('header.login')}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));