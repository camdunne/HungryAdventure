import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Carousel } from 'react-bootstrap';
import { destinationSet } from '../actions/destinationAction';
import { fetchGeo } from '../actions/geoAction';
import { fetchHotels } from '../actions/hotelAction';
import { flightBudget } from '../actions/budgetAction';
import { history, Link } from 'react-router-dom'
import { browserHistory } from 'react-router';
import { fetchEvents } from '../actions/eventsAction'
import { fetchWeather } from '../actions/weatherAction'

class DestinationEntry extends Component {

constructor (props){
  super(props);
}

handleSelect = (destination) => {
  this.props.flightBudget({price: destination.price, original: Number(this.props.budget.original)});
  this.props.fetchHotels({city: destination.city});
  this.props.fetchGeo({location: destination.city})
    .then(() => this.props.destinationSet(destination));
  this.props.fetchEvents({location: destination.city})
  this.props.redirect('/destination');
}

render () {
  return (<div>
  {this.props.destinations.destinations.map((destination, index) => (

    <Col className="" sm={6} md={4} key={destination.IataCode}>
      <div className="tile">
        <div>
          <Carousel key={index} className="flight" direction={null}>
            {destination.imageUrl.map((image, i) => (
              <Carousel.Item className="flightimg" key={destination.imageUrl[i]} >
               <img className="flightimg" alt=""
               src={destination.imageUrl[i]} onClick={ ()=> {this.handleSelect(destination)}} />
              </Carousel.Item>
                ))}
          </Carousel>
        </div>
        <div>
          <div>
            <div className="col-xs-10 left">
              <span className="icon glyphicon glyphicon-plane" />
              <span className="bold"> {destination.city} </span>
                ||
                <span> {destination.IataCode}</span>
            </div>
            <div className="col-xs-2 right">${destination.price}</div>
          </div>
          <div>
            {destination.arrivalDate} through {destination.departureDate}
          </div>
          <div>
            <span>{destination.carrier}</span>
          </div>
        </div>
      </div>
    </Col>
    ))}
    </div>
    )
  }
}
const mapStateToProps = ({destinations, budget}) => ({
  destinations,
  budget,
});

export default connect(mapStateToProps , { destinationSet, browserHistory, fetchGeo, fetchHotels, flightBudget, fetchEvents, fetchWeather } )(DestinationEntry);


/*

const ControlledCarousel = React.createClass({
  getInitialState() {
    return {
      index: 0,
      direction: null
    };
  },

  handleSelect(selectedIndex, e) {
    alert('selected=' + selectedIndex + ', direction=' + e.direction);
    this.setState({
      index: selectedIndex,
      direction: e.direction
    });
  },

  render() {
    return (
      <Carousel activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect}>
        <Carousel.Item>
          <img width={900} height={500} alt="900x500" src="/assets/carousel.png"/>
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img width={900} height={500} alt="900x500" src="/assets/carousel.png"/>
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img width={900} height={500} alt="900x500" src="/assets/carousel.png"/>
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
});

ReactDOM.render(<ControlledCarousel />, mountNode);

*/
