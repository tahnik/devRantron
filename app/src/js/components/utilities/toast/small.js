import React from 'react';
import PropTypes from 'prop-types';

const SmallToast = ({ toastText }) => (
  <div className="toast" >
    {toastText}
  </div>
);

SmallToast.propTypes = {
  toastText: PropTypes.string.isRequired,
};

export default SmallToast;
