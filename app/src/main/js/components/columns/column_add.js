import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddColumn extends Component {
  render() {
    return (
      <div
        className="add_column"
      >
        <button
          className="add_button"
          onClick={() => this.props.addColumn()}
        >
          <i className="ion-plus-round" />
        </button>
      </div>
    );
  }
}

AddColumn.propTypes = {
  addColumn: PropTypes.func.isRequired,
};

export default AddColumn;
