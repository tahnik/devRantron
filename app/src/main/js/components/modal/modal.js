import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Item from '../item/item';
import PostRant from '../utilities/post_rant';
import UserProfile from '../user/user_profile';
import { ITEM } from '../../consts/types';

class Modal extends Component {
  getItem() {
    const { item } = this.props;
    if (item.type === ITEM.POST_RANT.NAME) {
      return <PostRant {...this.props} />;
    } else if (item.type === ITEM.PROFILE.NAME) {
      return <UserProfile {...this.props} />;
    }
    return <Item key={item.id} cardItem={item} {...this.props} />;
  }
  onOutsideClick(e) {
    if (
      e.target.className === 'item_container modal'
      || e.target.className === 'comments_and_post'
      || e.target.className === 'item_column'
      || e.target.className === 'profile_container modal'
      || e.target.className === 'item_compact_column'
    ) {
      this.props.close();
    }
  }
  render() {
    const { item, close } = this.props;
    return (
      <CSSTransitionGroup
        transitionName="fade_item"
        transitionEnterTimeout={250}
        transitionLeaveTimeout={150}
        className="modal"
      >
        {
          item ?
            <div
              className="modal_container"
              onClick={e => this.onOutsideClick(e)}
            >
              <div className="close_modal" onClick={() => close()}>
                <i className="ion-close-round" />
              </div>
              { this.getItem() }
            </div>
          : null
        }
      </CSSTransitionGroup>

    );
  }
}

Modal.propTypes = {
  item: PropTypes.object, //eslint-disable-line
  close: PropTypes.func.isRequired,
};

export default Modal;
