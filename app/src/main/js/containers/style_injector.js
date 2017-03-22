import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeStyle } from '../actions/style_actions';

let theme = null;

/* Ignore esling error for now. More stuff will be added later */
class StyleInjector extends Component {
  render() {
    if (theme) {
      theme.unuse();
    }
    // eslint-disable-next-line
    theme = require(`../../res/css/${this.props.style}.sass`);
    theme.use();
    return (
      <div />
    );
  }
}

StyleInjector.propTypes = {
  style: React.PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    style: state.style,
  };
}

export default connect(mapStateToProps, { changeStyle })(StyleInjector);
