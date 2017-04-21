import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';

import { HotelPin, YelpPin, FlightPin } from '../components/Pins';
import { googleMaps } from '../keys/mapsKey';


const GoogleMaps = ({ locator, mapArray }) => {
  if (locator === undefined) {
    return (
      <div>loading</div>
    );
  }
  return (
    <GoogleMapReact
      options={{ scrollwheel: false }}
      defaultCenter={{ lat: locator.latitude, lng: locator.longitude }}
      defaultZoom={11}
      bootstrapURLKeys={{ key: googleMaps() }}
    >
      {mapArray.map((elem) => {
        if (elem.latitude) {
          return (
            <FlightPin
              lat={elem.latitude}
              lng={elem.longitude}
              key={elem.city}
            />);
        } else if (elem.lat) {
          return (<HotelPin
            lat={elem.lat}
            lng={elem.lng}
            key={elem.id}
          />);
        }
        return (<YelpPin
          lat={elem.coordinates.latitude}
          lng={elem.coordinates.longitude}
          key={elem.name}
        />);
      })}
    </GoogleMapReact>
  );
};
GoogleMaps.defaultProps = {
  mapArray: [],
  locator: {},
};
GoogleMaps.propTypes = {
  locator: PropTypes.shape,
  mapArray: PropTypes.arrayOf,
};

export default GoogleMaps;
