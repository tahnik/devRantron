import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ColumnTopBar extends Component {
  constructor() {
    super();
    this.state = {
      active: null,
    };
  }
  componentWillMount() {
    const { filters } = this.props;
    const primaryFilters = filters.PRIMARY;
    const firstIndex = Object.keys(primaryFilters)[0];
    const firstItem = primaryFilters[firstIndex];
    this.setState({ active: firstItem });

    this.props.fetch(firstItem);
  }
  handleClick(sort) {
    this.setState({ active: sort });
    this.props.fetch(sort);
  }
  render() {
    const { filters } = this.props;
    const primaryFilters = filters.PRIMARY;
    return (
      <div className="column_topbar">
        { Object.keys(primaryFilters).map((key) => {
          const isActive = this.state.active === primaryFilters[key] ? 'active' : null;
          return (
            <span
              key={key}
              className={`${isActive}`}
              onClick={() => this.handleClick(primaryFilters[key])}
            >{primaryFilters[key]}</span>
          );
        })}
      </div>
    );
  }
}

ColumnTopBar.propTypes = {
  filters: PropTypes.object.isRequired,
  fetch: PropTypes.func.isRequired,
};

export default ColumnTopBar;
