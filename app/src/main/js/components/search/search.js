/**
 * Searches devRant
 * Uses reusable column
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import rantscript from '../../consts/rantscript';
import Column from '../columns/column';
import { ITEM, STATE, SEARCH_FILTERS } from '../../consts/types';


const DEFAULT_COLUMN = {
  itemType: ITEM.RANT.NAME,
  items: [],
  page: 0,
  id: 'id',
  type: 'user_profile',
  state: STATE.SUCCESS,
  filters: SEARCH_FILTERS,
  sort: SEARCH_FILTERS.SORT.RECENT,
};

class Comments extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: '',
      column: DEFAULT_COLUMN,
      searched: false,
      freqTerms: [],
    };
  }
  onKeyDown(e) {
    if (e.keyCode === 13) {
      this.onSearch();
    }
  }
  onSearch() {
    this.setState({ searched: true });
    const term = this.state.searchTerm;
    const prevColumn = Object.assign({}, DEFAULT_COLUMN);
    prevColumn.state = STATE.LOADING;
    prevColumn.page = 0;
    prevColumn.items = [];
    this.setState({ column: prevColumn });
    rantscript.search(term)
    .then((res) => {
      const nextColumn = Object.assign({}, DEFAULT_COLUMN);
      nextColumn.items = res;
      nextColumn.state = STATE.SUCCESS;
      nextColumn.page = 0;
      nextColumn.itemType = ITEM.RANT.NAME;
      this.setState({ column: nextColumn });
    });
  }
  render() {
    const { theme } = this.props;
    return (
      <div className="search_container">
        <div className="search">
          <input
            onKeyDown={e => this.onKeyDown(e)}
            placeholder="&#xf2f5;&nbsp;Search"
            onChange={e => this.setState({ searchTerm: e.target.value })}
            value={this.state.searchTerm}
            style={{ width: `${theme.column.width}px` }}
          />
        </div>
        { this.state.searched ?
          <Column
            {...this.props}
            column={this.state.column}
            filters={this.state.column.filters}
            itemType={this.state.column.itemType}
            fetch={() => { }}
          />
          :
          null
        }
      </div>
    );
  }
}

Comments.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default Comments;
