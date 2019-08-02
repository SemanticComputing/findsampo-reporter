import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import { getMyFinds } from '../../actions/myFinds';
import { ReportStatuses, Colors } from '../../helpers/enum/enums';


class MyFindsPage extends Component {

  componentDidMount() {
    this.props.getMyFinds();
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
                <Card className="my-finds-page__find" key={index}>
                  <CardActionArea className="my-finds-page__find__details">
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
                    <div>
                      <Button size="small" color="primary">
                        {intl.get('myFindsPage.more')}
                      </Button>
                      <Button size="small" color="primary">
                        {intl.get('myFindsPage.share')}
                      </Button>
                    </div>
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

const mapStateToProps = (state) => ({
  reports: state.myFinds.reports,
});

const mapDispatchToProps = (dispatch) => ({
  getMyFinds: () => dispatch(getMyFinds())
});

export default connect(mapStateToProps, mapDispatchToProps)(MyFindsPage);