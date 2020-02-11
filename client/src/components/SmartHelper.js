import React, { Component } from 'react';
import { connect } from 'react-redux';
import intl from 'react-intl-universal';
import {
  Drawer,
  Tabs,
  Tab
} from '@material-ui/core/';
import Map from './map/Map';
import Table from './table/Table';
import Chart from './Chart';
import { createPieChartOptions, createDonutOptions } from '../utils/data/chart';
import { ReportSteps, SmartHelpers, SmartHelperMode } from '../utils/enum/enums';
import { convertToTableData } from '../utils/functions/functions';
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
          {this.props.smartHelperData && this.renderTabs()}
          {this.props.smartHelperData && this.renderTabContents()}
        </Drawer>
      </div >
    );
  }

  renderTabs = () => {
    const { activeHelper } = this.props.smartHelperData;
    const firstTabText = activeHelper === SmartHelpers.NEARBY_HELPER ?
      intl.get('smartHelper.table') : intl.get('smartHelper.nearbySpecific');
    const secondTabText = activeHelper === SmartHelpers.NEARBY_HELPER ?
      intl.get('smartHelper.map') : intl.get('smartHelper.overall');

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
            return <Map id="mapSmartHelper" markerData={nearbyFinds.data} setViewForMarkerData />;
        }
      } else {
        const options = createChartData(currentActiveHelpData, this.state.currentTab);
        return <Chart options={options} />;
      }
    }
  };

  onChangeTabPressed = (event, currentTab) => {
    this.setState({ currentTab });
  };
}

const createChartData = (data, tabIndex) => {
  const type = tabIndex === 0 ? SmartHelperMode.NEARBY : SmartHelperMode.OVERALL;
  const labels = Object.keys(data[type]);
  const series = Object.values(data[type]);

  if (type === SmartHelperMode.NEARBY) {
    return createPieChartOptions(labels, series);
  } else if (type === SmartHelperMode.OVERALL) {
    return createDonutOptions(labels, series);
  }
};

const mapStateToProps = (state) => ({
  currentStep: state.findNotification.currentStep,
  smartHelperData: state.findNotification.smartHelper
});

const mapDispatchToProps = (dispatch) => ({
  setPropertySmartData: (property) => dispatch(setPropertySmartData(property))
});

export default connect(mapStateToProps, mapDispatchToProps)(SmartHelper);
