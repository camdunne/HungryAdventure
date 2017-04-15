import React, { Component } from 'react';

class YelpPin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="pin"><span className="glyphicon glyphicon-pushpin" />{this.props.text}</div>
    );
  }
}

export default YelpPin;
