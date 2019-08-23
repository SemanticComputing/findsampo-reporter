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
  Avatar,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem
} from '@material-ui/core/';
import LangMenu from './LangMenu';
import { logout } from '../actions/auth';
import { isDesktopScreen } from '../helpers/functions/functions';
import { RouterPaths } from '../helpers/enum/enums';

class Header extends Component {
  state = {
    menuOpen: false,
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
    this.setState(state => ({ menuOpen: !state.menuOpen }));
  };

  onMenuClosePressed = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ menuOpen: false });
  };

  onLogoutPressed = () => {
    this.props.logout();
    this.setState({ menuOpen: false });
  }

  renderIconContainer() {
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

  render() {
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
                    buttonRef={node => { this.anchorEl = node; }}
                    aria-owns={this.state.menuOpen ? 'menu-list-grow' : undefined}
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
                    open={this.state.menuOpen}
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
                  to="/login"
                  color="inherit"
                  className="appbar__login-button"
                >
                  <Icon className="appbar__icon">input</Icon>
                  {intl.get('header.login')}
                </Button>
              )
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