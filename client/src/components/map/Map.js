import React, { Component } from 'react';
import { connect } from 'react-redux';
import L from 'leaflet';
import 'leaflet.markercluster/dist/leaflet.markercluster.js';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import CircularProgress from '@material-ui/core/CircularProgress';
import { setCoordinates } from '../../actions/findNotification';

/**
 * Parameters
 * showCurrentLocation: If true user's current location is shown on the map
 * markerData: Marker points which will be shown on the map
 * location: The location where map component adds a marker
 */
class Map extends Component {
  state = {
    hasCurrentLocation: false,
  }

  componentDidMount() {
    if (this.props.showCurrentLocation) {
      this.getGeoLocation();
    } else {
      this.renderMap();
    }
  }

  render() {
    {
      return (
        (this.props.showCurrentLocation && this.state.hasCurrentLocation) ||
          this.props.markerData ||
          this.props.location ? (
            <div id="map">
            </div>
          ) : (
            <CircularProgress className="answer-options__progress" size="5rem" />
          )
      );
    }
  }

  /**
   * Initialise map and its settings
   */
  renderMap = (position) => {
    this.initialiseIcon();
    this.initialiseMap();
    this.initialiseMarkers(position);
  }

  /**
   * Initialise icon settings for leaflet
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
    // Listener is setted only if user's current location is viewed
    if (this.props.showCurrentLocation && this.state.hasCurrentLocation) {
      this.map.addEventListener('click', this.onMapTapped);
    }
  }

  initialiseMarkers = (position) => {
    // If markerData is provided show them
    if (this.props.markerData && this.props.markerData.length > 0) {
      this.showMarkersOnMap(this.props.markerData);
    }
    // If current location is provided show it
    if (position) {
      this.setLocation(position.coords.latitude, position.coords.longitude);
    }
    // If a location is given
    if (this.props.location) {
      this.setLocation(this.props.location.lat, this.props.location.lng);
    }
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
      // TODO Add error handler
      console.log('Getting current location is failed');
    });
  }

  /**
   * Clears current markers on the map and sets users current location
   */
  onMapTapped = (e) => {
    this.clearAllMarkers();
    this.setLocation(e.latlng.lat, e.latlng.lng);
  }

  /**
   * Sets a location on the map
   */
  setLocation = (lat, lng) => {
    L.marker(new L.LatLng(lat, lng)).addTo(this.layerGroup);
    this.props.setCoordinates({ lat, lng });
  }

  /**
   * Clears all markers on the map
   */
  clearAllMarkers = () => {
    this.layerGroup.clearLayers();
  }

  showMarkersOnMap = (markerData) => {
    const markers = L.markerClusterGroup();
    for (let marker of markerData) {
      if (marker.lat && marker.long && !isNaN(marker.lat.value) && !isNaN(marker.long.value)) {
        const popupText = this.generateMarkerPopup(marker);
        const markerToMap = new L.marker(new L.LatLng(marker.lat.value, marker.long.value))
          .bindPopup(popupText);
        markers.addLayer(markerToMap);
      }
    }
    this.map.addLayer(markers);
  }

  generateMarkerPopup = (marker) => {
    let popupText = '';
    const image = marker.image_url ? `<img class="leaflet-popup-content__image" src=${marker.image_url.value} />` : '';
    const title = marker.title ? `<h2 class="leaflet-popup-content__text-container__title">${marker.title.value}</h2>` : '';
    const description = marker.description ? `<p class="leaflet-popup-content__text-container__description">${marker.description.value}</p>` : '';

    popupText += `${image}
                  <div class="leaflet-popup-content__text-container">
                  ${title} 
                  ${description}
                  </div>
                  `;

    return popupText;
  }


}

const mapDispatchToProps = (dispatch) => ({
  setCoordinates: (coords) => dispatch(setCoordinates(coords)),
});

export default connect(undefined, mapDispatchToProps)(Map);