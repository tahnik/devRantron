import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Column from './column';

class Columns extends Component {
  renderSingleColumn() {
    const { columns } = this.props;
    return <Column {...this.props} column={columns[0]} />;
  }
  render() {
    const { columns } = this.props;
    return (
      <div
        className="columns"
      >
        {
          columns.length !== 1 ? null : this.renderSingleColumn()
        }
      </div>
    );
  }
}

Columns.propTypes = {
  columns: PropTypes.array.isRequired,
};

export default Columns;
