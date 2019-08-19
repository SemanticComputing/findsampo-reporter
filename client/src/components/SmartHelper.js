import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Drawer,
  Tabs,
  Tab
} from '@material-ui/core/';
import Map from './map/Map';
import Table from './table/Table';
import { ReportSteps, SmartHelpers } from '../helpers/enum/enums';
import { convertToTableData } from './../helpers/functions/functions';
import { setMaterialSmartData, setTypeSmartData, setPeriodSmartData } from '../actions/findNotification';

class SmartHelper extends Component {
  state = {
    currentTab: 0
  }

  componentDidUpdate() {
    switch (this.props.currentStep) {
      case ReportSteps.MATERIAL:
        this.props.setMaterialSmartData();
        break;
      case ReportSteps.TYPE:
        this.props.setTypeSmartData();
        break;
      case ReportSteps.PERIOD:
        this.props.setPeriodSmartData();
        break;
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
    if (this.props.activeSmartHelper === SmartHelpers.NEARBY_HELPER) {
      switch (this.state.currentTab) {
        case 0:
          return <Table tableData={convertToTableData(this.props.nearbySmartHelpData)} />;
        case 1:
          return <Map
            id="mapSmartHelper"
            markerData={this.props.nearbySmartHelpData} />;
      }
    } else {
      switch (this.state.currentTab) {
        case 0:
          break;
        case 1:
          break;
      }
    }
  };

  onChangeTabPressed = (event, currentTab) => {
    this.setState({ currentTab });
  };
}

const mapStateToProps = (state) => ({
  currentStep: state.findNotification.currentStep,
  activeSmartHelper: state.findNotification.smartHelper.activeHelper,
  nearbySmartHelpData: state.findNotification.smartHelper.nearbyFinds.data
});

const mapDispatchToProps = (dispatch) => ({
  setMaterialSmartData: () => dispatch(setMaterialSmartData()),
  setTypeSmartData: () => dispatch(setTypeSmartData()),
  setPeriodSmartData: () => dispatch(setPeriodSmartData())
});

export default connect(mapStateToProps, mapDispatchToProps)(SmartHelper);
