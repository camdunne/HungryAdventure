import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
const API = require('../keys/mapsKey.js');

class GoogleMaps extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.locator === undefined) {
      return (
        <div>loading</div>
      );
    }
    return (
      <div className="maps">
        <GoogleMapReact
          options={{ scrollwheel: false }}
          defaultCenter={{ lat: this.props.locator.latitude, lng: this.props.locator.longitude }}
          defaultZoom={13}
          bootstrapURLKeys={{ key: API.googleMaps() }}
          key={this.props.locator.latitude}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state,
});

export default connect(mapStateToProps, null)(GoogleMaps);
