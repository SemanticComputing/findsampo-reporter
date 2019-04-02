import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import intl from 'react-intl-universal';
import { isMobileScreen } from '../helpers/functions/functions';
import { RouterPaths } from '../helpers/enum/enums';

class BottomNav extends Component {
  state = {
    value: 0,
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

  onActionPressed = (event, value) => {
    console.log(value);
    this.setState({ value });
  }

  render() {
    return (
      isMobileScreen(window) && <div className="bottom-nav">
        <BottomNavigation
          value={this.state.value}
          onChange={this.onActionPressed}
          showLabels
        >
          <BottomNavigationAction
            className="bottom-nav__action"
            label={intl.get('bottomNavBar.home')}
            icon={<Icon>home</Icon>}
            component={Link}
            to={RouterPaths.HOME_PAGE} />
          <BottomNavigationAction
            className="bottom-nav__action"
            label={intl.get('bottomNavBar.mine')}
            icon={<Icon>stars</Icon>} />
          <BottomNavigationAction
            className="bottom-nav__action"
            label={intl.get('bottomNavBar.nearby')}
            icon={<Icon>place</Icon>} />
          <BottomNavigationAction
            className="bottom-nav__action"
            label={intl.get('bottomNavBar.report')}
            icon={<Icon>control_point</Icon>}
            component={Link}
            to={RouterPaths.REPORT_PAGE}
          />
          <BottomNavigationAction
            className="bottom-nav__action"
            label={intl.get('bottomNavBar.more')}
            icon={<Icon>menu</Icon>} />
        </BottomNavigation>
      </div>
    );
  }
}

export default BottomNav;