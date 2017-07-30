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
  componentWillMount() {
    const divID = `column_${this.props.column.type}_${getRandomInt()}`;
    this.setState({ divID });
  }
  componentDidMount() {
    const scrollHeight = this.props.column.scrollHeight;
    if (typeof scrollHeight !== 'undefined') {
      this.itemsContainer.scrollTop = scrollHeight;
    }
  }
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
  removeColumn: PropTypes.func, // eslint-disable-line
  filters: PropTypes.object.isRequired,
  itemType: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  updateScrollHeight: PropTypes.func, //eslint-disable-line
};

export default Column;
