import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import intl from 'react-intl-universal';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  Typography,
  Divider,
  Chip,
  Tooltip,
  Icon,
  Paper
} from '@material-ui/core';
import { isEqual, isEmpty, differenceWith } from 'lodash';
import { getMyFinds, getCertainFinds, continueFillingOut } from '../../actions/myFinds';
import { ReportStatuses, Colors, RouterPaths } from '../../helpers/enum/enums';
import { getIdfromUri, getIdsfromArrayUri } from '../../helpers/functions/functions';
import { enqueueSnackbar } from '../../actions/notifier';

class MyFindsPage extends Component {

  state = {
    selectedIndex: null
  }

  componentDidMount() {
    this.props.getMyFinds();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.reports.length > 0 &&
      (this.state.selectedIndex || this.state.selectedIndex === 0) &&
      !isEmpty(differenceWith(this.props.reports, prevProps.reports, isEqual))) {
      // Get current report
      const currentReport = createReportObject(this.props.reports[this.state.selectedIndex]);
      // Change redux state 
      this.props.continueFillingOut(currentReport);
      // And redirect
      this.props.history.push(RouterPaths.REPORT_PAGE, { isContinuing: true });
    }
  }

  render() {
    return (
      <div className="my-finds-page">
        <div className="my-finds-page__header-container">
          <Paper className="my-finds-page__header-container__paper">
            <Typography className="my-finds-page__header-container__header" variant="overline">
              {intl.get('myFindsPage.header')}
            </Typography>
          </Paper>
        </div>
        {
          this.props.reports.length > 0 ?
            this.props.reports.map((report, index) => {
              return (
                <Card className="my-finds-page__find" key={index} >
                  <CardActionArea className="my-finds-page__find__details" onClick={this.onReportPressed(index)}>
                    <CardContent className="my-finds-page__find__details__content">
                      <Typography gutterBottom variant="h5" component="h2" className="my-finds-page__find__details__card-header">
                        {intl.get('myFindsPage.container.report')} {intl.get('myFindsPage.container.time', { d: new Date(report.date) })}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {intl.get('myFindsPage.container.municipality')}: {report.municipality}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {intl.get('myFindsPage.container.finds', { number: report.finds.length })}
                      </Typography>
                    </CardContent>
                    <div className="my-finds-page__find__actions__status-container">
                      <Tooltip title="No Image" placement="top">
                        <Icon className="my-finds-page__find__actions__status-container__icon">{statusIconDeterminer(report.status.toLowerCase())}</Icon>
                      </Tooltip>
                      <div className="my-finds-page__find__actions__status-container__text">
                        <Chip
                          label={intl.get(`myFindsPage.statuses.${report.status.toLowerCase()}`).toUpperCase()}
                          className="my-finds-page__find__actions__status-container__text__chip"
                          style={statusColorDeterminer(report.status.toLowerCase())}
                        />
                      </div>
                    </div>
                  </CardActionArea>
                  <Divider />
                  <CardActions className="my-finds-page__find__actions">
                    <div className="my-finds-page__find__actions__more-container">
                      <Button size="small" color="primary" onClick={this.onReportPressed(index)}>
                        {intl.get('myFindsPage.more')}
                      </Button>
                      <Button size="small" color="primary">
                        {intl.get('myFindsPage.share')}
                      </Button>
                    </div>
                    {
                      report.status.toLowerCase() === ReportStatuses.DRAFT &&
                      <Button
                        size="small"
                        color="primary"
                        onClick={this.onContinuePressed(index, report)}
                        className="my-finds-page__find__actions__continue-container"
                      >
                        {intl.get('myFindsPage.continue')}
                      </Button>
                    }
                  </CardActions>
                </Card>
              );
            }) :
            <Paper className="my-finds-page__header-container__paper">
              <Typography className="my-finds-page__header-container__header" variant="overline">
                {intl.get('myFindsPage.noFindsError')}
              </Typography>
            </Paper>
        }
      </div>
    );
  }

  /**
   * Change current URI on report pressed
   */
  onReportPressed = (index) => () => {
    const findsIds = this.props.reports[index].finds;
    if (findsIds.length > 0) {
      const reportId = this.props.reports[index].id;
      const path = `${RouterPaths.MY_FINDS_REPORT_OVERVIEW_PAGE}?r=${getIdfromUri(REPORT_SEPRATOR, reportId)}&f=${getIdsfromArrayUri(FIND_SEPRATOR, findsIds)}`;
      // Redirect to overview pageq
      this.props.history.push(
        path,
        { index }
      );
    } else {
      // Show info notification
      this.props.enqueueSnackbar({
        message: intl.get('myFindsPage.noFindsInfo')
      });
    }
  };


  /**
   * Continues filling out the report
   */
  onContinuePressed = (selectedIndex) => () => {
    this.setState({ selectedIndex });
    const finds = this.props.reports[selectedIndex].finds;
    if (finds) {
      // Fetch finds information
      this.props.getCertainFinds(selectedIndex, finds);
    }
  }
}

