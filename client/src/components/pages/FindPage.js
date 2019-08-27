import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import { getValidatedFind } from '../../actions/find';
import { RouterPaths } from '../../helpers/enum/enums';
import { isDesktopScreen } from '../../helpers/functions/functions';
import {
  Paper,
  Typography,
  Link
} from '@material-ui/core';
import Map from '../map/Map';


class FindPage extends Component {
  componentDidMount() {
    const id = this.props.history.location.search.split('id=')[1];
    if (id) {
      this.props.getValidatedFind(id);
    } else {
      // TODO: Show a notification when id is missing
      this.props.history.push(RouterPaths.HOME_PAGE);
    }
  }
  render() {
    return (
      this.props.find && <div className="find-page">
        <Paper className="find-page__header-container">
          <Typography className="find-page__header-container__text" variant="overline">
            {this.props.find.title}
          </Typography>
          <Typography className="find-page__header-container__id-text" variant="caption" display="block" gutterBottom>
            {`ID: ${this.props.find.id.split('sualt-fha-finds/')[1]}`}
          </Typography>
        </Paper>
        {
          this.props.find.image_url &&
          <ImageGallery
            items={renderGalleryImages(this.props.find.image_url)}
            useBrowserFullscreen={false}
            thumbnailPosition={isDesktopScreen(window) ? 'left' : 'bottom'}
            showPlayButton={false}
            infinite={false}
            showIndex />
        }
        <div className="find-page__main-container">
          <div className="find-page__property-container">
            <Paper className="find-page__property-container__properties find-page__card">
              <div className="find-page__property-container__properties__property">
                <Typography variant="overline" gutterBottom>
                  Material
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {this.props.find.main_material}
                </Typography>
              </div>
              <div className="find-page__property-container__properties__property">
                <Typography variant="overline" gutterBottom>
                  Type
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {this.props.find.type}
                </Typography>
              </div>
              <div className="find-page__property-container__properties__property">
                <Typography variant="overline" gutterBottom>
                  Municipality
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {this.props.find.municipality}
                </Typography>
              </div>
              <div className="find-page__property-container__properties__property">
                <Typography variant="overline" gutterBottom>
                  Specification
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {this.props.find.specification}
                </Typography>
              </div>
              <div className="find-page__property-container__properties__property">
                <Typography variant="overline" gutterBottom>
                  Period
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {this.props.find.period}
                </Typography>
              </div>
              <div className="find-page__property-container__properties__property">
                <Typography variant="overline" gutterBottom>
                  Historical Site
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  <Link href={this.props.find.archaeological_site_url} target="_blank" rel="noreferrer">
                    Link
                  </Link>
                </Typography>
              </div>
            </Paper>
            <Paper className="find-page__description find-page__card">
              <Typography variant="overline" gutterBottom>
                Description
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {this.props.find.description}
              </Typography>
            </Paper>
          </div>
          <Paper className="find-page__property-container__map find-page__card">
            <Map markerData={[this.props.find]} setViewForMarkerData zoomLevel={13} />
          </Paper>
        </div>
      </div>
    );
  }
}

const renderGalleryImages = (images) => {
  const imgs = [];
  images.split(';').map((img) => {
    imgs.push({
      original: img,
      thumbnail: img
    });
  });

  return imgs;
};

const mapStateToProps = (state) => ({
  find: state.finds.activeFind
});

const mapDispatchToProps = (dispatch) => ({
  getValidatedFind: (id) => dispatch(getValidatedFind(id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FindPage));