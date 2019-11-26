import React from 'react';
import { connect } from 'react-redux';
import {
  Paper,
  Typography,
  Divider,
  Icon
} from '@material-ui/core/';
import intl from 'react-intl-universal';
import Map from '../map/Map';
import ImageViewer from '../ImageViewer';

/**
 * findNotification: Find notification content
 */
const OverView = (props) => {
  const finds = props.findNotificationData ?
    props.findNotificationData :
    props.findNotification.finds;

  return (
    <div className="overview">
      <Paper className="overview__paper">
        <Typography className="overview__header" variant="overline">
          {intl.get('overview.title')}
        </Typography>
      </Paper>
      {
        finds.map((find, index) => {
          return (
            <Paper className="overview__find" elevation={3} key={index}>
              <Typography variant="overline">
                {intl.get('overview.find.subTitle')} {index + 1}
              </Typography>
              <Divider />
              <div className="overview__find__details-container">
                <Typography variant="caption" className="overview__properties">
                  {intl.get('overview.find.photos')}
                </Typography>
                <div>
                  {find.photos.length > 0 && renderPhotos(find.photos)}
                </div>
                {/* Find Site Details */}
                <div className="overview__find-site__map">
                  <Typography variant="caption" className="overview__properties">
                    {intl.get('overview.findSite.location')}
                  </Typography>
                  <Map location={find.findSite.coords} id={'map' + index} zoomLevel={DEFAULT_ZOOM_LEVEL} />
                </div>
                <div className="overview__find-site__photos">
                  <Typography variant="caption" className="overview__properties">
                    {intl.get('overview.findSite.photos')}
                  </Typography>
                  <div>
                    {find.findSite.photos.length > 0 && renderPhotos(find.findSite.photos)}
                  </div>
                </div>
                {/* Find properties */}
                <Typography variant="caption" className="overview__properties">
                  {intl.get('overview.find.depth')}
                  <Typography variant="caption" className="overview__properties--value">
                    <Icon>navigate_next</Icon>
                    {getProperty(find.depth)}
                  </Typography>
                </Typography>
                <Typography variant="caption" className="overview__properties">
                  {intl.get('overview.find.material')}
                  <Typography variant="caption" className="overview__properties--value">
                    <Icon>navigate_next</Icon>
                    {getProperty(find.material)}
                  </Typography>
                </Typography>
                <Typography variant="caption" className="overview__properties">
                  {intl.get('overview.find.type')}
                  <Typography variant="caption" className="overview__properties--value">
                    <Icon>navigate_next</Icon>
                    {getProperty(find.type)}
                  </Typography>
                </Typography>
                <Typography variant="caption" className="overview__properties">
                  {intl.get('overview.find.timing')}
                  <Typography variant="caption" className="overview__properties--value">
                    <Icon>navigate_next</Icon>
                    {getProperty(find.timing)}
                  </Typography>
                </Typography>
                <Typography variant="caption" className="overview__properties">
                  {intl.get('overview.findSite.additionalMaterials')}
                  <Typography variant="caption" className="overview__properties--value">
                    <Icon>navigate_next</Icon>
                    {getProperty(find.additionalMaterials)}
                  </Typography>
                </Typography>
              </div>
            </Paper>
          );
        }
        )}
    </div>
  );
};

/**
 * Used to render photos
 * 
 * @param {photos} photos 
 */
const renderPhotos = (photos) => {
  return photos.map((tile, index) => {
    return (
      <ImageViewer image={tile} key={index} />
    );
  });
};

const DEFAULT_ZOOM_LEVEL = 16;

const getProperty = (property) => {
  return property ? property : intl.get('overview.notProvidedValue');
};

const mapStateToProps = (state) => ({
  findNotification: state.findNotification
});

export default connect(mapStateToProps)(OverView);