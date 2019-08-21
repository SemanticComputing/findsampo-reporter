import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from 'react-apexcharts';
import {
  Drawer,
  Tabs,
  Tab
} from '@material-ui/core/';
import Map from './map/Map';
import Table from './table/Table';
import { ReportSteps, SmartHelpers } from '../helpers/enum/enums';
import { convertToTableData } from './../helpers/functions/functions';
import { setPropertySmartData } from '../actions/findNotification';

class SmartHelper extends Component {
  state = {
    currentTab: 0
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentStep !== prevProps.currentStep) {
      switch (this.props.currentStep) {
        case ReportSteps.MATERIAL:
          this.props.setPropertySmartData('main_material');
          break;
        case ReportSteps.TYPE:
          this.props.setPropertySmartData('type');
          break;
        case ReportSteps.PERIOD:
          this.props.setPropertySmartData('period');
          break;
      }
    }
  }

  render() {
    return (
      <div>
        <Drawer
          anchor="bottom"
          open={this.props.open}
          onClose={this.props.onClose}
          className="smart-helper"
        >
          {this.renderTabs()}
          {this.renderTabContents()}
        </Drawer>
      </div >
    );
  }

  renderTabs = () => {
    const firstTabText = this.props.activeSmartHelper === SmartHelpers.NEARBY_HELPER ? 'Table' : 'Special';
    const secondTabText = this.props.activeSmartHelper === SmartHelpers.NEARBY_HELPER ? 'Map' : 'Overall';
    return (
      <Tabs
        value={this.state.currentTab}
        onChange={this.onChangeTabPressed}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label={firstTabText} />
        <Tab label={secondTabText} />
      </Tabs>
    );
  };

  renderTabContents = () => {
    const { nearbyFinds, activeHelper } = this.props.smartHelperData;
    const currentActiveHelpData = this.props.smartHelperData[activeHelper];
    if (activeHelper) {
      if (activeHelper === SmartHelpers.NEARBY_HELPER) {
        switch (this.state.currentTab) {
          case 0:
            return <Table tableData={convertToTableData(nearbyFinds.data)} />;
          case 1:
            return <Map id="mapSmartHelper" markerData={nearbyFinds.data} />;
        }
      } else {
        const chartSettings = createChartData(currentActiveHelpData, this.state.currentTab);
        return <Chart
          options={chartSettings.options}
          series={chartSettings.series}
          type="pie"
          id={this.state.currentTab}
          className="smart-helper__chart"
          height="75%" />;
      }
    }
  };

  onChangeTabPressed = (event, currentTab) => {
    this.setState({ currentTab });
  };
}

const createChartData = (data, tabIndex) => {
  const type = tabIndex === 0 ? 'nearby' : 'overall';
  // Chart settings
  return {
    options: {
      labels: Object.keys(data[type]),
      legend: {
        position: 'bottom'
      }
    },
    series: Object.values(data[type]),
  };
};

const mapStateToProps = (state) => ({
  currentStep: state.findNotification.currentStep,
  smartHelperData: state.findNotification.smartHelper
});

const mapDispatchToProps = (dispatch) => ({
  setPropertySmartData: (property) => dispatch(setPropertySmartData(property))
});

export default connect(mapStateToProps, mapDispatchToProps)(SmartHelper);
