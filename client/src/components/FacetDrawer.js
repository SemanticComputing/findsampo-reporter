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
  IconButton,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from '@material-ui/core';
import { setFacetFilter, removeFacetFilter, emptyFacetFilter } from '../actions/facetFilter';
import { FacetFilters } from '../helpers/enum/enums';
import findsSelector from '../selectors/facet/facetResults';
import { isDesktopScreen } from '../helpers/functions/functions';

class FacetDrawer extends Component {
  state = {
    open: this.props.open || false,
    searchText: '',
    facetCriteria: [
      { criteria: FacetFilters.TYPE, label: 'Type' },
      { criteria: FacetFilters.MATERIAL, label: 'Material' },
      { criteria: FacetFilters.PERIOD, label: 'Period' },
      { criteria: FacetFilters.MUNICIPALITY, label: 'Municipality' }
    ]
  };

  static getDerivedStateFromProps(props, state) {
    // Change values only if type is changed
    if (props.open !== state.open) {
      return {
        open: props.open
      };
    }
    return null;
  }

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

  getFacetResult = (filter) => {
    switch (filter) {
      case FacetFilters.MATERIAL:
        return this.props.finds.materials;
      case FacetFilters.TYPE:
        return this.props.finds.types;
      case FacetFilters.PERIOD:
        return this.props.finds.periods;
      case FacetFilters.MUNICIPALITY:
        return this.props.finds.municipalities;
    }
  }

  renderCheckboxList = (criteria) => {
    const items = this.getFacetResult(criteria);
    return (
      <List className="facet-drawer__container__paper__list">
        {items.map((label, index) => {
          return (
            <ListItem
              key={index}
              role={undefined}
              dense
              button
              className="facet-drawer__container__paper__list__list-item"
            >
              <Checkbox
                checked={this.props.filters.filter(f => f.criteria === criteria && f.label === label.value).length > 0}
                disabled={label.count <= 0}
                tabIndex={-1}
                disableRipple
                className="facet-drawer__container__paper__list__list-item__checkbox"
                color="primary"
                onClick={this.onCheckboxPressed(criteria, label.value)}
              />
              <ListItemText
                className={label.count <= 0 ?
                  'facet-drawer__container__paper__list__list-item__text disabled' :
                  'facet-drawer__container__paper__list__list-item__text'
                }
                primary={label.value}
              />
              <Avatar
                className={label.count <= 0 ?
                  'facet-drawer__container__paper__list__list-item__avatar disabled' :
                  'facet-drawer__container__paper__list__list-item__avatar'
                }
              >
                {label.count}
              </Avatar>
            </ListItem>
          );
        })}
      </List>
    );
  };

  renderFacetCriteria = () => {
    return (
      this.state.facetCriteria.map((f) =>
        <ExpansionPanel key={f.criteria} className="facet-drawer__container__paper facet-drawer__container__panel">
          <ExpansionPanelSummary expandIcon={<Icon>keyboard_arrow_down</Icon>}>
            <Typography className="overline">{f.label}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Paper className="facet-drawer__container__paper__list-paper" elevation={1}>
              {this.renderCheckboxList(f.criteria)}
            </Paper>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ));
  }

  render() {
    const sideList = (
      <div className="facet-drawer__container">
        <Paper className="facet-drawer__container__paper">
          <div className="facet-drawer__container__paper__search-label">
            <Typography variant="overline">
              Faceted Search
            </Typography>
            <IconButton onClick={this.props.toggleHandler}>
              <Icon>arrow_back_ios</Icon>
            </IconButton>
          </div>
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
          {
            this.props.finds.results &&
            <Typography
              className="facet-drawer__container__paper__search__result"
              color="textSecondary"
              gutterBottom
            >
              {this.props.finds.results.length} search results.
            </Typography>
          }
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
      <Drawer
        variant={isDesktopScreen(window) ? 'persistent' : 'temporary'}
        anchor="left"
        open={this.state.open}
        onClose={this.props.toggleHandler}
        className={this.state.open ? 'facet-drawer' : 'facet-drawer facet-drawer--no-facet'}
      >
        <div
          tabIndex={0}
          role="button"
        >
          {sideList}
        </div>
      </Drawer>
    );
  }
}

// Variables
const ENTER = 'Enter';
const CRITERIA_TITLE = 'title';

const mapStateToProps = (state) => ({
  filters: state.facetFilters,
  finds: findsSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  setFacetFilter: (filter) => dispatch(setFacetFilter(filter)),
  removeFacetFilter: (filter) => dispatch(removeFacetFilter(filter)),
  emptyFacetFilter: () => dispatch(emptyFacetFilter())
});

export default connect(mapStateToProps, mapDispatchToProps)(FacetDrawer);