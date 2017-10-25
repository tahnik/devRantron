import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Twemoji from 'react-twemoji';
import { timeSince } from '../../consts/utils';
import UserBadge from '../user/user_badge';

class Theme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Hel: '',
    };
  }
  render() {
    const { theme } = this.props;
    const image = 'https://maxcdn.icons8.com/Share/icon/Operating_Systems//linux1600.png';
    const text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
    const user = {
      avatar: { b: '2a8b9d', i: 'v-18_c-3_b-4_g-m_9-2_1-4_16-15_3-2_8-4_7-4_5-3_12-4_6-10_10-9_2-39_15-18_11-4_18-4_4-3_19-1_20-14_21-1.jpg' }, score: 37714, id: 42079, username: 'tahnik', dpp: 1,
    };
    return (
      <div className="theme_container">
        <div
          className="item_card shadow"
          style={{
            backgroundColor: theme.item_card.backgroundColor,
            color: theme.item_card.color,
            width: `${theme.column.width}px`,
          }}
        >
          <UserBadge
            user={user}
            theme={theme}
          />
          <span
            className="timesince"
          >{timeSince(1000)}
          </span>
          <div
            className="body_container"
          >
            <div
              className="top_container"
            >
              <Twemoji>
                <span
                  className="body"
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              </Twemoji>
            </div>
            { image !== '' ? <img alt="" src={image.url} /> : null }
          </div>
          {
            <div className="tags">
              <span />
            </div>
          }
        </div>
      </div>
    );
  }
}

Theme.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default Theme;
