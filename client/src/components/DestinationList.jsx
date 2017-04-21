import React from 'react';
import PropTypes from 'prop-types';
import DestinationEntry from './DestinationEntry';


const DestinationList = ({ redirect }) => (
  <div>
    <center>
      <DestinationEntry redirect={redirect} />
    </center>
  </div>
);

DestinationList.defaultProps = {
  redirect: {},
};

DestinationList.propTypes = {
  redirect: PropTypes.shape,
};

export default DestinationList;
