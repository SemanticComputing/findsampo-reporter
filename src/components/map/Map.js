import React, { Component } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

class Map extends Component {
  componentDidMount() {
    this.initialiseIcon();
    this.position = this.initialiseMap();
  }

  render() {
    return (
      <div id="map"></div>
    );
  }

  initialiseIcon = () => {
    let DefaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow,
      iconAnchor: [12,36]
    });

    L.Marker.prototype.options.icon = DefaultIcon;
  }

  initialiseMap = () => {
    this.getGeoLocation();

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

    this.getGeoLocation();
  }

  getGeoLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setCurrentLocation(position.coords.latitude, position.coords.longitude);
      // On fail
    }, () => {
      console.log('Getting current location is failed');
    });
  }

  setCurrentLocation = (lat, lng) => {
    L.marker([lat, lng]).addTo(this.map);
  }
}

export default Map;