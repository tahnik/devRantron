import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { STATE } from '../../consts/types';

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
    const sort = primaryFilters[firstIndex];
    this.setState({ active: sort });

    this.props.fetch(sort);
  }
  componentDidMount() {
    const { divID } = this.props;
    const element = document.getElementById(divID);
    element.addEventListener('scroll', () => this.handleScroll());
  }
  componentWillUnmount() {
    const { divID } = this.props;
    const element = document.getElementById(divID);
    element.removeEventListener('scroll', () => this.handleScroll());
  }
  handleScroll() {
    const { divID, fetch, state } = this.props;
    const element = document.getElementById(divID);
    if (
      element.scrollHeight - element.scrollTop === element.clientHeight
      && state !== STATE.LOADING
    ) {
      fetch(this.state.active);
    }
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
  divID: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
};

export default ColumnTopBar;
