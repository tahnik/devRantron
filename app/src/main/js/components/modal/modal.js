import React from 'react';
import PropTypes from 'prop-types';
import Rant from '../rant/rant';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { STATE } from '../../consts/types';
import Loading from '../utilities/loading';

const getItem = (item, theme, vote, close) => {
  console.log(item);
  return (
    <div key={item.id}>
      <div
        className="close_modal"
        onClick={() => close(item.id)}
      >
        <i className="ion-close-round" />
      </div>
      {
        item.state === STATE.LOADING ? <Loading />
        :
        <Rant item={item.item} theme={theme} vote={vote} />
      }
    </div>
  );
};

const Modal = ({ items, theme, vote, close }) => {
  return (
    <CSSTransitionGroup
      transitionName="fade"
      transitionEnterTimeout={300}
      transitionLeaveTimeout={300}
    >
      {
        items.length > 0 ?
        items.map(item => getItem(item, theme, vote, close))
        : null
      }
    </CSSTransitionGroup>
  );
};

Modal.propTypes = {
  items: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired,
  vote: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

export default Modal;
