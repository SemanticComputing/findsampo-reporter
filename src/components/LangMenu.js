import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Fab from '@material-ui/core/Fab';
import { connect } from 'react-redux';
import { setLocale } from '../actions/locale';

const langs = [
  'EN',
  'FI',
  'SV'
];

class LangMenu extends Component {
  state = {
    anchorEl: null,
    selectedIndex: 0,
  };

  onMenuItemPressed = (e, index) => {
    this.props.setLocale(langs[index].toLowerCase());
    this.setState(() => ({
      selectedIndex: index,
      anchorEl: null
    }));
    localStorage.setItem('locale', langs[index].toLowerCase());
  };

  onListItemPressed = (e) => {
    this.setState({ anchorEl: e.currentTarget });
  };

  onClosePressed = () => {
    this.setState(() => ({ anchorEl: null }));
  };

  render() {
    return (
      <div>
        <List className='list'>
          <ListItem
            aria-haspopup='true'
            aria-controls='lang-button'
            onClick={this.onListItemPressed}
          >
            <Fab variant='round' size='small'
              aria-haspopup='true'
              aria-controls='lang-button'
              onClick={this.onListItemPressed}>
              {localStorage.getItem('locale') || langs[this.state.selectedIndex]}
            </Fab>
          </ListItem>
        </List>
        <Menu
          id="lang-button"
          anchorEl={this.state.anchorEl}
          open={!!this.state.anchorEl}
          onClose={this.onClosePressed}
        >
          {langs.map((option, index) => (
            <MenuItem
              key={option}
              selected={index === this.state.selectedIndex}
              onClick={event => this.onMenuItemPressed(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setLocale: (locale) => dispatch(setLocale(locale))
});

export default connect(undefined, mapDispatchToProps)(LangMenu);