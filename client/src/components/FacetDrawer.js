import React, { Component } from 'react';
import {
  Drawer,
  Button,
  TextField,
  Icon,
  InputAdornment,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Badge
} from '@material-ui/core';


class FacetDrawer extends Component {
  state = {
    open: false,
  };

  toggleDrawer = (open) => () => {
    this.setState({ open });
  };

  render() {
    const sideList = (
      <div className="facet-drawer__container">
        <Paper className="facet-drawer__container__paper">
          <Typography variant="overline">
            Faceted Search
          </Typography>
        </Paper>
        <Paper className="facet-drawer__container__paper">
          <TextField
            className="facet-drawer__container__paper__search"
            margin="normal"
            variant="outlined"
            placeholder="Find name search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon>search</Icon>
                </InputAdornment>
              ),
            }}
          />
        </Paper>
        <Paper className="facet-drawer__container__paper">
          <Typography variant="overline">
            Find Type
            {renderCheckboxList()}
          </Typography>
        </Paper>
        <Paper className="facet-drawer__container__paper">
          <Typography variant="overline">
            Material
          </Typography>
          {renderCheckboxList()}
        </Paper>
        <Paper className="facet-drawer__container__paper">
          <Typography variant="overline">
            Period
          </Typography>
          {renderCheckboxList()}
        </Paper>
        <Paper className="facet-drawer__container__paper">
          <Typography variant="overline">
            Town
          </Typography>
          {renderCheckboxList()}
        </Paper>
      </div >
    );

    return (
      <div>
        <Drawer open={this.state.open} onClose={this.toggleDrawer(false)} className="facet-drawer">
          <div
            tabIndex={0}
            role="button"
          //onClick={this.toggleDrawer(false)}
          //onKeyDown={this.toggleDrawer(false)}
          >
            {sideList}
          </div>
        </Drawer>
        <Button onClick={this.toggleDrawer(true)}>Open Left</Button>
      </div>

    );
  }
}

const renderCheckboxList = () => {
  return (
    <List className="facet-drawer__container__paper__list">
      {[0, 1, 2, 3].map(value => (
        <ListItem
          key={value}
          role={undefined}
          dense
          button
          className="facet-drawer__container__paper__list__list-item"
        /*onClick={this.handleToggle(value)}*/
        >
          <Checkbox
            /*checked={this.state.checked.indexOf(value) !== -1}*/
            tabIndex={-1}
            disableRipple
            className="facet-drawer__container__paper__list__list-item__checkbox"
          />
          <ListItemText
            className="facet-drawer__container__paper__list__list-item__text"
            primary={`Line item ${value + 1}`}
          />
          <Badge color="secondary" badgeContent={4}>
          </Badge>
        </ListItem>
      ))}
    </List>
  );
};

export default FacetDrawer;