import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Item from '../item/item';
import PostRant from '../utilities/post_rant';
import UserProfile from '../user/user_profile';
import ReleaseInfo from '../utilities/release_info';
import { ITEM } from '../../consts/types';

class Modal extends Component {
  componentDidUpdate() {
    if (this.modal) {
      this.modal.focus();
    }
  }
  handleESC(e) {
    if (e.keyCode === 27) {
      this.props.close();
    }
  }
  getItem() {
    const { item } = this.props;
    if (item.type === ITEM.POST_RANT.NAME) {
      return <PostRant {...this.props} />;
    } else if (item.type === ITEM.PROFILE.NAME) {
      return <UserProfile {...this.props} />;
    } else if (item.type === ITEM.RELEASE_INFO.NAME) {
      return <ReleaseInfo {...this.props} />;
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
      || e.target.className === 'comments_container'
    ) {
      this.props.close();
    }
  }
  render() {
    const { item, close, theme } = this.props;
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
              tabIndex="0" //eslint-disable-line
              onKeyDown={e => this.handleESC(e)}
              onClick={e => this.onOutsideClick(e)}
              ref={(node) => { this.modal = node; }}
            >
              <div
                className="close_modal"
                onClick={() => close()}
                style={{
                  background: theme.plus_notif ? theme.plus_notif.backgroundColor : '#dd4242',
                  color: theme.id === 'dark_theme' ? '#ffffff' : theme.item_card.backgroundColor,
                }}
              >
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
  item: PropTypes.object,
  close: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

export default Modal;
