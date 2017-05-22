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
    const divID = `column_${this.props.feed.type}_${getRandomInt()}`;
    this.setState({ divID });
  }
  render() {
    const { feed, theme, vote, fetch, open, filters, itemType } = this.props;
    const { divID } = this.state;
    return (
      <div
        className="column"
        style={{ width: `${theme.column.width}rem` }}
      >
        <ColumnTopBar
          filters={filters}
          fetch={fetch}
          divID={divID}
          state={feed.state}
        />
        <div className="items_container" id={divID}>
          {
            feed.items.length === 0 ?
              <Loading
                backgroundColor={theme.backgroundColor}
              /> :
              feed.items.map(item => (
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
  feed: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  vote: PropTypes.func.isRequired,
  open: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  itemType: PropTypes.string.isRequired,
};

export default Column;
