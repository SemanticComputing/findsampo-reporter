import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Overview from '../reporting/Overview';
import { getMyFinds, getCertainFinds } from '../../actions/myFinds';
import { isEqual, isEmpty, differenceWith } from 'lodash';
import { getIdfromUri } from '../../utils/functions/functions';

class MyFindsReportOverviewPage extends Component {
  state = {
    reportIndex: undefined
  }

  componentDidMount() {
    // If there is already report data fetch its finds otherwise fetch all reports
    if (this.props.reports.length > 0) {
      this.fetchfindsData();
    } else {
      this.props.getMyFinds();
    }
  }

  componentDidUpdate(prevProps) {
    // Fetch finds data when the reports are empty
    if (!isEmpty(differenceWith(this.props.reports, prevProps.reports, isEqual))) {
      this.fetchfindsData();
    }
  }

  render() {
    return (
      <div className="myFindsReportOverviewPage">
        {
          this.state.reportIndex !== undefined &&
          this.state.reportIndex >= 0 &&
          <Overview isOverview={true} findNotificationData={this.props.reports[this.state.reportIndex].findsData} />
        }
      </div>
    );
  }

  /**
   * Fetch find data of the selected report
   */
  fetchfindsData = () => {
    const selectedReportId = this.props.history.location.search.match(new RegExp('r=' + '(.*)' + '&f='))[1];
    const reportIndex = this.props.reports.findIndex((r) => getIdfromUri('report', r.id) === selectedReportId);
    this.setState({ reportIndex });
    const finds = this.props.reports[reportIndex].finds;
    // Fetch finds information
    this.props.getCertainFinds(reportIndex, finds);
  }
}

const mapStateToProps = (state) => ({
  reports: state.myFinds.reports
});

const mapDispatchToProps = (dispatch) => ({
  getMyFinds: () => dispatch(getMyFinds()),
  getCertainFinds: (index, finds) => dispatch(getCertainFinds(index, finds))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyFindsReportOverviewPage));