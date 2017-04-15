import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import { fetchEvents } from '../actions/eventsAction';
import Event from '../components/Event';
// import GoogleMaps from './GoogleMaps'
import YelpPin from '../components/YelpPin';
import BudgetBar from '../components/budgetBar';

const API = require('../keys/mapsKey.js');

class Events extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.eventsArr.events === undefined) {
      return (
        <div>No Yelp Events</div>
      );
    }
    return (
      <div>
        <button><Link to="/storypage">Checkout</Link></button>
        <br />
        <h1>current budget: ${this.props.budget.hotel}</h1>
        <div style={{ display: 'grid' }}>
          <BudgetBar budget={this.props.budget} />
        </div>
        <div className="maps">
          <GoogleMapReact
            options={{ scrollwheel: false }}
            defaultCenter={{ lat: this.props.geo.locator.latitude, lng: this.props.geo.locator.longitude }}
            defaultZoom={14}
            bootstrapURLKeys={{ key: API.googleMaps() }}
          >
            {this.props.eventsArr.events.map((event, index) =>
              <div className="pin" lat={event.coordinates.latitude} lng={event.coordinates.longitude} key={index}>
                <span className="glyphicon glyphicon-pushpin" />
                {this.props.text}
              </div>,
            )}
          </GoogleMapReact>
        </div>
        {this.props.eventsArr.events.map((event, index) =>
          <Event event={event} key={index} />,
          )}
      </div>
    );
  }
}

const mapStateToProps = ({ events, geo, budget }) => ({
  eventsArr: events,
  geo,
  budget,
});

export default connect(mapStateToProps, null)(Events);
