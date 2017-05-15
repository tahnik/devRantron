import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RantCard from './rant_card';
import Loading from '../utilities/loading';

class Rant extends Component {
  constructor() {
    super();
    this.state = {
      mainWidth: 0,
    };
  }
  componentWillMount() {
    window.addEventListener('resize', () => {
      const middleContainer = document.getElementById('middle_container');
      if (middleContainer) {
        this.setState({ middleWidth: middleContainer.offsetWidth });
      }
    }, false);
  }
  renderSingleColumn() {
    const { item, theme, vote } = this.props;
    return (
      <div className="rant_compact_container">
        <RantCard
          modal
          item={item.rant}
          key={item.id} theme={theme} vote={vote}
        />
      </div>
    );
  }
  render() {
    return (
      <div className="rant_container modal">
        { this.renderSingleColumn() }
      </div>
    );
  }
}

Rant.propTypes = {
  item: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  vote: PropTypes.func.isRequired,
};

export default Rant;
