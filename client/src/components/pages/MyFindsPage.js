import React, { Component } from 'react';
import { connect } from 'react-redux';
import intl from 'react-intl-universal';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  //CardMedia,
  Button,
  Typography,
  Divider,
  Chip,
  Tooltip,
  Icon
} from '@material-ui/core';
import { getMyFinds } from '../../actions/myFinds';

class MyFindsPage extends Component {

  componentDidMount() {
    this.props.getMyFinds();
  }

  render() {
    return (
      <div className="my-finds-page">
        <Typography className="my-finds-page__header" variant="overline">
          {intl.get('myFindsPage.header')}
        </Typography>
        <Card className="my-finds-page__find">
          <CardActionArea className="my-finds-page__find__details">
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {intl.get('myFindsPage.container.municipality')} {intl.get('myFindsPage.container.time')}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {intl.get('myFindsPage.container.material')}:
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {intl.get('myFindsPage.container.type')}:
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {intl.get('myFindsPage.container.period')}:
              </Typography>
            </CardContent>

            <Tooltip title="No Image" placement="top">
              <Icon>crop_original</Icon>
            </Tooltip>

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
            <div className="my-finds-page__find__actions__status-container">
              <Typography variant="overline">
                {intl.get('myFindsPage.status')}:
              </Typography>
              <Chip label="DRAFT" />
            </div>
          </CardActions>
        </Card>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getMyFinds: () => dispatch(getMyFinds())
});

export default connect(undefined, mapDispatchToProps)(MyFindsPage);