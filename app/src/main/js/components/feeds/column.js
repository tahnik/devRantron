import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RantCard from '../rant/rant_card';
import Loading from '../utilities/loading';
import Modal from '../modal/modal';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

class Column extends Component {
  constructor() {
    super();
    this.state = {
      item: null,
    };
  }
  componentWillMount() {
    this.props.fetch();
  }
  open(type, id) {
    this.setState({ item: { id, type } });
  }
  close() {
    this.setState({ item: null });
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
        <CSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={200}
        >
          { this.state.item ? <Modal
            item={this.state.item}
            theme={theme}
            vote={vote}
            close={() => this.close()}
          /> : null }
        </CSSTransitionGroup>
        <div className="items_container">
          {
            feed.items.map(item => (
              <RantCard
                fetch={fetch}
                item={item}
                open={(type, id) => this.open(type, id)}
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
};

export default Column;
