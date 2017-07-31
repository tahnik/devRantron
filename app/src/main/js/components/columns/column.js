/**
 * The great reusable column
 * This is used in every feed, user profile and custom columns
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemCard from '../item/item_card';
import Loading from '../utilities/loading';
import ColumnTopBar from './column_topbar';
import { getRandomInt } from '../../consts/utils';

class Column extends Component {
  constructor() {
    super();
    this.state = {
      divID: null,
    };
  }
  /**
   * Gives the column an ID
   * This is used to handle scroll events in the column_topbar
   * TODO: use ref instead
   *
   * @memberof Column
   */
  componentWillMount() {
    const divID = `column_${this.props.column.type}_${getRandomInt()}`;
    this.setState({ divID });
  }
  /**
   * Restores the scroll position.
   * Only used in custom column
   *
   * @memberof Column
   */
  componentDidMount() {
    const scrollHeight = this.props.column.scrollHeight;
    if (typeof scrollHeight !== 'undefined') {
      this.itemsContainer.scrollTop = scrollHeight;
    }
  }
  /**
   * Don't update the column if there's not new item
   *
   * @param {object} nextProps props to arrive next
   * @memberof Column
   */
  shouldComponentUpdate(nextProps) {
    const currentColumn = this.props.column;
    const nextColumn = nextProps.column;
    if (currentColumn) {
      if (
        currentColumn.page === nextColumn.page
        && nextColumn.items.length !== 0
        && currentColumn.state === nextColumn.state
      ) {
        return false;
      }
    }
    return true;
  }
  /**
   * Saves the scroll height when the column unmounts
   * Only used in custom column
   *
   * @memberof Column
   */
  componentWillUnmount() {
    const { updateScrollHeight } = this.props;
    if (typeof updateScrollHeight !== 'undefined') {
      updateScrollHeight(this.props.column.id, this.itemsContainer.scrollTop);
    }
  }
  render() {
    const {
      column, theme, vote, fetch, open, filters, itemType, removeColumn, auth } = this.props;
    const { divID } = this.state;
    return (
      <div
        className="column"
        style={{ width: `${theme.column.width}px` }}
      >
        <ColumnTopBar
          filters={filters}
          fetch={fetch}
          id={column.id}
          divID={divID}
          fetchAfterMount={column.items.length === 0}
          type={column.type}
          state={column.state}
          removeColumn={removeColumn}
          sort={column.sort}
          range={column.range}
        />
        <div
          className="items_container"
          id={divID}
          ref={(node) => { this.itemsContainer = node; }}
        >
          {
            column.items.length === 0 ?
              <Loading
                backgroundColor={theme.backgroundColor}
              /> :
              column.items.map(item => (
                <ItemCard
                  fetch={fetch}
                  item={item}
                  open={(type, id) => open(type, id)}
                  key={item.id}
                  theme={theme}
                  vote={vote}
                  itemType={itemType}
                  auth={auth}
                />
                ))
          }
        </div>
      </div>
    );
  }
}

Column.propTypes = {
  fetch: PropTypes.func.isRequired,
  column: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  vote: PropTypes.func.isRequired,
  open: PropTypes.func.isRequired,
  removeColumn: PropTypes.func,
  filters: PropTypes.object.isRequired,
  itemType: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  updateScrollHeight: PropTypes.func,
};

export default Column;
