import React, { Component } from 'react';
import { connect } from 'react-redux';
import intl from 'react-intl-universal';
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
import {
  setFacetFilter,
  removeFacetFilter,
  emptyFacetFilter,
  setFacetFilterPanel,
  removeFacetFilterPanel
} from '../actions/facetFilter';
import { FacetFilters } from '../helpers/enum/enums';
import findsSelector from '../selectors/facet/facetResults';
import { isDesktopScreen } from '../helpers/functions/functions';

class FacetDrawer extends Component {
  state = {
    open: this.props.open || false,
    searchText: '',
    facetCriteria: [
      { criteria: FacetFilters.TYPE, label: intl.get('facetDrawer.facetCriteria.type') },
      { criteria: FacetFilters.MATERIAL, label: intl.get('facetDrawer.facetCriteria.material') },
      { criteria: FacetFilters.PERIOD, label: intl.get('facetDrawer.facetCriteria.period') },
      { criteria: FacetFilters.MUNICIPALITY, label: intl.get('facetDrawer.facetCriteria.municipality') },
      { criteria: FacetFilters.PROVINCE, label: intl.get('facetDrawer.facetCriteria.province') }
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

  onExpansionPanelOpened = (label) => (event, expanded) => {
    if (expanded) {
      this.props.setFacetFilterPanel(label);
    } else {
      this.props.removeFacetFilterPanel(label);
    }
  }

  getNumOfSelectedFilters = (criteria) => {
    return this.props.filters.filter((f) => f.criteria === criteria).length;
  }

  renderFilterPanelContents = (criteria) => {
    const items = this.props.finds[criteria];
    return (
      <List className="facet-drawer__container__paper__list">
        {items && items.map((label, index) => {
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

  renderFacetPanels = () => {
    return (
      this.state.facetCriteria.map((f) =>
        <ExpansionPanel
          key={f.criteria}
          className="facet-drawer__container__paper facet-drawer__container__panel"
          onChange={this.onExpansionPanelOpened(f.criteria)}
        >
          <ExpansionPanelSummary expandIcon={<Icon>keyboard_arrow_down</Icon>}>
            <Typography className="overline">{f.label}</Typography>
            {
              this.getNumOfSelectedFilters(f.criteria) > 0 &&
              <Avatar className='facet-drawer__container__panel__avatar'>
                {this.getNumOfSelectedFilters(f.criteria)}
              </Avatar>
            }
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Paper className="facet-drawer__container__paper__list-paper" elevation={1}>
              {this.renderFilterPanelContents(f.criteria)}
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
              {intl.get('facetDrawer.facetedSearch')}
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
              {this.props.finds.results.length} {intl.get('facetDrawer.searchResults')}.
            </Typography>
          }
        </Paper>
        {
          this.props.filters.length > 0 &&
          <Paper className="facet-drawer__container__paper facet-drawer__container__filter-box">
            <Typography variant="overline">
              {intl.get('facetDrawer.searchCriteria')}
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
              {intl.get('facetDrawer.emptyBtn')}
            </Button>
          </Paper>
        }
        {this.renderFacetPanels()}
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

// Default Variables
const ENTER = 'Enter';
const CRITERIA_TITLE = 'title';

const mapStateToProps = (state) => ({
  filters: state.facetFilters.activeFilters,
  finds: findsSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  setFacetFilter: (filter) => dispatch(setFacetFilter(filter)),
  removeFacetFilter: (filter) => dispatch(removeFacetFilter(filter)),
  emptyFacetFilter: () => dispatch(emptyFacetFilter()),
  setFacetFilterPanel: (filterPanel) => dispatch(setFacetFilterPanel(filterPanel)),
  removeFacetFilterPanel: (filterPanel) => dispatch(removeFacetFilterPanel(filterPanel))
});

export default connect(mapStateToProps, mapDispatchToProps)(FacetDrawer);