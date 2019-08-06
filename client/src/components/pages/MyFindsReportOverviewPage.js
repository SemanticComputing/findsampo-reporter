import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Overview from '../reporting/Overview';
import { getMyFinds, getCertainFinds } from '../../actions/myFinds';
import { isEqual, isEmpty, differenceWith } from 'lodash';

class MyFindsReportOverviewPage extends Component {

  componentDidMount() {
    // If there is already report data fetch its finds otherwise fetch all reports
    if (this.props.reports.length > 0) {
      this.fetchfindsData();
    } else {
      this.props.getMyFinds();
    }
  }

  componentDidUpdate(prevProps) {
    // Fetch finds data when they are not available
    if (!isEmpty(differenceWith(this.props.reports, prevProps.reports, isEqual))) {
      this.fetchfindsData();
    }
  }

  render() {
    return (
      <div className="myFindsReportOverviewPage">
        {
          this.props.reportFinds &&
          <Overview isOverview={true} findNotificationData={this.props.reportFinds.findsData} />
        }
      </div>
    );
  }

  /**
   * Fetch find data of the selected report
   */
  fetchfindsData = () => {
    const reportIndex = this.props.history.location.state.index;
    const finds = this.props.reports[reportIndex].finds;
    // Fetch finds information
    this.props.getCertainFinds(reportIndex, finds);
  }
}

const mapStateToProps = (state, ownProps) => ({
  reportFinds: state.myFinds.reports[ownProps.history.location.state.index],
  reports: state.myFinds.reports
});

const mapDispatchToProps = (dispatch) => ({
  getMyFinds: () => dispatch(getMyFinds()),
  getCertainFinds: (index, finds) => dispatch(getCertainFinds(index, finds))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyFindsReportOverviewPage));