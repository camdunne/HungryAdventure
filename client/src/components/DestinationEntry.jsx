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
import { currentDestination } from '../actions/currentState';
import { destinationImage } from '../actions/budgetBarAction';
import { fetchViator } from '../actions/viatorAction';
import { fetchFrommers } from '../actions/frommersAction';



class DestinationEntry extends Component {

constructor (props){
  super(props);
}

handleSelect = (destination) => {
  this.props.fetchHotels({city: destination.city});
  this.props.destinationSet(destination);
  this.props.flightBudget({price: destination.price, original: Number(this.props.budget.original)});
  this.props.fetchGeo({location: destination.city})
    .then((result) => {
      this.props.fetchWeather({
        latitude: result.payload.latitude,
        longitude: result.payloadlongitude,
        time: destination.arrivalDate,
      })
    });
  this.props.destinationImage({destination: destination.imageUrl[0]})
  this.props.fetchEvents({ location: destination.city });
  this.props.fetchViator({ location: destination.city })
  this.props.currentDestination({ destination: destination });
  this.props.fetchFrommers({ location: destination.city });
  this.props.redirect('/destination');
}

render () {
  return (
  // <div className="destEntry">
  <section className="no-padding" id="locations">
    <div className="container-fluid">
      <div className="row no-gutter popup-gallery">
    {this.props.destinations.destinations.map((destination, index) => (
       <div className="col-lg-4 col-sm-6" key={destination.city}>
            <div className="portfolio-box" onClick={ ()=> {this.handleSelect(destination)}} >
                <img src={destination.imageUrl[0]}
                  className="img-responsive customImg"
                  alt="" />
                <div className="portfolio-box-caption">
                    <div className="portfolio-box-caption-content">
                        <div className="project-category text-faded">
                            {destination.city}
                        </div>
                        <div className="project-name">
                            ${destination.price}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      ))}
      </div>
    </div>
  </section>
    )
  }
}
const mapStateToProps = ({destinations, budget, geo, bar}) => ({
  destinations,
  budget,
  geo,
  bar,
});


export default connect(mapStateToProps , { destinationSet, browserHistory, fetchGeo, fetchHotels, flightBudget, fetchEvents, fetchWeather, currentDestination, destinationImage, fetchViator, fetchFrommers } )(DestinationEntry);

// <Col className="" md={4} key={destination.IataCode}>
//   <div className="tile">
//     <div className='image'>
//       <Carousel key={index} className="flight" direction={null}>
//         {destination.imageUrl.map((image, i) => (
//           <Carousel.Item className="flightimg" key={destination.imageUrl[i]+i} >
//            <img className="flightimg" alt=""
//            src={destination.imageUrl[i]} onClick={ ()=> {this.handleSelect(destination)}}/>
//           </Carousel.Item>
//             ))}
//       </Carousel>
//       <div className="caption post-content">
//         <div className="bold">{destination.city}</div>
//         <div>${destination.price}</div>
//       </div>
//     </div>
//   </div>
//   </Col>
