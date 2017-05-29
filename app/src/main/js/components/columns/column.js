import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemCard from '../item/item_card';
import Loading from '../utilities/loading';
import ColumnTopBar from './column_topbar';
import { getRandomInt } from '../../consts/DOMFunctions';

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
  render() {
    const { column, theme, vote, fetch, open, filters, itemType, removeColumn } = this.props;
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
        />
        <div className="items_container" id={divID}>
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
};

export default Column;
