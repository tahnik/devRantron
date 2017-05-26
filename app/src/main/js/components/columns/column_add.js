import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FEED } from '../../consts/types';

const defaultState = {
  active: false,
  addTheme: {
    opacity: 0.5,
    backgroundColor: 'grey',
  },
  itemsHolder: {
    width: 0,
    overflow: 'hidden',
    display: 'flex',
  },
};

class AddColumn extends Component {
  constructor() {
    super();
    this.state = defaultState;
  }
  addColumn(type) {
    const { theme } = this.props;
    const middleContainer = document.getElementById('middle_container');
    const columns = document.getElementById('columns');
    if (middleContainer && columns) {
      const middleWidth = middleContainer.offsetWidth;
      const columnsWidth = columns.offsetWidth;
      const nextColumnsWidth = columnsWidth + parseInt(theme.column.width, 10);
      if (nextColumnsWidth < middleWidth) {
        this.props.addColumn(type);
      }
    }
  }
  makeAddActive() {
    const addTheme = {
      opacity: 1,
      backgroundColor: '#C14857',
    };
    this.setState({ addTheme });
  }
  toggleItems() {
    const itemsHolder = {
      width: '100%',
    };
    if (this.state.active) {
      this.setState(defaultState);
    } else {
      this.setState({ active: true, itemsHolder });
    }
  }
  render() {
    let activeIcon = 'ion-plus-round';
    if (this.state.active) {
      activeIcon = 'ion-chevron-right';
    }
    return (
      <div
        className="add_column"
      >
        <div style={this.state.itemsHolder} className="items_holder">
          {
            Object.keys(FEED).map(key => (
              <button
                className="add_button"
                onClick={() => this.addColumn(FEED[key].NAME)}
                key={key}
              >
                { FEED[key].NAME }
              </button>
              ))
          }
        </div>
        <button
          className="add_button"
          onMouseEnter={() => this.makeAddActive()}
          onClick={() => this.toggleItems()}
          style={this.state.addTheme}
        >
          <i className={activeIcon} />
        </button>
      </div>
    );
  }
}

AddColumn.propTypes = {
  addColumn: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

export default AddColumn;
