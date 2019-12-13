import React, { Component } from 'react';
import { connect } from 'react-redux';
import Map from '../map/Map';
import Table from '../table/Table';
import Chart from '../Chart';
import FacetDrawer from '../FacetDrawer';
import findsSelector from '../../selectors/facet/facetResults';
import {
  CircularProgress,
  Paper,
  Icon,
  Tabs,
  Tab,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem
} from '@material-ui/core';
import intl from 'react-intl-universal';
import { getValidatedFinds } from '../../actions/find';
import { isDesktopScreen, isMobileScreen, convertToChartData } from '../../helpers/functions/functions';
import { MapMode } from '../../helpers/enum/enums';
import { createDonutOptions } from '../../helpers/data/chart';

class NearbyPage extends Component {
  state = {
    isFacetOpen: isDesktopScreen(window),
    showMap: true,
    selectedChartProperty: 'main_material', // Default chart is material
    mode: 0 // Default mode is clustered map
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

  onChartPropertyChangePressed = (event) => {
    this.setState({ selectedChartProperty: event.target.value });
  }

  renderSelectedMode = () => {
    // Modes are based on the order of the Tab elements
    if (this.state.mode == 0) {
      return <Map markerData={this.props.finds.results} mode={MapMode.CLUSTURED_MAP} />;
    } else if (this.state.mode == 1) {
      return <Map markerData={this.props.finds.results} mode={MapMode.HEATMAP} />;
    } else if (this.state.mode == 2) {
      return <Table tableData={this.props.finds.results} />;
    } else {
      return this.renderChart();
    }
  }

  renderChart = () => {
    const data = convertToChartData(this.props.finds.results, this.state.selectedChartProperty);
    return (
      <div className="nearby__map__container__chart-container">
        <Paper className="nearby__map__container__chart-container__paper">
          <FormControl className="nearby__map__container__chart-container__paper__form-control" variant="outlined">
            <InputLabel htmlFor="outlined-property-simple">
              {intl.get('nearByPage.statistics.chart.selectProperty')}
            </InputLabel>
            <Select
              onChange={this.onChartPropertyChangePressed}
              value={this.state.selectedChartProperty}
              input={<OutlinedInput name="property" id="outlined-property-simple" labelWidth={120} />}
            >
              <MenuItem value="main_material">{intl.get('nearByPage.statistics.chart.material')}</MenuItem>
              <MenuItem value="type">{intl.get('nearByPage.statistics.chart.type')}</MenuItem>
              <MenuItem value="period">{intl.get('nearByPage.statistics.chart.period')}</MenuItem>
            </Select>
          </FormControl>
        </Paper>
        <Chart options={createDonutOptions(data.labels, data.series)} />
      </div>
    );
  }

  render() {
    return (
      <div className="nearby">
        <div className="nearby__tool-bar">
          <Paper className="nearby__tool-bar__paper" elevation={1}>
            <IconButton color="primary" onClick={this.onToggleDrawerPressed} component="span">
              <Icon className="nearby__tool-bar__icon" >tune</Icon>
            </IconButton>
            <Tabs
              value={this.state.mode}
              onChange={this.onChangeModePressed}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              className="nearby__tool-bar__paper__tabs"
            >
              <Tab icon={<Icon>map</Icon>} label={intl.get('nearByPage.tabs.map')} className="nearby__tool-bar__paper__tabs__tab" />
              <Tab icon={<Icon>wb_sunny</Icon>} label={intl.get('nearByPage.tabs.heatmap')} className="nearby__tool-bar__paper__tabs__tab" />
              <Tab icon={<Icon>table_chart</Icon>} label={intl.get('nearByPage.tabs.table')} className="nearby__tool-bar__paper__tabs__tab" />
              <Tab icon={<Icon>pie_chart</Icon>} label={intl.get('nearByPage.tabs.statistics')} className="nearby__tool-bar__paper__tabs__tab" />
            </Tabs>
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

const mapStateToProps = (state) => ({
  finds: findsSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  getValidatedFinds: () => dispatch(getValidatedFinds())
});

export default connect(mapStateToProps, mapDispatchToProps)(NearbyPage);