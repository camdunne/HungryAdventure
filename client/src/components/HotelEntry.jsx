import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Carousel } from 'react-bootstrap';
import { currentHotel } from '../actions/currentState';
import { hotelBudget } from '../actions/budgetAction';
import { hotelImage } from '../actions/budgetBarAction';

class HotelEntry extends Component {
  constructor(props) {
    super(props);
  }

  add = (hotel, props) => {
    this.props.currentHotel({ hotel: hotel});
    this.props.hotelBudget({
      hotel: hotel.price,
      budget: props.budget,
      arrivalDate: props.destination.arrivalDate,
      departureDate: props.destination.departureDate,
      });
    this.props.hotelImage({ hotel: hotel.pictures[0] });
  }

  render() {
    if (this.props.hotels.hotels === undefined) {
      return (
        <div>loading...</div>
      );
    }
    return (
      <div>
        <div className="col-md-6 col-md-offset-3">
          <div className="carousel slide" data-ride="carousel" data-type="multi" data-interval="3000" id="myCarousel">
            <div className="carousel-inner">  {this.props.hotels.hotels.map((hotel,i) => (
                <div key={hotel.id} className={"item tile " + ( i === 0 ? 'active': null )}  >
                  <div className="col-md-3 col-sm-6 col-xs-12">
                    <a href="#"><img src={hotel.pictures[0]} className="img-responsive"/></a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <a className="left carousel-control" href="#myCarousel" data-slide="prev"><i className="glyphicon glyphicon-chevron-left"></i></a>
          <a className="right carousel-control" href="#myCarousel" data-slide="next"><i className="glyphicon glyphicon-chevron-right"></i></a>
        </div>
      </div>
    );
  }
  }

// onClick={()=> { this.add(hotel, this.props) }}
const mapStateToProps = ({ hotels, destination, budget }) => ({
  hotels,
  destination,
  budget,
});
export default connect(mapStateToProps, { currentHotel, hotelBudget, hotelImage })(HotelEntry);
