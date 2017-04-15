import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
const API = require('../keys/mapsKey.js');

class GoogleMaps extends Component {
  constructor(props) {
    super(props);
    console.log('GOOGLEMAPS', this.props);
  }

  render() {
    if (this.props.locator === undefined) {
      return (
        <div>loading</div>
      );
    }
    return (
      <GoogleMapReact
        options={{ scrollwheel: false }}
        defaultCenter={{ lat: this.props.geo.locator.latitude, lng: this.props.geo.locator.longitude }}
        defaultZoom={14}
        bootstrapURLKeys={{ key: API.googleMaps() }}
      >
        {this.props.hotels.hotels.map((hotel, index) =>
          <div className="pin" lat={hotel.lat} lng={hotel.lng} key={index}>
            <span className="glyphicon glyphicon-pushpin" />
            ${hotel.price}
          </div>,
        )}
      </GoogleMapReact>
    );
  }
}

const mapStateToProps = state => ({
  ...state,
});

export default connect(mapStateToProps, null)(GoogleMaps);
