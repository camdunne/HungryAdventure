import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import HotelPin from '../components/HotelPin';
const API = require('../keys/mapsKey.js');


class GoogleMaps extends Component {
  constructor(props) {
    super(props);
    console.log('GOOGLEMAPS', this.props);
  }

  render() {
    if (this.props.locator === undefined || this.props.hotels === undefined) {
      return (
        <div>loading</div>
      );
    }
    return (
      <div className="maps">
        <GoogleMapReact
          options={{ scrollwheel: false }}
          defaultCenter={{ lat: this.props.geo.locator.latitude, lng: this.props.geo.locator.longitude }}
          defaultZoom={14}
          bootstrapURLKeys={{ key: API.googleMaps() }}
        >
          {this.props.hotelsArr.map((hotel, index) =>
            <HotelPin
              lat={hotel.lat} lng={hotel.lng} key={index} price={hotel.price}
            />,
        )}
        </GoogleMapReact>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state,
});

export default connect(mapStateToProps, null)(GoogleMaps);
