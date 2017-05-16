import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RantCard from '../rant/rant_card';
import Loading from '../utilities/loading';

class Column extends Component {
  componentWillMount() {
    this.props.fetch();
  }
  render() {
    const { feed, theme, vote, fetch, open } = this.props;
    if (!feed.items) {
      return (
        <Loading />
      );
    }
    return (
      <div
        className="column"
      >
        <div className="items_container">
          {
            feed.items.map(item => (
              <RantCard
                fetch={fetch}
                item={item}
                open={(type, id) => open(type, id)}
                key={item.id} theme={theme} vote={vote}
              />
            ))
          }
        </div>
      </div>
    );
  }
}

Column.propTypes = {
  fetch: PropTypes.func.isRequired,
  feed: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  vote: PropTypes.func.isRequired,
  open: PropTypes.func.isRequired,
};

export default Column;
