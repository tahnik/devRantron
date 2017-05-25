import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddColumn extends Component {
  addColumn() {
    const { theme } = this.props;
    const middleContainer = document.getElementById('middle_container');
    const columns = document.getElementById('columns');
    if (middleContainer && columns) {
      const middleWidth = middleContainer.offsetWidth;
      const columnsWidth = columns.offsetWidth;
      const nextColumnsWidth = columnsWidth + parseInt(theme.column.width, 10);
      if (nextColumnsWidth < middleWidth) {
        this.props.addColumn();
      }
    }
  }
  render() {
    return (
      <div
        className="add_column"
      >
        <button
          className="add_button"
          onClick={() => this.addColumn()}
        >
          <i className="ion-plus-round" />
        </button>
      </div>
    );
  }
}

AddColumn.propTypes = {
  addColumn: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

export default AddColumn;
