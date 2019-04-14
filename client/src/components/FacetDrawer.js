import React, { Component } from 'react';
import { connect } from 'react-redux';
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
  Avatar,
  Chip,
  IconButton
} from '@material-ui/core';
import { setFacetFilter, removeFacetFilter, emptyFacetFilter } from '../actions/facetFilter';

class FacetDrawer extends Component {
  state = {
    open: false,
    searchText: '',
    facetCriteria: [
      { criteria: 'find-type', label: 'Find Type' },
      { criteria: 'material', label: 'Material' },
      { criteria: 'period', label: 'Period' },
      { criteria: 'town', label: 'Town' }
    ]
  };

  onToggleDrawerPressed = (open) => () => {
    this.setState({ open });
  };

  onDeleteFiltersPressed = () => {
    this.props.emptyFacetFilter();
  }

  onCheckboxPressed = (criteria, label) => event => {
    if (event.target.checked) {
      this.props.setFacetFilter({
        criteria,
        label
      });
    } else {
      this.props.removeFacetFilter({
        criteria,
        label
      });
    }
  }

  onChipDeletePressed = data => () => {
    this.props.removeFacetFilter({
      criteria: data.criteria,
      label: data.label
    });
  }

  onSearchTextChanged = (event) => {
    this.setState({ searchText: event.target.value });
  }

  onSearchTextDeleted = () => {
    this.props.removeFacetFilter({
      criteria: CRITERIA_TITLE,
      label: this.state.searchText
    });
    this.setState({ searchText: '' });
  }

  // Criteria is title on search
  onSeachPressed = () => {
    if (this.state.searchText.length > 0) {
      this.props.setFacetFilter({
        criteria: CRITERIA_TITLE,
        label: this.state.searchText
      });
    }
  }

  renderCheckboxList = (criteria) => {
    return (
      <List className="facet-drawer__container__paper__list">
        {[0, 1, 2, 3].map((label, index) => (
          <ListItem
            key={index}
            role={undefined}
            dense
            button
            className="facet-drawer__container__paper__list__list-item"
          /*onClick={this.handleToggle(value)}*/
          >
            <Checkbox
              checked={this.props.filters.filter(f => f.criteria === criteria && f.label === label).length > 0}
              tabIndex={-1}
              disableRipple
              className="facet-drawer__container__paper__list__list-item__checkbox"
              color="primary"
              onClick={this.onCheckboxPressed(criteria, label)}
            />
            <ListItemText
              className="facet-drawer__container__paper__list__list-item__text"
              primary={`Line item ${label + 1}`}
            />
            <Avatar className="facet-drawer__container__paper__list__list-item__avatar">
              4
            </Avatar>
          </ListItem>
        ))}
      </List>
    );
  };

  renderFacetCriteria = () => {
    return (
      this.state.facetCriteria.map((f) =>
        <Paper key={f.criteria} className="facet-drawer__container__paper">
          <Typography variant="overline">
            {f.label}
            {this.renderCheckboxList(f.criteria)}
          </Typography>
        </Paper>
      ));
  }

  render() {
    const sideList = (
      <div className="facet-drawer__container">
        <Paper className="facet-drawer__container__paper">
          <Typography variant="overline">
            Faceted Search
          </Typography>
          <TextField
            className="facet-drawer__container__paper__search"
            margin="normal"
            variant="outlined"
            placeholder="Find name search"
            value={this.state.searchText}
            onChange={this.onSearchTextChanged}
            onKeyPress={(e) => {
              if (e.key === ENTER) {
                this.onSeachPressed();
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton onClick={this.onSeachPressed} className="facet-drawer__container__paper__search__icon">
                    <Icon>search</Icon>
                  </IconButton>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={this.onSearchTextDeleted} className="facet-drawer__container__paper__search__icon">
                    <Icon>delete</Icon>
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Paper>
        {
          this.props.filters.length > 0 &&
          <Paper className="facet-drawer__container__paper facet-drawer__container__filter-box">
            <Typography variant="overline">
              Search criteria
            </Typography>
            <div className="facet-drawer__container__paper__filters">
              {this.props.filters.map((data, index) => {
                return (
                  <Chip
                    color="primary"
                    onDelete={this.onChipDeletePressed(data)}
                    key={index}
                    label={data.label}
                  />
                );
              })}
            </div>
            <Button
              variant="outlined"
              color="primary"
              onClick={this.onDeleteFiltersPressed}>
              Empty
            </Button>
          </Paper>
        }
        {this.renderFacetCriteria()}
      </div >
    );

    return (
      <div>
        <Drawer open={this.state.open} onClose={this.onToggleDrawerPressed(false)} className="facet-drawer">
          <div
            tabIndex={0}
            role="button"
          //onClick={this.toggleDrawer(false)}
          //onKeyDown={this.toggleDrawer(false)}
          >
            {sideList}
          </div>
        </Drawer>
        <Button onClick={this.onToggleDrawerPressed(true)}>Open Left</Button>
      </div>

    );
  }
}

// Variables
const ENTER = 'Enter';
const CRITERIA_TITLE = 'title';

const mapStateToProps = (state) => ({
  filters: state.facetFilters
});

const mapDispatchToProps = (dispatch) => ({
  setFacetFilter: (filter) => dispatch(setFacetFilter(filter)),
  removeFacetFilter: (filter) => dispatch(removeFacetFilter(filter)),
  emptyFacetFilter: () => dispatch(emptyFacetFilter())
});

export default connect(mapStateToProps, mapDispatchToProps)(FacetDrawer);