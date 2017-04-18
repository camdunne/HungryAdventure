import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import { HotelPin } from '../components/Pins';
import { googleMaps } from '../keys/mapsKey';

class GoogleMaps extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.locator === undefined || this.props.hotels === undefined) {
      return (
        <div>loading</div>
      );
    }
    return (
        <GoogleMapReact
          options={{ scrollwheel: false }}
          defaultCenter={{ lat: this.props.geo.locator.latitude, lng: this.props.geo.locator.longitude }}
          defaultZoom={12}
          bootstrapURLKeys={{ key: googleMaps() }}
        >
          {this.props.hotelsArr.map((hotel, index) =>
            <HotelPin
              lat={hotel.lat} lng={hotel.lng} key={index} price={hotel.price}
            />,
        )}
        </GoogleMapReact>
    );
  }
}

const mapStateToProps = state => ({
  ...state,
});

export default connect(mapStateToProps, null)(GoogleMaps);
