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
  Avatar,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Typography
} from '@material-ui/core/';
import LangMenu from './LangMenu';
import { logout } from '../actions/auth';
import { isDesktopScreen, isIOSDevice } from '../utils/functions/functions';
import { RouterPaths } from '../utils/enum/enums';

class Header extends Component {
  state = {
    isMenuOpen: false,
    isMobileMoreMenuOpen: false,
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

  onMenuOpenPressed = () => {
    this.setState(state => ({ isMenuOpen: !state.isMenuOpen }));
  };

  onMenuClosePressed = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ isMenuOpen: false });
  };

  onMoreMenuOpenPressed = () => {
    this.setState(state => ({ isMobileMoreMenuOpen: !state.isMobileMoreMenuOpen }));
  };

  onMoreMenuClosePressed = event => {
    if (this.moreButtonAnchorEl.contains(event.target)) {
      return;
    }
    this.setState({ isMobileMoreMenuOpen: false });
  };

  onLogoutPressed = () => {
    this.props.logout();
    this.setState({
      isMenuOpen: false,
      isMobileMoreMenuOpen: false
    });
  }

  renderDesktopMenuItems() {
    // The usage of React.forwardRef will no longer be required for react-router-dom v6.
    // see https://github.com/ReactTraining/react-router/issues/6056
    const AdapterLink = React.forwardRef((props, ref) => <NavLink innerRef={ref} {...props} />);

    return (
      isDesktopScreen(window) && <div className="appbar__icon-container">
        <Button
          className="appbar__icon-container__icon"
          component={AdapterLink}
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
          component={AdapterLink}
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
          component={AdapterLink}
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
          component={AdapterLink}
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
          component={AdapterLink}
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

  renderLoginMenu() {
    return this.props.isAuthenticated ? (
      <div>
        <IconButton
          buttonRef={node => { this.anchorEl = node; }}
          aria-owns={this.state.isMenuOpen ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={this.onMenuOpenPressed}
          color="inherit"
          size="small"
          className="appbar__toolbar__log-out-button"
        >
          <Avatar className="appbar__avatar" color="primary" size="small">{this.getAvatarText()}</Avatar>
          <Icon className="appbar__button__icon">arrow_drop_down</Icon>
        </IconButton>
        <Popper
          open={this.state.isMenuOpen}
          anchorEl={this.anchorEl}
          transition disablePortal className="header__popper"
          placement="bottom-end"
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.onMenuClosePressed}>
                  <MenuList>
                    <MenuItem onClick={this.onLogoutPressed}>
                      {intl.get('header.logout')}
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    ) : (
      <Button
        component={Link}
        to={RouterPaths.LOGIN_PAGE}
        color="inherit"
        className="appbar__login-button"
      >
        <Icon className="appbar__icon">input</Icon>
        {intl.get('header.login')}
      </Button>
    );
  }

  renderIOSMenu() {
    // The usage of React.forwardRef will no longer be required for react-router-dom v6.
    // see https://github.com/ReactTraining/react-router/issues/6056
    const AdapterLink = React.forwardRef((props, ref) => <NavLink innerRef={ref} {...props} />);
    return (
      <Popper
        open={this.state.isMobileMoreMenuOpen}
        anchorEl={this.moreButtonAnchorEl}
        disablePortal
        transition
        className="appbar__ios--popper"
        placement="bottom-end">
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            id="more-menu-list-grow"
            style={{ transformOrigin: placement === 'bottom-end' ? 'center top' : 'center bottom' }}
          >
            <Paper >
              <ClickAwayListener onClickAway={this.onMoreMenuClosePressed}>
                <MenuList>
                  <MenuItem
                    component={AdapterLink}
                    to={RouterPaths.HOME_PAGE}
                    onClick={this.onMoreMenuOpenPressed}
                  >{intl.get('bottomNavBar.home')}</MenuItem>
                  <MenuItem
                    component={AdapterLink}
                    to={RouterPaths.MY_FINDS_PAGE}
                    onClick={this.onMoreMenuOpenPressed}
                  >{intl.get('bottomNavBar.mine')}</MenuItem>
                  <MenuItem
                    component={AdapterLink}
                    to={RouterPaths.NEARBY_PAGE}
                    onClick={this.onMoreMenuOpenPressed}
                  >{intl.get('bottomNavBar.nearby')}</MenuItem>
                  <MenuItem
                    component={AdapterLink}
                    to={RouterPaths.REPORT_PAGE}
                    onClick={this.onMoreMenuOpenPressed}
                  >{intl.get('bottomNavBar.report')}</MenuItem>
                  <MenuItem
                    component={AdapterLink}
                    to={RouterPaths.MORE_PAGE}
                    onClick={this.onMoreMenuOpenPressed}
                  >{intl.get('bottomNavBar.more')}</MenuItem>
                  {
                    this.props.isAuthenticated ? (
                      <MenuItem
                        onClick={this.onLogoutPressed}
                      >
                        {intl.get('header.logout')}
                      </MenuItem>
                    ) : (
                      <MenuItem
                        component={AdapterLink}
                        to={RouterPaths.LOGIN_PAGE}
                        onClick={this.onMoreMenuClosePressed}
                      >
                        {intl.get('header.login')}
                      </MenuItem>
                    )
                  }
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow >
        )
        }
      </Popper>
    );
  }

  render() {
    //const titleclass = isDesktopScreen(window) ? 'appbar__typography' : 'appbar__typography--mobile';
    return (
      <div>
        <AppBar position="static" className="appbar">
          <Toolbar className="appbar__toolbar">
            <Link to={RouterPaths.HOME_PAGE} className="appbar__toolbar__link">
              {
                isDesktopScreen(window) ?
                  <div className="appbar__toolbar__logo-container">
                    <img className="appbar__toolbar__logo-container__logo" src="images/logo.png" />
                    <Typography variant="h5" className="appbar__toolbar__logo-container__text">
                      {intl.get('header.title')}
                    </Typography>
                  </div>
                  :
                  <img src="images/logo.png" className="appbar__toolbar__logo-container__logo" />
              }
            </Link>
            {this.renderDesktopMenuItems()}
            {this.renderIOSMenu()}
            <LangMenu />
            {!isIOSDevice(window) && this.renderLoginMenu()}
            {
              isIOSDevice(window) &&
              <IconButton
                className="appbar__more-icon"
                aria-owns="more-menu-list-grow"
                aria-haspopup="true"
                buttonRef={node => { this.moreButtonAnchorEl = node; }}
                onClick={this.onMoreMenuOpenPressed}
              >
                <Icon color="secondary" fontSize="large">menu</Icon>
              </IconButton>
            }
          </Toolbar>
        </AppBar>
      </div>
    );
  }

  /**
   * Get first two characters for the avatar icon
   */
  getAvatarText = () => {
    const avatarText = this.props.username ? this.props.username : this.props.email;
    return avatarText.substring(0, 2).toUpperCase();
  };
}

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid,
  username: state.auth.displayName,
  email: state.auth.email
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));