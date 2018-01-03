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
  frequentTerms: [],
};

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: '',
      column: DEFAULT_COLUMN,
      searched: false,
      freqTerms: [],
    };
  }
  componentDidMount() {
    const term = this.props.match.params.term;
    if (term !== 'Cw0DCAAHDAcOBg8MBAIDAA') {
      this.onSearch(term);
      /**
       * It's under a if condition so settings a state during componentDidMount is fine
       */
      // eslint-disable-next-line
      this.setState({ searchTerm: term });
      return;
    }
    const randMin = 25;
    const randMax = 40;
    rantscript.getFrequentSearchTerms()
      .then((res) => {
        const freqTerms = [];
        this.props.search.forEach((element) => {
          if (element !== '') {
            freqTerms.push({
              name: element,
              flex: Math.floor((Math.random() * ((randMax - randMin) + 1)) + randMin),
            });
          }
        });
        res.forEach((element) => {
          freqTerms.push({
            name: element,
            flex: Math.floor((Math.random() * ((randMax - randMin) + 1)) + randMin),
          });
        });
        this.setState({ freqTerms });
      });
  }
  onKeyDown(e) {
    if (e.keyCode === 13) {
      this.onSearch();
    }
  }
  onSearch(givenTerm = null) {
    if (this.state.searchTerm === '' && !givenTerm) {
      return;
    }
    this.props.addToFreqTerms(this.state.searchTerm);
    this.setState({ searched: true });
    const term = givenTerm || this.state.searchTerm;
    const prevColumn = Object.assign({}, DEFAULT_COLUMN);
    prevColumn.state = STATE.LOADING;
    prevColumn.page = 0;
    prevColumn.items = [];
    this.setState({ column: prevColumn });
    rantscript.search(term)
      .then((res) => {
        const nextColumn = Object.assign({}, DEFAULT_COLUMN);
        nextColumn.items = res.slice(0, 100);
        nextColumn.state = STATE.SUCCESS;
        nextColumn.page = 0;
        nextColumn.itemType = ITEM.RANT.NAME;
        this.setState({ column: nextColumn });
      });
  }
  render() {
    const { theme } = this.props;
    return (
      <div
        className="search_container"
        style={{ color: theme.item_card.color }}
      >
        <div className="search">
          <i className="ion-android-search" />
          <input
            onKeyDown={e => this.onKeyDown(e)}
            placeholder="Search Term or Username"
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
            fetch={(a, b, c, refresh) => { if (refresh) { this.onSearch(); } }}
          />
          :
          <div className="frequent_terms">
            {
              this.state.freqTerms.map(term => (
                <div
                  key={term.name}
                  className="term"
                  onClick={() => this.onSearch(term.name)}
                  style={{
                      flex: `0 1 ${term.flex}%`,
                      transform: term.flex > 31 ? 'scale(0.9)' : 'scale(1.1)',
                    }}
                >{term.name}
                </div>
                ))
            }
          </div>
        }
      </div>
    );
  }
}

Search.propTypes = {
  theme: PropTypes.object.isRequired,
  addToFreqTerms: PropTypes.func.isRequired,
  search: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
};

export default Search;
