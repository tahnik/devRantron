import React, { Component } from 'react';
import PropTypes from 'prop-types';
import rantscript from '../../consts/rantscript';
import Loading from '../utilities/loading';
import Column from '../columns/column';
import { ITEM, STATE } from '../../consts/types';

const DEFAULT_COLUMN = {
  itemType: ITEM.RANT.NAME,
  items: [],
  page: 0,
  state: STATE.INITIAL,
  filters: {
    SORT: {
      RANTS: 'Rants',
      COMMENTS: 'comments',
      FAVOURITES: 'Favourites',
      UPVOTED: 'Upvoted',
    },
    PRIMARY: 'SORT',
  },
};

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      column: DEFAULT_COLUMN,
    };
  }
  componentDidMount() {
    this.fetch();
  }
  fetch(sort = ITEM.RANT.NAME, range = null, id = 0, refresh = false) {
    const { item } = this.props;
    const { column } = this.state;
    const page = refresh ? 0 : column.page;
    console.log(item.id, null, sort.toLowerCase(), page * 30);
    rantscript.profile(item.id, null, sort.toLowerCase(), page * 30)
      .then((res) => {
        const nextColumn = DEFAULT_COLUMN;
        nextColumn.items = res.content.content.rants;
        nextColumn.page += 1;
        console.log(res);
        this.setState({
          user: res,
          column: nextColumn,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    if (!this.state.user) {
      return (
        <div className="modal">
          <Loading />
        </div>
      );
    }
    const { user } = this.state;
    let imageSource = 'res/images/invis.png';
    if (user.avatar.i) {
      imageSource = `https://avatars.devrant.io/${user.avatar.i.replace('c-1', 'c-3').replace('png', 'jpg')}`;
    }
    return (
      <div className="profile_container modal" >
        <div className="profile">
          <div className="image">
            <img src={imageSource} />
          </div>
          <div className="details">
            <div className="name_score">
              <span className="name">{user.username}</span>
              <span className="score">+{user.score}</span>
            </div>
            <div className="other_infos">
              <ul>
                { user.about !== '' && <li><i className="ion-person" /><p>{user.about}</p></li>}
                { user.location !== '' && <li><i className="ion-ios-location" /><p>{user.location}</p></li>}
                { user.github !== '' && <li><i className="ion-social-github" /><p>{user.github}</p></li>}
                { user.website !== '' && <li><i className="ion-earth" /><p>{user.website}</p></li>}
              </ul>
            </div>
          </div>
        </div>
        <div className="user_contents">
          <Column
            {...this.props}
            column={this.state.column}
            filters={this.state.column.filters}
            fetch={(sort, range, id, refresh) => this.fetch(sort, range, id, refresh)}
          />
        </div>
      </div>
    );
  }
}

UserProfile.propTypes = {
  item: PropTypes.object.isRequired,
};

export default UserProfile;
