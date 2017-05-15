import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RantCard from '../rant/rant_card';
import Loading from '../utilities/loading';

class Column extends Component {
  componentWillMount() {
    this.props.fetch();
  }
  render() {
    const { feed, theme, vote, fetch } = this.props;
    if (!feed.items) {
      return (
        <Loading />
      );
    }
    return (
      <div
        className="column"
        style={{ backgroundColor: theme.column.backgroundColor }}
      >
        {
          feed.items.map(item => (
            <RantCard
              fetch={fetch}
              item={item}
              key={item.id} theme={theme} vote={vote}
            />
          ))
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
};

export default Column;
