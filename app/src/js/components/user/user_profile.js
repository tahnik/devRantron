import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Twemoji from 'react-twemoji';

import rantscript from '../../consts/rantscript';
import Loading from '../utilities/loading';
import Column from '../columns/column';
import Popup from '../utilities/popup';
import { ITEM, STATE } from '../../consts/types';
import { logout } from '../../consts/errors';

const { shell } = require('electron');

const USER_PROFILE_FILTERS = {
  SORT: {
    RANTS: 'rants',
    COMMENTS: 'comments',
    FAVOURITES: 'favorites',
    UPVOTED: 'upvoted',
  },
  PRIMARY: 'SORT',
};

const DEFAULT_COLUMN = {
  itemType: ITEM.RANT.NAME,
  items: [],
  page: 0,
  id: 'id',
  type: 'user_profile',
  state: STATE.SUCCESS,
  filters: USER_PROFILE_FILTERS,
  sort: USER_PROFILE_FILTERS.RANTS,
};

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      column: DEFAULT_COLUMN,
      loading: false,
      userNonExisting: false,
      popup: {
        visible: false,
        className: '',
        pos: logout.pos,
        neg: logout.neg,
        body: logout.body,
      },
    };
  }
  componentDidMount() {
    this.fetch();
  }
  shouldComponentUpdate(nextProps, nextState) {
    const nextLength = nextState.column.items.length;
    const currentLength = this.state.column.items.length;
    if (
      nextLength === currentLength
      && nextProps.item.id === this.props.item.id
      && nextState.userNonExisting === this.state.userNonExisting
      && (nextState.column.state !== STATE.LOADING && nextState.column.items.length !== 0)
      && (nextState.popup === this.state.popup)
    ) {
      return false;
    }
    return true;
  }
  componentDidUpdate(prevProps) {
    if (this.props.item.id !== prevProps.item.id) {
      /*
       * This works fine. Although not a good practice, as long as it is in a conditional loop
       * it can used without side effects
       */
      // eslint-disable-next-line
      this.setState({ loading: true });
      this.fetch();
    }
  }
  fetch(sort = USER_PROFILE_FILTERS.SORT.RANTS, range, id, refresh = false) {
    const { item, auth } = this.props;
    const prevColumn = Object.assign({}, this.state.column);
    prevColumn.state = STATE.LOADING;
    if (refresh || sort !== this.state.column.sort) {
      prevColumn.page = 0;
      prevColumn.items = [];
    }
    this.setState({ column: prevColumn });


    const { column } = this.state;
    const page = refresh || sort !== this.state.column.sort ? 0 : column.page;
    let token = null;
    if (auth.user) {
      token = auth.user.authToken;
    }
    rantscript.profile(item.id, token, sort, page * 30)
      .then((res) => {
        /**
         * If you clone the object, JS keeps directly modifies the the items of DEFAULT_COLUMN.
         * Which stays even after the component unmounts. So next time the component is mounting
         * it is showing the previous items.
         *
         * Bloody hell, JS. You're beautiful
         */
        const nextColumn = Object.assign({}, DEFAULT_COLUMN);
        nextColumn.page = this.state.column.page + 1;
        const nextItems = refresh || sort !== column.sort ? [] : [...column.items];
        nextColumn.items = [...nextItems, ...res.content.content[sort]];
        nextColumn.state = STATE.SUCCESS;
        nextColumn.sort = sort;
        if (sort === USER_PROFILE_FILTERS.SORT.COMMENTS) {
          nextColumn.itemType = ITEM.COMMENT.NAME;
        } else {
          nextColumn.itemType = ITEM.RANT.NAME;
        }
        this.setState({
          user: res,
          column: nextColumn,
          loading: false,
        });
      })
      .catch((err) => {
        this.setState({ userNonExisting: true });
        console.log(err);
      });
  }
  static openLink(url) {
    let fURL = url; if (
      url.indexOf('http://') === -1
      && url.indexOf('https://') === -1
    ) {
      fURL = `http://${url}`;
    }
    shell.openExternal(fURL);
  }
  onLogout(showConfirmPopup = true) {
    if (showConfirmPopup) {
      this.setState({ popup: { ...this.state.popup, className: '', visible: true } });
      return;
    }
    if (this.state.popup.visible) {
      this.setState({ popup: { ...this.state.popup, visible: false } });
    }
    this.props.close();
    this.props.logout();
  }
  render() {
    const { auth, theme, item } = this.props;
    const { user, loading, popup } = this.state;
    if (this.state.userNonExisting) {
      return (
        <div className="profile_container modal">
          <div className="no_user">
            No such user!
          </div>
        </div>
      );
    }
    if (!user || loading) {
      return (
        <div className="modal">
          <Loading />
        </div>
      );
    }
    const isLoggedInUser = auth.user.authToken.user_id === item.id;
    let imageSource = 'res/images/invis.png';
    if (user.avatar.i) {
      imageSource = `https://avatars.devrant.io/${user.avatar.i.replace('c-1', 'c-2').replace('png', 'jpg')}`;
    }
    return (
      <div className="profile_container modal" >
        <Popup
          {...popup}
          onPos={() => {
            this.setState({ popup: { ...this.state.popup, className: 'closeAnim' } });
            setTimeout(() => { this.onLogout(false); });
          }}
          onNeg={() => {
            this.setState({ popup: { ...this.state.popup, className: 'closeAnim' } });
            setTimeout(() => {
              this.setState({ popup: { ...this.state.popup, visible: false } });
            }, 300);
          }}
        />
        <div
          className="profile"
          style={{
            background: 'url(./res/images/profile_banner.png)',
            width: `${theme.column.width}px`,
          }}
        >
          {
            isLoggedInUser ?
              <div className="logout" onClick={() => { this.onLogout(true); }} >
                <i className="ion-log-out" />
              </div> : null
          }
          <div className="image">
            <img alt="" src={imageSource} style={{ backgroundColor: `#${user.avatar.b}` }} />
          </div>
          <div className="details">
            <div className="name_score">
              <span className="name">{user.username}</span>
              <span className="score">+{user.score}</span>
            </div>
            <Twemoji>
              <div className="other_infos">
                <ul>
                  { user.about !== '' && <li><i className="ion-person" />
                    <p>{user.about}</p>
                  </li>}
                  { user.skills !== '' && <li><i className="ion-code" />
                    <p>{user.skills}</p>
                  </li>}
                  { user.location !== '' && <li><i className="ion-ios-location" /><p>{user.location}</p></li>}
                  { user.github !== '' && <li style={{ cursor: 'pointer' }}><i className="ion-social-github" />
                    <p onClick={() => shell.openExternal(`https://www.github.com/${user.github}`)}>
                      {user.github}
                    </p>
                  </li>}
                  { user.website !== '' && <li style={{ cursor: 'pointer' }}><i className="ion-earth" />
                    <p onClick={() => UserProfile.openLink(user.website)}>
                      {user.website}
                    </p>
                  </li>}
                </ul>
              </div>
            </Twemoji>
          </div>
        </div>
        <div
          className="user_contents"
          style={{
            width: `${parseInt(theme.column.width, 10) + 20}px`,
          }}
        >
          <Column
            {...this.props}
            modal
            column={this.state.column}
            filters={this.state.column.filters}
            itemType={this.state.column.itemType}
            fetch={(sort, range, id, refresh) => this.fetch(sort, range, id, refresh)}
          />
        </div>
      </div>
    );
  }
}

UserProfile.propTypes = {
  item: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

export default UserProfile;
