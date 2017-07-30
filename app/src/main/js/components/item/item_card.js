import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Twemoji from 'react-twemoji';
import UserBadge from '../user/user_badge';
import BottomBar from '../utilities/bottom_bar';
import { ITEM } from '../../consts/types';

class ItemCard extends Component {
  shouldComponentUpdate(nextProps) {
    if (
      this.props.theme === nextProps.theme
      && this.props.item === nextProps.item
    ) {
      return false;
    }
    return true;
  }
  static timeSince(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 2592000;
    if (interval > 1) {
      const nd = new Date(date);
      return `${nd.getDate()}/${nd.getMonth()}/${nd.getYear().toString().substring(1)}`;
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return `${Math.floor(interval)}d`;
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return `${Math.floor(interval)}h`;
    }
    interval = seconds / 60;
    if (interval > 1) {
      return `${Math.floor(interval)}m`;
    }
    return `${Math.floor(seconds)}s`;
  }
  open() {
    const { item, open, modal, itemType } = this.props;
    if (!modal) {
      open(itemType, item.id);
    }
  }
  renderCollab() {
    const { item, itemType } = this.props;
    if (itemType !== ITEM.COLLAB.NAME) {
      return null;
    }
    return (
      <div className="item_card_collab" >
        <span className="title">Project Type</span>
        <span className="body">{item.c_type_long}</span>
        {
          item.c_description ?
            <div>
              <span className="title">Description</span>
              <span className="body">{item.c_description}</span>
            </div>
            : null
        }
        {
          item.c_tech_stack ?
            <div>
              <span className="title">Tech Stack</span>
              <span className="body">{item.c_tech_stack}</span>
            </div>
            : null
        }
        {
          item.c_team_size ?
            <div>
              <span className="title">Current Team Size</span>
              <span className="body">{item.c_team_size}</span>
            </div>
            : null
        }
        {
          item.c_url ?
            <div>
              <span className="title">Project Url</span>
              <span className="body">{item.c_url}</span>
            </div>
            : null
        }
      </div>
    );
  }
  render() {
    const { item, theme, vote, modal, itemType, auth, open } = this.props;
    const user = {
      avatar: item.user_avatar,
      score: item.user_score,
      id: item.user_id,
      username: item.user_username,
      dpp: item.user_dpp,
    };
    let isUser = false;
    if (auth.user) {
      isUser = auth.user.authToken.user_id === item.user_id;
    }
    const image = item.attached_image;
    return (
      <div
        className={`item_card ${modal ? null : 'shadow'}`}
        style={{
          backgroundColor: theme.item_card.backgroundColor,
          color: theme.item_card.color,
        }}
      >
        <UserBadge
          user={user}
          theme={theme}
          open={open}
        />
        <span
          className="timesince"
        >{ItemCard.timeSince(item.created_time * 1000)}</span>
        <div
          className="body_container"
          onClick={() => this.open()}
        >
          <div
            className="top_container"
          >
            { itemType === ITEM.COLLAB.NAME ?
              <span className="title">Summary</span> : null
            }
            <span className="body"><Twemoji>{item.text}</Twemoji></span>
            { this.renderCollab() }
          </div>
          { image !== '' ? <img alt="" src={image.url} /> : null }
          {item.tags.length !== 0 && <div className="tags">
            {item.tags.map(object => (
              <span key={object} className="tag">{object}</span>
            ))}
          </div>}
        </div>
        <BottomBar
          score={item.score}
          comments={item.num_comments}
          isUpvoted={item.vote_state}
          vote={vote}
          id={item.id}
          isUser={isUser}
        />
      </div>
    );
  }
}

ItemCard.propTypes = {
  item: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  vote: PropTypes.func.isRequired,
  itemType: PropTypes.string, //eslint-disable-line
  open: PropTypes.func, // eslint-disable-line
  modal: PropTypes.bool, //eslint-disable-line
};

export default ItemCard;
