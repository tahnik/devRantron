import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Column from './column';
import AddColumn from './column_add';


class Columns extends Component {
  constructor() {
    super();
    this.state = {
      maxCol: 1,
    };
  }
  componentDidMount() {
    this.handleResize();
    this.listener = () => {
      this.handleResize();
    };
    window.addEventListener('resize', this.listener);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.listener);
  }
  handleResize() {
    const maxCol = this.checkSpaceLeft();
    if (maxCol !== this.state.maxCol) {
      this.setState({ maxCol });
    }
  }
  checkSpaceLeft() {
    const { theme } = this.props;
    const middleContainer = document.getElementById('middle_container');
    if (middleContainer) {
      const middleWidth = middleContainer.offsetWidth;
      const nextColumnWidth = parseInt(theme.column.width, 10);
      return Math.floor(middleWidth / nextColumnWidth);
    }
    return 1;
  }
  render() {
    const { columns } = this.props;
    return (
      <div
        className="columns"
        id="columns"
      >
        <CSSTransitionGroup
          transitionName="fade_item"
          transitionEnterTimeout={250}
          transitionLeaveTimeout={150}
          className="custom_columns"
          id="custom_columns"
        >
          {
            columns.map((column, index) => {
              if (index < this.state.maxCol) {
                return (
                  <Column
                    key={column.id}
                    {...this.props}
                    column={column}
                    filters={column.filters}
                    itemType={column.itemType}
                  />
                );
              }
              return null;
            })
          }
        </CSSTransitionGroup>
        <AddColumn addColumn={this.props.addColumn} theme={this.props.theme} />
      </div>
    );
  }
}

Columns.propTypes = {
  columns: PropTypes.array.isRequired,
  addColumn: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

export default Columns;
