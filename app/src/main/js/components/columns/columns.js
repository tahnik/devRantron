import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Column from './column';
import AddColumn from './column_add';
import { FEED } from '../../consts/types';

class Columns extends Component {
  render() {
    const { columns } = this.props;
    return (
      <div
        className="columns"
      >
        {
          columns.map((column) => {
            if (column.type === FEED.RANTS.NAME) {
              return <Column key={column.id} {...this.props} column={column} />;
            }
            return <Column key={column.id} {...this.props} column={column} />;
          })
        }
        <AddColumn addColumn={this.props.addColumn} />
      </div>
    );
  }
}

Columns.propTypes = {
  columns: PropTypes.array.isRequired,
  addColumn: PropTypes.func.isRequired,
};

export default Columns;
