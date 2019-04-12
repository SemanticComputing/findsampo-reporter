import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, FormControlLabel, Switch, CircularProgress, Paper } from '@material-ui/core';
import Map from './map/Map';
import { getValidatedFinds } from '../actions/find';
import Table from './table/Table';

class NearbyPage extends Component {
  state = {
    showMap: true,
    finds: this.props.finds
  }

  componentDidMount() {
    this.props.getValidatedFinds();
  }

  onShowMapSwitchPressed = () => {
    this.setState((prevState) => ({ showMap: !prevState.showMap }));
  }

  render() {
    return (
      <div className="nearby">
        <div className="nearby__tool-bar">
          <Paper className="nearby__tool-bar__paper" elevation={1}>
            <Icon className="nearby__tool-bar__icon" >tune</Icon>
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
              this.state.showMap ? (
                <Map markerData={this.props.finds} />
              ) : (
                <Table tableData={convertToTableData(this.props.finds)} />
              )
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
  finds: state.finds.validatedFinds
});

const mapDispatchToProps = (dispatch) => ({
  getValidatedFinds: () => dispatch(getValidatedFinds())
});

export default connect(mapStateToProps, mapDispatchToProps)(NearbyPage);