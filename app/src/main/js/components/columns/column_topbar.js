/**
 * This is part of the reusable column
 * Top bar has some major functionalities.
 * It controls the filters (top, algo, day, week)
 * It also fetches new item when the column scrolls to end
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FILTERS, STATE } from '../../consts/types';

class ColumnTopBar extends Component {
  constructor() {
    super();
    this.state = {
      primary: null,
      secondary: null,
      translateY: 0,
    };
  }
  /**
   * Sets the corret filters when the component mounts
   *
   * @memberof ColumnTopBar
   */
  componentWillMount() {
    const { filters, fetchAfterMount } = this.props;

    const firstPri = this.getFilter(filters.PRIMARY);
    this.setState({ primary: firstPri });

    const firstSec = this.getFilter(filters.SECONDARY);
    if (firstSec) {
      this.setState({ secondary: firstSec });
    }
    if (fetchAfterMount) {
      this.fetch(firstPri, firstSec);
    }
  }
  /**
   * When the component mounts, it attaches a event handler for the column
   * which listens to the scroll events.
   *
   * @memberof ColumnTopBar
   */
  componentDidMount() {
    const { divID } = this.props;
    const element = document.getElementById(divID);
    if (element) {
      element.addEventListener('scroll', () => this.handleScroll());
    }
  }
  /**
   * Make sure to remove the event handler
   *
   * @memberof ColumnTopBar
   */
  componentWillUnmount() {
    const { divID } = this.props;
    const element = document.getElementById(divID);
    if (element) {
      element.removeEventListener('scroll', () => this.handleScroll());
    }
  }
  /**
   * Gets the correct primary and secondary filters
   *
   * @param {string} type
   * @returns {string} correct filter
   * @memberof ColumnTopBar
   */
  getFilter(type) {
    const { filters, sort, range } = this.props;
    // Get the options from the given filter type i.e. algo, top and recent
    const options = filters[type];
    if (options) {
      /**
       * sort and range is previously selected options.
       * if they are undefined, it means that the column is being mounted for the first time
       */
      if (typeof sort !== 'undefined' && sort) {
        if (options[sort.toUpperCase()]) {
          /**
           * This means that we've found out previously selected 'sort' in the given filter type.
           * let's return it
           */
          return sort;
        }
      }
      if (typeof range !== 'undefined' && range) {
        if (options[range.toUpperCase()]) {
          /**
           * This means that we've found out previously selected 'range' in the given filter type.
           * let's return it
           */
          return range;
        }
      }

      /**
       * If we have come this far, this means that the column is being mounted for the first time
       * Let's return the first option from the options
       * For example, if it's algo, recent and top, we are going to return algo
       */

      return options[Object.keys(options)[0]];
    }
    return null;
  }
  /**
   * Fetches more items for the column
   * Calls redux actions
   *
   * @param {any} primary primary filter, most of the time it's sort (top, algo)
   * @param {any} secondary secondary filter, commonly range (day, week)
   * @param {boolean} [refresh=false] if the column should be reset
   * @memberof ColumnTopBar
   */
  fetch(primary, secondary, refresh = false) {
    const { id, type, filters } = this.props;
    if (filters.PRIMARY === FILTERS.SORT) {
      this.props.fetch(primary, secondary, id, refresh, type);
    } else {
      this.props.fetch(secondary, primary, id, refresh, type);
    }
  }
  /**
   * Calls fetch when the column scrolls to end
   *
   * @memberof ColumnTopBar
   */
  handleScroll() {
    const { divID, state } = this.props;
    const element = document.getElementById(divID);
    if (
      element.scrollHeight - element.scrollTop < element.clientHeight + 4000
      && state !== STATE.LOADING
    ) {
      this.fetch(this.state.primary, this.state.secondary);
    }
  }
  /**
   * Refreshes(resets) the column
   *
   * @memberof ColumnTopBar
   */
  refresh() {
    this.fetch(this.state.primary, this.state.secondary, true);
  }
  /**
   * Removes the column.
   * Only used in custom column
   *
   * @memberof ColumnTopBar
   */
  remove() {
    this.props.removeColumn(this.props.id);
  }
  /**
   * Click handler for primary filter
   *
   * @param {string} primary primary filter
   * @memberof ColumnTopBar
   */
  handlePri(primary) {
    this.setState({ primary });
    this.fetch(primary, this.state.secondary);
  }
  /**
   * Click handler for secondary filter
   *
   * @param {any} secondary secondary filter
   * @memberof ColumnTopBar
   */
  handleSec(secondary) {
    this.setState({ secondary });
    this.fetch(this.state.primary, secondary);
  }
  /**
   * If the primary filters have some secondary filters
   * hovering over them make the secondary filters visible
   *
   * @param {string} primary primary filter
   * @memberof ColumnTopBar
   */
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
  /**
   * Hides the secondary filters when user moves mouse from primary filters
   *
   * @memberof ColumnTopBar
   */
  handleHoverLeave() {
    if (this.state.translateY === -100) {
      this.setState({ translateY: 0 });
    }
  }
  render() {
    const { filters, removeColumn, theme } = this.props;
    const primaryFilters = filters[filters.PRIMARY];

    const secondaryFilters = filters[filters.SECONDARY];
    return (
      <div
        className="column_topbar"
        onMouseLeave={() => this.handleHoverLeave()}
        style={{ width: `${theme.column.width}px` }}
      >
        <div className="left_navs">
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
        <div className="right_navs">
          <span>
            <i onClick={() => this.refresh()} className="ion-refresh" />
          </span>
          {
            removeColumn ?
              <span>
                <i onClick={() => this.remove()} className="ion-close-round" />
              </span> : null
          }
        </div>
      </div>
    );
  }
}

ColumnTopBar.propTypes = {
  filters: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  fetch: PropTypes.func.isRequired,
  removeColumn: PropTypes.func,
  divID: PropTypes.string.isRequired,
  sort: PropTypes.string,
  range: PropTypes.string,
  id: PropTypes.string.isRequired,
  fetchAfterMount: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
};

export default ColumnTopBar;
