import React, { Component } from 'react';
import { connect } from 'react-redux';
import Overview from '../reporting/Overview';
import { getCertainFinds } from '../../actions/myFinds';

class MyFindsReportOverviewPage extends Component {

  componentDidMount() {
    if (this.props.reports.length > 0) {
      const reportIndex = this.props.history.location.state.index;
      const unorganisedFinds = this.props.reports[reportIndex].finds;
      let finds = [];
      if (unorganisedFinds.length <= 1) {
        finds = unorganisedFinds;
      } else {
        finds = unorganisedFinds.split(';');
      }
      // Fetch finds information
      this.props.getCertainFinds(reportIndex, finds);
    }
  }

  render() {
    return (
      <div className="myFindsReportOverviewPage">
        {
          this.props.reportFinds &&
          <Overview isOverview={true} findNotificationData={this.props.reportFinds} />
        }
      </div>
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    reportFinds: state.myFinds.reports[ownProps.history.location.state.index].findsData,
    reports: state.myFinds.reports
  };
};



const mapDispatchToProps = (dispatch) => ({
  getCertainFinds: (index, finds) => dispatch(getCertainFinds(index, finds))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyFindsReportOverviewPage);