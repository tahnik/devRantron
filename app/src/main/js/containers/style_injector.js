import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeStyle } from '../actions/styles';


let theme = null;

/* Ignore esling error for now. More stuff will be added later */
class StyleInjector extends Component {
  render() {
    if (theme !== this.props.style) {
      const cl = document.querySelector('body').classList;
      cl.remove(theme);
      cl.add(this.props.style);
      theme = this.props.style;
    }

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
