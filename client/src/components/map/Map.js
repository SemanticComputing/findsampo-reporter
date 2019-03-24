import React, { Component } from 'react';
import { connect } from 'react-redux';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import { setCoordinates } from '../../actions/findNotification';

class Map extends Component {
  componentDidMount() {
    this.getGeoLocation();
  }

  state = {
    hasCurrentLocation: false,
    snackbarOpen: false
  }

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ snackbarOpen: false });
  };

  render() {
    {
      return (
        this.state.hasCurrentLocation ? (
          <div id="map">
            <div>
              <Snackbar
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                open={this.state.open}
                autoHideDuration={6000}
                onClose={this.handleClose}
                ContentProps={{
                  'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">Note archived</span>}
                action={[
                  <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
                    UNDO
                  </Button>,
                  <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={this.handleClose}
                  >
                  </IconButton>,
                ]}
              />
            </div>
          </div>
        ) : (
          <CircularProgress />
        )
      );
    }
  }

  /**
   * Initialise icon setting for leaflet
  */
  initialiseIcon = () => {
    let DefaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow,
      iconAnchor: [12, 36]
    });
    L.Marker.prototype.options.icon = DefaultIcon;
  }

  /**
   * Initialise map settings for leaflet
   */
  initialiseMap = () => {
    this.map = L.map('map', {
      center: [62.24147, 25.72088],
      zoom: 5,
      zoomControl: false,
      zoominfoControl: true,
      fullscreenControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // Create a layergroup for adding markers
    this.layerGroup = L.layerGroup().addTo(this.map);

    // Add a listener for click events
    // Use location is changed when user clicks or taps a place
    this.map.addEventListener('click', this.onMapTapped);
  }

  /**
   * Gets users current location and renders the map
   */
  getGeoLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({ hasCurrentLocation: true });
      this.renderMap(position);
      // On fail
    }, () => {
      // this.renderMap();
      // TODO Add error handler
      console.log('Getting current location is failed');
    });
  }

  /**
   * Initialise map and its settings
   */
  renderMap = (position) => {
    this.initialiseIcon();
    this.initialiseMap();
    if (position) {
      this.setCurrentLocation(position.coords.latitude, position.coords.longitude);
    }
  }

  /**
   * Clears current markers on the map and sets users current location
   */
  onMapTapped = (e) => {
    this.clearAllMarkers();
    this.setCurrentLocation(e.latlng.lat, e.latlng.lng);
  }

  /**
   * Sets current user location on the map
   */
  setCurrentLocation = (lat, lng) => {
    L.marker([lat, lng]).addTo(this.layerGroup);
    this.props.setCoordinates({ lat, lng });
  }

  /**
   * Clears all markers on the map
   */
  clearAllMarkers = () => {
    this.layerGroup.clearLayers();
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCoordinates: (coords) => dispatch(setCoordinates(coords)),
});

export default connect(undefined, mapDispatchToProps)(Map);