import React from 'react';
import PropTypes from 'prop-types';

const Weather = ({ destination, weather }) => {
  if (weather === undefined) {
    return (
      <div>loading</div>
    );
  }
  const date = (new Date(destination.arrivalDate)).toString().slice(0, 15);
  const herojpg = destination.imageUrl[1] || destination.imageUrl[0];
  return (
    <div id="card" className="weather">
      <div className="city-selected">
        <article>
          <div className="info">
            <h5>{date}</h5>
            <h4 className="city">{destination.city}</h4>
            <h3>{`${weather.highTemp}°F / ${weather.lowTemp}°F`}</h3>
            <br />
            <h6>{weather.summary}</h6>
          </div>
        </article>
        <figure style={{ backgroundImage: `url(${herojpg})` }} />
      </div>
    </div>
  );
};

Weather.defaultProps = {
  weather: {},
  destination: {},
};

Weather.propTypes = {
  weather: PropTypes.shape,
  destination: PropTypes.shape,
};

export default Weather;
