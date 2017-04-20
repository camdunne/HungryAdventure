import React, { Component } from 'react';
import { connect } from 'react-redux';
// +++++ Imported Components
import { Link } from 'react-router-dom';
import { Col, Button } from 'react-bootstrap';
import GoogleMaps from './GoogleMaps';
import HotelList from '../components/HotelList';
import Weather from '../components/weather';
import BudgetBar from '../components/budgetBar';
import FrommersInfo from './FrommersInfo';
import ViatorEvents from './ViatorEvents';
import YelpEvents from './YelpEvents';
import Auth from './FacebookAuth';
import { pinArray } from '../../utils/storyPageHelpers';

// Charts
import DonutChart from 'react-donut-chart';

class destinationPage extends Component {

  componentWillMount() {
    window.scrollTo(0, 0)
  }

  loadDestination = () => {
    if(this.props.current.destination.imageUrl.length > 0){
      return <img className="circleAdd" style={{ marginTop: '110px',}} src={this.props.current.destination.imageUrl[0]}></img>
    }
  }

  loadHotel = () => {
    if(this.props.current.hotel.pictures.length > 0){
      return <img className="circleAdd" style={{ marginTop: '200px',}} src={this.props.current.hotel.pictures[0]}></img>
    }
  }

  loadEvents = () => {
    if(this.props.current.viatorEvents.length > 0){
        return <img className="circleAdd" style={{ marginTop: "300px",}} src={this.props.current.viatorEvents[0].image}></img>
    }
  }

 loadFood = () => {
    if(this.props.current.yelpEvents.length > 0){
        return <img className="circleAdd" style={{ marginTop: "400px",}} src={this.props.current.yelpEvents[0].image_url}></img>
    }
  }


  render() {
    const budget = this.props.budget.original;
    const flightCost = this.props.budget.flight || 0;
    const hotelCost = this.props.budget.hotel || 0;
    const activityCost = this.props.budget.viatorEvents || 0;
    const foodCost = this.props.budget.yelpEvents || 0;
    const totalBudget = budget - flightCost - hotelCost - activityCost - foodCost;
    const mapArray = pinArray(this.props.current);

    return (<div>
      <Link to="/storypage"><div className="circle"><div className="checkoutbutton glyphicon glyphicon-shopping-cart" /></div></Link>
      {this.loadDestination()}
      {this.loadHotel()}
      {this.loadEvents()}
      {this.loadFood()}
      <div
        className="hero" style={{
          background: `linear-gradient( rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${this.props.destination.imageUrl[0]}) no-repeat center center fixed`,
          height: '60%',
          backgroundSize: 'cover',
        }}
      >
        <div className="titleContainer">
          <div className="mobileTitle">
            <h1>Hungry Adventure</h1>
            <hr className="pageHr" />
            <p className="pageTitle">{this.props.destination.city}, {this.props.destination.country}</p>
          </div>
        </div>
      </div>

      <div className="pageContainer">
        <Col sm={4} xs={12} className="weatherPadding mobileSpacing"> <Weather /></Col>
        <Col sm={4} xs={12} className="donut mobileSpacing"> <DonutChart
          data={[{ label: `Remaining ( $ ${totalBudget} )`,
            value: totalBudget,
            isEmpty: true,
          },
          { label: ` Hotel ( $ ${hotelCost} )`,
            value: hotelCost },
          { label: ` Flight ( $ ${flightCost} )`,
            value: flightCost },
          { label: `Attractions ( $ ${activityCost} )`,
            value: activityCost },
          { label: `Food ( $ ${foodCost} )`,
            value: foodCost,
          },
          ]} height={200} width={200} legend={false} className="donutAlign"
        /></Col>
        <Col sm={4} xs={12} className="mobileSpacing fromContainer"><FrommersInfo /></Col>
      </div>

      <Col sm={12} xs={12} className="mapsPadding">
        <div className="maps">
          <GoogleMaps key={Math.random()} locator={this.props.geo.locator} mapArray={mapArray} />
        </div>
      </Col>
      <HotelList hotels={this.props.hotels} destination={this.props.destination} />
      <ViatorEvents />
      <YelpEvents />
      <div className="spaceMe" />
    </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state,
});

export default connect(mapStateToProps, null)(destinationPage);
