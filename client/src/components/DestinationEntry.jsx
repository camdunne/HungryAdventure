import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { destinationSet } from '../actions/destinationAction';
import { fetchGeo, fetchTerminal } from '../actions/geoAction';
import { fetchHotels } from '../actions/hotelAction';
import { flightBudget } from '../actions/budgetAction';
import { fetchEvents } from '../actions/yelpAction';
import { fetchWeather } from '../actions/weatherAction';
import { currentDestination } from '../actions/currentStateAction';
import { destinationImage } from '../actions/budgetBarAction';
import { fetchViator } from '../actions/viatorAction';
import { fetchFrommers } from '../actions/frommersAction';


class DestinationEntry extends Component {

  getRandomInt = (min, max) => {
    const mini = Math.ceil(min);
    const maxi = Math.floor(max);
    return Math.floor(Math.random() * (maxi - mini)) + mini;
  }

  handleSelect = (destination) => {
    this.props.destinationSet(destination);
    this.props.flightBudget({
      price: destination.price,
      original: Number(this.props.budget.original),
    });
    this.props.fetchTerminal({ terminal: destination.IataCode });
    this.props.fetchGeo({ city: destination.city, country: destination.country })
    .then((result) => {
      this.props.fetchWeather({
        latitude: result.payload.latitude,
        longitude: result.payload.longitude,
        time: destination.arrivalDate,
      });
      this.props.fetchHotels({
        latitude: result.payload.latitude,
        longitude: result.payload.longitude,
      });
    });
    this.props.destinationImage({ destination: destination.imageUrl[0] });
    this.props.fetchEvents({ location: destination.city });
    this.props.fetchViator({ location: destination.city });
    this.props.currentDestination({ destination });
    this.props.fetchFrommers({ location: destination.city });
    this.props.redirect('/destination');
  }

  render() {
    return (
      <section className="no-padding" id="locations">
        {this.props.destinations.destinations.map(destination => (
          <div className="col-lg-4 col-sm-6" key={destination.city + destination.IataCode}>
            <div
              className="event-card"
              onClick={() => { this.handleSelect(destination); }}
            >
              <img
                src={
                  destination.imageUrl[this.getRandomInt(0, destination.imageUrl.length)]
                }
                className="customImg"
                alt="Not Found"
                onError={(e) => { e.target.src = 'https://ugotalksalot.files.wordpress.com/2016/06/no-thumb.jpg'; }}
              />
              <div className="card-text">
                {`$${destination.price} ${destination.city} , ${destination.country}`}
              </div>
            </div>
          </div>
      ))}
      </section>
    );
  }
}

DestinationEntry.defaultProps = {
  destinationSet: () => {},
  flightBudget: () => {},
  budget: {},
  fetchTerminal: () => {},
  fetchGeo: () => {},
  fetchWeather: () => {},
  fetchHotels: () => {},
  fetchEvents: () => {},
  destinationImage: () => {},
  fetchViator: () => {},
  currentDestination: () => {},
  fetchFrommers: () => {},
  destinations: {},
  redirect: () => {},
};

DestinationEntry.propTypes = {
  destinationSet: PropTypes.func,
  flightBudget: PropTypes.func,
  budget: PropTypes.shape,
  fetchTerminal: PropTypes.func,
  fetchGeo: PropTypes.func,
  fetchWeather: PropTypes.func,
  fetchHotels: PropTypes.func,
  fetchEvents: PropTypes.func,
  destinationImage: PropTypes.func,
  fetchViator: PropTypes.func,
  currentDestination: PropTypes.func,
  fetchFrommers: PropTypes.func,
  destinations: PropTypes.shape,
  redirect: PropTypes.func,
};

const mapStateToProps = ({ destinations, budget, geo, bar }) => ({
  destinations,
  budget,
  geo,
  bar,
});

export default connect(mapStateToProps, {
  destinationSet,
  browserHistory,
  fetchGeo,
  fetchTerminal,
  fetchHotels,
  flightBudget,
  fetchEvents,
  fetchWeather,
  currentDestination,
  destinationImage,
  fetchViator,
  fetchFrommers,
})(DestinationEntry);
