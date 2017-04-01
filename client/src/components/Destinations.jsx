import React, { Component } from 'react';
import { Col, Carousel } from 'react-bootstrap';

import dummyData from './dummyData';

export default class Destinations extends Component {
  render() {
    const dumnies = dummyData.map(dummy => (
      <Col className="" sm={6} md={4} key={Object.keys(dummy)[0]} >
        <div className="tile">
          <div>
            <Carousel className="flight">
              {dummy[Object.keys(dummy)[0]].imageUrl.map((image, i) => (
                <Carousel.Item className="flightimg" key={dummy[Object.keys(dummy)[0]].imageUrl[i]}>
                  <img className="flightimg" alt="" src={dummy[Object.keys(dummy)[0]].imageUrl[i]} />
                </Carousel.Item>
                ))}
            </Carousel>
          </div>
          <div>
            <div>
              <div className="col-xs-10 left">
                <span className="icon glyphicon glyphicon-plane" />
                <span className="bold"> {dummy[Object.keys(dummy)[0]].location} </span> || <span>{dummy[Object.keys(dummy)[0]].carrier}</span>
              </div>
              <div className="col-xs-2 right">${dummy[Object.keys(dummy)[0]].price}</div>
            </div>
            <div>
              {dummy[Object.keys(dummy)[0]].arrivalDate} through {dummy[Object.keys(dummy)[0]].departureDate}
            </div>
          </div>
        </div>
      </Col>
    ));

    return (
      <div className="place">
        {dumnies}
      </div>
    );
  }
}
