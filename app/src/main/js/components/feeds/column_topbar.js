import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { STATE } from '../../consts/types';

class ColumnTopBar extends Component {
  constructor() {
    super();
    this.state = {
      primary: null,
      secondary: null,
    };
  }
  componentWillMount() {
    const { filters } = this.props;

    const primaryFilters = filters[filters.PRIMARY];
    const firstPriIndex = Object.keys(primaryFilters)[0];
    const firstPri = primaryFilters[firstPriIndex];
    this.setState({ primary: firstPri });

    let firstSec = null;
    if (filters.SECONDARY) {
      const secondaryFilters = filters[filters.SECONDARY];
      const firstSecIndex = Object.keys(secondaryFilters)[0];
      firstSec = secondaryFilters[firstSecIndex];
      this.setState({ secondary: firstSec });
    }

    this.props.fetch(firstPri, firstSec);
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
      fetch(this.state.primary, this.state.secondary);
    }
  }
  handlePri(primary) {
    this.setState({ primary });
    this.props.fetch(primary, this.state.secondary);
  }
  render() {
    const { filters } = this.props;
    const primaryFilters = filters[filters.PRIMARY];

    const secondaryFilters = filters[filters.SECONDARY];
    return (
      <div className="column_topbar">
        <div className="primary">
          { Object.keys(primaryFilters).map((key) => {
            const isActive = this.state.primary === primaryFilters[key] ? 'active' : null;
            return (
              <span
                key={key}
                className={`${isActive}`}
                onClick={() => this.handlePri(primaryFilters[key])}
              >{primaryFilters[key]}</span>
            );
          })}
        </div>
        <div className="secondary">
          { Object.keys(secondaryFilters).map((key) => {
            const isActive = this.state.secondary === secondaryFilters[key] ? 'active' : null;
            return (
              <span
                key={key}
                className={`${isActive}`}
                onClick={() => this.handlePri(secondaryFilters[key])}
              >{secondaryFilters[key]}</span>
            );
          })}
        </div>
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
