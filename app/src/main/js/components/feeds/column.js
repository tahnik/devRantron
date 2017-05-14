import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RantCard from '../rant/rant_card';

class Column extends Component {
  componentWillMount() {
    this.props.fetch();
  }
  render() {
    const { feed, theme, vote, fetchItem } = this.props;
    return (
      <div
        className="column"
        style={{ backgroundColor: theme.column.backgroundColor }}
      >
        {
          feed.items ?
          feed.items.map(item => (
            <RantCard
              fetchItem={fetchItem}
              item={item}
              key={item.id} theme={theme} vote={vote}
            />
          ))
          :
          <div>
            Loading...
          </div>
        }
      </div>
    );
  }
}

Column.propTypes = {
  fetch: PropTypes.func.isRequired,
  feed: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  vote: PropTypes.func.isRequired,
  fetchItem: PropTypes.func.isRequired,
};

export default Column;
