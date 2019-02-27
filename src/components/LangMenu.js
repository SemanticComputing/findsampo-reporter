import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Fab from '@material-ui/core/Fab';


const langs = [
  'FI',
  'SV',
  'EN'
];

class LangMenu extends Component {
  render() {
    return (
      <div>
        <List className='list'>
          <ListItem
            aria-haspopup='true'
            aria-controls='lang-button'
          >
            <Fab variant='round'  size='small'>
              {langs[0]}
            </Fab>
          </ListItem>
        </List>
        <Menu
          id="lang-button"
          open={false}
        >
          {langs.map((option, index) => (
            <MenuItem
              key={option}
              disabled={index === 0}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}


export default LangMenu;