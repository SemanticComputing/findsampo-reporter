import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon, BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import intl from 'react-intl-universal';
import { isMobileScreen } from '../helpers/functions/functions';
import { RouterPaths } from '../helpers/enum/enums';

class BottomNav extends Component {
  state = {
    innerWidth: 0
  }

  componentDidMount() {
    window.addEventListener('resize', this.onScreenSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onScreenSizeChange);
  }

  onScreenSizeChange = () => {
    this.setState({ innerWidth: window.innerWidth });
  }

  render() {
    return (
      isMobileScreen(window) && <div className="bottom-nav">
        <BottomNavigation
          showLabels
        >
          <BottomNavigationAction
            className="bottom-nav__action"
            label={intl.get('bottomNavBar.home')}
            icon={<Icon>home</Icon>}
            component={NavLink}
            to={RouterPaths.HOME_PAGE}
            isActive={(match, location) => location.pathname === RouterPaths.HOME_PAGE}
            activeClassName="bottom-nav__selected"
          />
          <BottomNavigationAction
            className="bottom-nav__action"
            label={intl.get('bottomNavBar.mine')}
            icon={<Icon>stars</Icon>}
            component={NavLink}
            to={RouterPaths.MY_FINDS_PAGE}
            isActive={(match, location) => location.pathname.startsWith(RouterPaths.MY_FINDS_PAGE)}
            activeClassName="bottom-nav__selected"
          />
          <BottomNavigationAction
            className="bottom-nav__action"
            label={intl.get('bottomNavBar.nearby')}
            icon={<Icon>place</Icon>}
            component={NavLink}
            to={RouterPaths.NEARBY_PAGE}
            isActive={(match, location) => location.pathname.startsWith(RouterPaths.NEARBY_PAGE)}
            activeClassName="bottom-nav__selected"
          />
          <BottomNavigationAction
            className="bottom-nav__action"
            label={intl.get('bottomNavBar.report')}
            icon={<Icon>control_point</Icon>}
            component={NavLink}
            to={RouterPaths.REPORT_PAGE}
            isActive={(match, location) => location.pathname.startsWith(RouterPaths.REPORT_PAGE)}
            activeClassName="bottom-nav__selected"
          />
          <BottomNavigationAction
            className="bottom-nav__action"
            label={intl.get('bottomNavBar.more')}
            icon={<Icon>menu</Icon>}
            component={NavLink}
            to={RouterPaths.MORE_PAGE}
            isActive={(match, location) => location.pathname.startsWith(RouterPaths.MORE_PAGE)}
            activeClassName="bottom-nav__selected"
          />
        </BottomNavigation>
      </div>
    );
  }
}

export default BottomNav;