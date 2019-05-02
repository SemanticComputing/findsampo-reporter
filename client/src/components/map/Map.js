import React, { Component } from 'react';
import { connect } from 'react-redux';

import L from 'leaflet';
import 'leaflet.heat/dist/leaflet-heat.js';
import 'leaflet.markercluster/dist/leaflet.markercluster.js';
import 'leaflet.zoominfo/dist/L.Control.Zoominfo.js';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.min.js';

import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.zoominfo/dist/L.Control.Zoominfo.css';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import 'leaflet-fullscreen/dist/fullscreen.png';

import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import CircularProgress from '@material-ui/core/CircularProgress';
import { setCoordinates } from '../../actions/findNotification';
import { MapMode } from '../../helpers/enum/enums';

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
    // Event listener which listens for map resize changes.
    window.addEventListener('map-resized', this.onMapResized);
  }

  componentWillUnmount() {
    window.removeEventListener('map-resized', this.onMapResized);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.markerData !== this.props.markerData || this.props.mode) {
      this.clusterMap.clearLayers();
      this.heatMap.setLatLngs([]);
      this.showMarkersOnMap(this.props.markerData);
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

    const openStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });


    // Create a layergroup for adding markers
    this.layerGroup = L.layerGroup();

    // Base maps 
    const baseMaps = {
      'Open Street Map': openStreetMap
    };

    // Overlay Maps
    const overlayMaps = {
      'Archaeological Finds': this.layerGroup
    };

    this.map = L.map('map', {
      center: [62.24147, 25.72088],
      zoom: 5,
      zoomControl: false,
      zoominfoControl: true,
      fullscreenControl: true,
      layers: [openStreetMap]
    });

    L.control.layers(baseMaps, overlayMaps).addTo(this.map);
    this.layerGroup.addTo(this.map);

    // Add a click listener which is setted only if user's current location is viewed
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

  /**
   * Called when map container size is changed. It re-renders needed parts of the map
   */
  onMapResized = () => {
    this.map.invalidateSize(true);
  }

  /**
   * Shows the markers on the map
   */
  showMarkersOnMap = (markerData) => {
    // Cluster Mode
    this.clusterMap = L.markerClusterGroup();
    const latLngs = [];

    for (let marker of markerData) {
      if (marker.lat && marker.long && !isNaN(marker.lat.value) && !isNaN(marker.long.value)) {
        const popupText = this.generateMarkerPopup(marker);
        const location = new L.LatLng(marker.lat.value, marker.long.value);
        const markerToMap = new L.marker(location).bindPopup(popupText);
        latLngs.push(location);
        this.clusterMap.addLayer(markerToMap);
      }
    }

    // HeatMap Mode
    this.heatMap = L.heatLayer(latLngs, {
      radius: 15,
      minOpacity: 1.0,
      blur: 25,
      maxZoom: 13,
      gradient: {
        0: '#66ff00',
        0.1: '#66ff00',
        0.2: '#93ff00',
        0.3: '#c1ff00',
        0.4: '#eeff00',
        0.5: '#f4e300',
        0.6: '#f9c600',
        0.7: '#ffaa00',
        0.8: '#ff7100',
        0.9: '#ff3900',
        1: '#ff0000'
      }
    });

    // Show the current mode layer
    if (this.props.mode && this.props.mode === MapMode.HEATMAP) {
      this.map.addLayer(this.heatMap);
    } else {
      this.layerGroup.addLayer(this.clusterMap);
      //this.map.addLayer(this.clusterMap);
    }
  }

  /**
   * Generates marker popup
   */
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