/**
 * Returns the color of the given status
 * @param {status} current status of report 
 */
const statusColorDeterminer = (status) => {
  let style = {
    'backgroundColor': Colors.GREY
  };

  switch (status) {
    case ReportStatuses.DRAFT:
      style['backgroundColor'] = Colors.GREY;
      break;
    case ReportStatuses.AWAIT_REVIEW:
      style['backgroundColor'] = Colors.DARK_YELLOW;
      break;
    case ReportStatuses.IN_REVIEW:
      style['backgroundColor'] = Colors.DARK_LIME;
      break;
    case ReportStatuses.VALIDATED:
      style['backgroundColor'] = Colors.DARK_GREEN;
      break;
    case ReportStatuses.REJECTED:
      style['backgroundColor'] = Colors.DARK_RED;
      break;
    case ReportStatuses.PENDING_USER:
      style['backgroundColor'] = Colors.INDIGO;
      break;
    default:
      return style;
  }
  return style;
};

/**
 * Returns the icon of the given status
 * @param {status} current status of report 
 */
const statusIconDeterminer = (status) => {
  let icon = 'crop_original';
  switch (status) {
    case ReportStatuses.DRAFT:
      icon = 'description';
      break;
    case ReportStatuses.AWAIT_REVIEW:
      icon = 'timelapse';
      break;
    case ReportStatuses.IN_REVIEW:
      icon = 'access_time';
      break;
    case ReportStatuses.VALIDATED:
      icon = 'check_circle_outline';
      break;
    case ReportStatuses.REJECTED:
      icon = 'highlight_off';
      break;
    case ReportStatuses.PENDING_USER:
      icon = 'schedule';
      break;
    default:
      return icon;
  }
  return icon;
};

const REPORT_SEPRATOR = 'report';
const FIND_SEPRATOR = 'find';

const createReportObject = (report) => {
  const finds = [];
  for (let find of report.findsData) {
    finds.push({
      depth: find.depth,
      material: find.material,
      type: find.type,
      period: find.period,
      additionalMaterials: find.additionalMaterials,
      photos: find.photos,
      findSite: {
        coords: find.findSite.coords,
        photos: find.findSite.photos
      }
    });
  }

  return {
    reportId: getIdfromUri('report', report.id),
    status: report.status,
    currentStep: parseInt(report.currentStep),
    currentFindIndex: parseInt(report.currentFindIndex),
    date: report.date,
    municipality: report.municipality,
    finds
  };
};

const mapStateToProps = (state) => ({
  reports: state.myFinds.reports,
});

const mapDispatchToProps = (dispatch) => ({
  getMyFinds: () => dispatch(getMyFinds()),
  getCertainFinds: (index, finds) => dispatch(getCertainFinds(index, finds)),
  continueFillingOut: (report) => dispatch(continueFillingOut(report)),
  enqueueSnackbar: (notification) => dispatch(enqueueSnackbar(notification)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyFindsPage));