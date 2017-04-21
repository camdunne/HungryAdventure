import React from 'react';
import PropTypes from 'prop-types';

const FrommersInfo = ({ frommers }) => <div>{frommers.description}</div>;

FrommersInfo.defaultProps = {
  frommers: {},
};

FrommersInfo.propTypes = {
  frommers: PropTypes.shape,
};

export default FrommersInfo;
