import React from 'react';
import PropTypes from 'prop-types';
import Rant from '../rant/rant.js';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

const getItem = (item) => {
  console.log(item);
  return <Rant key={item.id} />;
};

const Modal = ({ items }) => {
  return (
    <div>
      <CSSTransitionGroup
        transitionName="fade"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        {
          items.length > 0 ? items.map(item => getItem(item)) : null
        }
      </CSSTransitionGroup>
    </div>
  );
};

Modal.propTypes = {
};

export default Modal;
