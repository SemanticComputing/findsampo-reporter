import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormControlLabel, Switch, CircularProgress, Paper, Icon } from '@material-ui/core';
import Map from './map/Map';
import Table from './table/Table';
import FacetDrawer from './FacetDrawer';
import findsSelector from '../selectors/facet/facetFinds';
import { getValidatedFinds } from '../actions/find';
import { isDesktopScreen, isMobileScreen } from '../helpers/functions/functions';

class NearbyPage extends Component {
  state = {
    isFacetOpen: false,
    showMap: true,
  }

  componentDidMount() {
    this.props.getValidatedFinds();
  }

  onShowMapSwitchPressed = () => {
    this.setState((prevState) => ({ showMap: !prevState.showMap }));
  }

  onToggleDrawerPressed = () => {
    this.setState((prevState) => ({ isFacetOpen: !prevState.isFacetOpen }));
  };

  render() {
    return (
      <div className="nearby">
        <div className="nearby__tool-bar">
          <Paper className="nearby__tool-bar__paper" elevation={1}>
            <Icon className="nearby__tool-bar__icon" onClick={this.onToggleDrawerPressed}>tune</Icon>
            <FormControlLabel
              className="nearby__tool-bar__form-control-label"
              labelPlacement="start"
              onClick={this.onShowMapSwitchPressed}
              control={
                <Switch
                  checked={this.state.showMap}
                  color="primary"
                />
              }
              label="Show Map"
            />
          </Paper>
        </div>
        <div className="nearby__map">
          {
            this.props.finds ? (
              <div className="nearby__map__container">
                <FacetDrawer toggleHandler={this.onToggleDrawerPressed} open={this.state.isFacetOpen} />
                <div
                  className={this.state.isFacetOpen && isDesktopScreen(window) ?
                    'nearby__map__container__find-content--shifted' :
                    isMobileScreen(window) ? 'nearby__map__container__find-content--mobile' : 'nearby__map__container__find-content'
                  }
                >
                  {this.state.showMap ? (
                    <Map markerData={this.props.finds} />
                  ) : (
                    <Table tableData={convertToTableData(this.props.finds)} />
                  )}
                </div>
              </div>
            ) : (
              <CircularProgress className="nearby__map__progress" size="5rem" />
            )
          }
        </div>
      </div>
    );
  }
}

const convertToTableData = (data) => {
  const tableData = [];
  for (let d of data) {
    tableData.push(
      {
        title: d.title.value,
        material: d.main_material ? d.main_material.value : '-',
        type: d.type ? d.type.value : '-',
        period: d.period ? d.period.value : '-',
        municipality: d.municipality ? d.municipality.value : '-',
        description: d.description ? d.description.value : 'Not additional information found!', // FIXME
        image: d.image_url ? d.image_url.value : '',
        specification: d.specification ? d.specification.value : 'Not Provided',
        province: d.province ? d.province.value : 'Not Provided'
      }
    );
  }
  return tableData;
};

const mapStateToProps = (state) => ({
  finds: findsSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  getValidatedFinds: () => dispatch(getValidatedFinds())
});

export default connect(mapStateToProps, mapDispatchToProps)(NearbyPage);