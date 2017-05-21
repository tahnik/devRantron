import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Column from './column';

class Columns extends Component {
  renderSingleColumn() {
    const { columns, theme, vote, fetch, open, filters, itemType } = this.props;
    return <Column column={columns[0]} theme={theme} vote={vote} filters={filters} itemType={itemType} fetch={fetch} open={open} />
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
  fetch: PropTypes.func.isRequired,
  columns: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired,
  vote: PropTypes.func.isRequired,
  open: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  itemType: PropTypes.string.isRequired,
};

export default Columns;
