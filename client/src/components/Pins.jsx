import React from 'react';

const HotelPin = props => (
  <div className="pin hotelPin"><span className="hotelPin" />${props.price}</div>
    );

const YelpPin = props => (
  <div className="pin"><span className="glyphicon glyphicon-pushpin" />{props.text}</div>
    );

const StoryPin = props => (
  <div className="pin"><span className="glyphicon glyphicon-pushpin" />{props.text}</div>
    );

export { HotelPin, YelpPin, StoryPin };
