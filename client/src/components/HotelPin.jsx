import React, { Component } from 'react';

class HotelPin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="pin"><span className="glyphicon glyphicon-pushpin" />${this.props.price}</div>
    );
  }
}

export default HotelPin;
