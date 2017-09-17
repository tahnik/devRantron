/**
 * Reusable rant cards.
 * Can render a rant or a collab or a comment
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Twemoji from 'react-twemoji';
import UserBadge from '../user/user_badge';
import BottomBar from './bottom_bar';
import { ITEM } from '../../consts/types';
import { parseLinks, timeSince, parseUsers, replaceAll, purifyDOM } from '../../consts/utils';
import rantscript from '../../consts/rantscript';
import Popup from '../utilities/popup';
import { deleteItem } from '../../consts/errors';

const { shell, clipboard } = require('electron');

class ItemCard extends Component {
  constructor() {
    super();
    this.state = {
      popup: {
        visible: false,
        pos: deleteItem.pos,
        neg: deleteItem.neg,
        body: deleteItem.body,
      },
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.theme === nextProps.theme
      && this.props.item === nextProps.item
      && this.state.popup === nextState.popup
    ) {
      return false;
    }
    return true;
  }
  /**
   * An item can be opened if it's not already in a modal
   *
   * @memberof ItemCard
   */
  open() {
    const { item, open, modal, itemType } = this.props;
    if (typeof modal !== 'undefined' || typeof item.tags !== 'undefined') {
      open(itemType, item.id);
    }
  }
  /**
   * Copy the link of the rant or collab to clipboard
   *
   * @memberof ItemCard
   */
  copyLinkToClipboard() {
    const { item, showToast } = this.props;
    const type = typeof item.c_type === 'undefined' ? 'rants' : 'collabs';
    clipboard.writeText(`https://devrant.io/${type}/${item.id}`);
    showToast('Copied to clipboard');
  }
  /**
   * Mark a rant as favourite
   *
   * @param {bool} bool
   * @memberof ItemCard
   */
  onFavorite(bool) {
    const { auth, item } = this.props;
    const id = item.id;
    rantscript.favorite(bool, id, auth.user.authToken)
      .then(() => {

      })
      .catch((err) => {
        console.log(err);
      });
  }
  onDelete(showConfirmPopup = true) {
    if (showConfirmPopup) {
      this.setState({ popup: { ...this.state.popup, visible: true } });
      return;
    }
    if (this.state.popup.visible) {
      this.setState({ popup: { ...this.state.popup, visible: false } });
    }
    const { auth, item, showToast, fetchitem } = this.props;
    if (item.rant_id) {
      rantscript.deleteComment(item.id, auth.user.authToken)
        .then(() => {
          showToast('Comment has been deleted');
          fetchitem();
        })
        .catch(() => {
          showToast('Could not delete the comment');
        });
    } else {
      rantscript.deleteRant(item.id, auth.user.authToken)
        .then(() => {
          showToast('Rant has been deleted');
        })
        .catch(() => {
          showToast('Could not delete the rant');
        });
    }
  }
  onSubscribe(bool) {
    const { auth, item, showToast } = this.props;
    rantscript.subscribe(bool, item.user_id, auth.user.authToken)
      .then(() => {
        showToast('Subscribed to user');
      })
      .catch(() => {
        showToast('Could not subscribe to user');
      });
  }
  /**
   * Parses the content of a rant to find out links and @mention
   * If they exist, it adds <a /> tags which can be opened
   *
   * @memberof ItemCard
   */
  getContent() {
    const { item } = this.props;
    const isComment = typeof item.rant_id !== 'undefined';
    let content = isComment ? item.body : item.text;
    content = replaceAll(content, '<', '&#60;');
    content = purifyDOM(content);

    if (isComment) {
      content = parseUsers(content);
    }
    return parseLinks(content, item);
  }
  static openLink(url) {
    let fURL = url;
    if (
      url.indexOf('http://') === -1
      && url.indexOf('https://') === -1
    ) {
      fURL = `http://${url}`;
    }
    shell.openExternal(fURL);
  }
  getTags() {
    const { item } = this.props;
    if (!item.tags) {
      return <div />;
    }
    return (
      <div>
        {item.tags.length !== 0 && <div className="tags">
          {item.tags.map(object => (
            <span
              key={object}
              className="tag"
              onClick={() => this.props.history.replace(`/search/${object}`)}
            >{object}</span>
          ))}
        </div>}
      </div>
    );
  }
  /**
   * Collabs has some extra informations
   *
   * @memberof ItemCard
   */
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
              <span className="body">
                <p onClick={() => ItemCard.openLink(item.c_url)} className="url">{item.c_url}</p>
              </span>
            </div>
            : null
        }
      </div>
    );
  }
  render() {
    const { item, theme, vote, modal, itemType, auth, open, addMention } = this.props;
    const { popup } = this.state;
    const user = {
      avatar: item.user_avatar,
      score: item.user_score,
      id: item.user_id,
      username: item.user_username,
      dpp: item.user_dpp,
    };
    // Used to determine if user owns this card.
    let isUser = false;
    if (auth.user) {
      isUser = auth.user.authToken.user_id === item.user_id;
    }
    let editable = false;
    if (isUser) {
      const seconds = Math.floor((new Date() - (item.created_time * 1000)) / 1000);
      const interval = seconds / 60;
      const maxEditLimit = item.user_dpp ? 30 : 5;
      if (interval <= maxEditLimit) {
        editable = true;
      }
    }
    // Item card is used for comments as well
    const isComment = typeof item.rant_id !== 'undefined';
    // If there is any image with this rant
    const image = item.attached_image || '';
    return (
      <div
        className={`item_card ${modal || isComment ? null : 'shadow'}`}
        id={item.id}
        style={{
          backgroundColor: theme.item_card.backgroundColor,
          color: theme.item_card.color,
          width: `${theme.column.width}px`,
        }}
      >
        <Popup
          {...popup}
          onPos={() => this.onDelete(false)}
          onNeg={() => this.setState({ popup: { ...this.state.popup, visible: false } })}
        />
        <UserBadge
          user={user}
          theme={theme}
          open={open}
        />
        <span
          className="timesince"
        >{timeSince(item.created_time * 1000)}</span>
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
            <Twemoji>
              <span
                className="body"
                dangerouslySetInnerHTML={{ __html: this.getContent() }}
              />
            </Twemoji>
            { this.renderCollab() }
          </div>
          { image !== '' ? <img alt="" src={image.url} /> : null }
        </div>
        {this.getTags()}
        <BottomBar
          item={item}
          vote={vote}
          isUser={isUser}
          editable={editable}
          copyToClip={() => this.copyLinkToClipboard()}
          modal={modal}
          type={isComment ? ITEM.COMMENT.NAME : ITEM.RANT.NAME}
          addMention={addMention}
          username={user.username}
          onCommentsClick={() => this.open()}
          onFavorite={bool => this.onFavorite(bool)}
          onSubscribe={bool => this.onSubscribe(bool)}
          onDelete={() => this.onDelete()}
          onEdit={() => this.props.onEdit(item.id, item.body)}
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
  showToast: PropTypes.func.isRequired,
  itemType: PropTypes.string,
  open: PropTypes.func,
  modal: PropTypes.bool,
  addMention: PropTypes.func,
  fetchitem: PropTypes.func,
  history: PropTypes.object,
};


export default ItemCard;
