import React, { Component } from 'react';
import { connect } from 'react-redux';
// +++++ Imported Components
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import GoogleMaps from './GoogleMaps';
import HotelList from '../components/HotelList';
import Weather from '../components/weather';
import BudgetBar from '../components/budgetBar';
import FrommersInfo from './FrommersInfo';

// Charts
import DonutChart from 'react-donut-chart';

class destinationPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const budget = this.props.budget.original;
    const flightCost = this.props.budget.flight || 0;
    const hotelCost = this.props.budget.hotel || 0;
    const activityCost = this.props.budget.viatorEvents || 0;
    const foodCost = this.props.budget.yelpEvents || 0;
    const totalBudget = budget - flightCost - hotelCost - activityCost - foodCost;
    return (<div>
      <div><Link to="/events">YELP</Link></div>
      <div><Link to="/viator">VIATOR</Link></div>

      <h1> Hungry Adventure </h1>
      <div
        className="hero" style={{
          backgroundImage: `url(${this.props.destination.imageUrl[0]})`,
          height: '70%',

        }}
      ><DonutChart
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
      />
      </div>
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '15px',
          margin: 'auto',
          width: '50%',
          textAlign: 'center',
          top: '-5%',
        }}
      >
        {this.props.destination.IataCode}
      </div>
      <div className="container col-sm-offset-3" style={{ display: 'grid', marginBottom: '5%' }}>
        <BudgetBar budget={this.props.budget} />
      </div>
      <div style={{ marginBottom: '10%' }}>
        <Col sm={6} className="col-md-offset-1">
          <FrommersInfo />
        </Col>
        <Weather />
      </div>
      <div style={{ display: 'grid' }} />
      <GoogleMaps locator={this.props.geo.locator} hotelsArr={this.props.hotels.hotels} />
      <HotelList hotels={this.props.hotels} destination={this.props.destination} />
    </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state,
});

export default connect(mapStateToProps, null)(destinationPage);
