import React from 'react';
import PropTypes from 'prop-types';

const Loading = props => (
  <div
    className="loading_container"
    style={{ backgroundColor: props.backgroundColor }}
  >
    <img src="../../../res/images/loading.png" alt="" />
  </div>
);

Loading.propTypes = {
  backgroundColor: PropTypes.string, //eslint-disable-line
};

export default Loading;
