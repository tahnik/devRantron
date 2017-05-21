import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Column from './column';

class Columns extends Component {
  render() {
    const { columns } = this.props;
    return (
      <div
        className="columns"
      >
        {
          columns.map(column => (
            <Column key={column.id} {...this.props} column={column} />
          ))
        }
      </div>
    );
  }
}

Columns.propTypes = {
  columns: PropTypes.array.isRequired,
};

export default Columns;
