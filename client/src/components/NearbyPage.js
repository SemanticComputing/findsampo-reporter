import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CircularProgress, Paper, Icon, Tabs, Tab, IconButton } from '@material-ui/core';
import Map from './map/Map';
import Table from './table/Table';
import FacetDrawer from './FacetDrawer';
import findsSelector from '../selectors/facet/facetResults';
import { getValidatedFinds } from '../actions/find';
import { isDesktopScreen, isMobileScreen } from '../helpers/functions/functions';
import { MapMode } from '../helpers/enum/enums';

class NearbyPage extends Component {
  state = {
    isFacetOpen: false,
    showMap: true,
    mode: 0 // Default mode is clustered map mode
  }

  componentDidMount() {
    this.props.getValidatedFinds();
  }

  onShowMapSwitchPressed = () => {
    this.setState((prevState) => ({ showMap: !prevState.showMap }));
  }

  onToggleDrawerPressed = () => {
    this.setState((prevState) => ({ isFacetOpen: !prevState.isFacetOpen }));
    this.sendMapResizedEvent();
  };

  sendMapResizedEvent = () => {
    const event = new CustomEvent('map-resized');
    window.dispatchEvent(event);
  }

  onChangeModePressed = (event, mode) => {
    this.setState({ mode });
  }

  renderSelectedMode = () => {
    if (this.state.mode == 0) {
      return <Map markerData={this.props.finds.results} mode={MapMode.CLUSTURED_MAP} />;
    } else if (this.state.mode == 1) {
      return <Map markerData={this.props.finds.results} mode={MapMode.HEATMAP} />;
    } else {
      return <Table tableData={convertToTableData(this.props.finds.results)} />;
    }
  }

  render() {
    return (
      <div className="nearby">
        <div className="nearby__tool-bar">
          <Paper className="nearby__tool-bar__paper" elevation={1}>
            <IconButton color="primary" onClick={this.onToggleDrawerPressed} component="span">
              <Icon className="nearby__tool-bar__icon" >tune</Icon>
            </IconButton>
            <div>
              <Tabs
                value={this.state.mode}
                onChange={this.onChangeModePressed}
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab icon={<Icon>map</Icon>} label="MAP" className="nearby__tool-bar__paper__tabs__tab" />
                <Tab icon={<Icon>wb_sunny</Icon>} label="HEATMAP" className="nearby__tool-bar__paper__tabs__tab" />
                <Tab icon={<Icon>table_chart</Icon>} label="TABLE" className="nearby__tool-bar__paper__tabs__tab" />
              </Tabs>
            </div>
          </Paper>
        </div>
        <div className="nearby__map">
          {
            this.props.finds.results ? (
              <div className="nearby__map__container">
                <FacetDrawer toggleHandler={this.onToggleDrawerPressed} open={this.state.isFacetOpen} />
                <div
                  className={this.state.isFacetOpen && isDesktopScreen(window) ?
                    'nearby__map__container__find-content--shifted' :
                    isMobileScreen(window) ? 'nearby__map__container__find-content--mobile' : 'nearby__map__container__find-content'
                  }
                >
                  {this.renderSelectedMode()}
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
        title: d.title,
        material: d.main_material ? d.main_material : '-',
        type: d.type ? d.type : '-',
        period: d.period ? d.period : '-',
        municipality: d.municipality ? d.municipality : '-',
        description: d.description ? d.description : 'Not additional information found!', // FIXME
        image: d.image_url ? d.image_url : '',
        specification: d.specification ? d.specification : 'Not Provided',
        province: d.province ? d.province : 'Not Provided'
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