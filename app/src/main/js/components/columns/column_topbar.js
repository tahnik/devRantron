import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { STATE } from '../../consts/types';

class ColumnTopBar extends Component {
  constructor() {
    super();
    this.state = {
      primary: null,
      secondary: null,
      translateY: 0,
    };
  }
  componentWillMount() {
    const { filters, id } = this.props;

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
    this.props.fetch(firstPri, firstSec, id);
  }
  componentDidMount() {
    const { divID } = this.props;
    const element = document.getElementById(divID);
    if (element) {
      element.addEventListener('scroll', () => this.handleScroll());
    }
  }
  componentWillUnmount() {
    const { divID } = this.props;
    const element = document.getElementById(divID);
    if (element) {
      element.removeEventListener('scroll', () => this.handleScroll());
    }
  }
  handleScroll() {
    const { divID, fetch, id } = this.props;
    const element = document.getElementById(divID);
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      fetch(this.state.primary, this.state.secondary, id);
    }
  }
  handlePri(primary) {
    const { id } = this.props;
    this.setState({ primary });
    this.props.fetch(primary, this.state.secondary, id);
  }
  handleSec(secondary) {
    const { id } = this.props;
    this.setState({ secondary });
    this.props.fetch(this.state.primary, secondary, id);
  }
  handleHover(primary) {
    const { filters } = this.props;
    if (!filters.HAS_SECONDARY) {
      return;
    }
    const hasSecondary = filters.HAS_SECONDARY[primary.toUpperCase()];
    if (primary === this.state.primary && hasSecondary) {
      this.setState({ translateY: -100 });
    }
  }
  handleHoverLeave() {
    if (this.state.translateY === -100) {
      this.setState({ translateY: 0 });
    }
  }
  render() {
    const { filters } = this.props;
    const primaryFilters = filters[filters.PRIMARY];

    const secondaryFilters = filters[filters.SECONDARY];
    return (
      <div
        className="column_topbar"
        onMouseLeave={() => this.handleHoverLeave()}
      >
        <div
          className="primary"
          style={{ transform: `translateY(${this.state.translateY}%)` }}
        >
          { Object.keys(primaryFilters).map((key) => {
            const isActive = this.state.primary === primaryFilters[key] ? 'active' : null;
            return (
              <span
                key={key}
                className={`${isActive}`}
                onClick={() => this.handlePri(primaryFilters[key])}
                onMouseOver={() => this.handleHover(primaryFilters[key])}
              >{primaryFilters[key]}</span>
            );
          })}
        </div>
        <div
          className="secondary"
          style={{ transform: `translateY(${this.state.translateY}%)` }}
        >
          { !secondaryFilters ? null :
            Object.keys(secondaryFilters).map((key) => {
              const isActive = this.state.secondary === secondaryFilters[key] ? 'active' : null;
              return (
                <span
                  key={key}
                  className={`${isActive}`}
                  onClick={() => this.handleSec(secondaryFilters[key])}
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
  id: PropTypes.string.isRequired,
};

export default ColumnTopBar;
