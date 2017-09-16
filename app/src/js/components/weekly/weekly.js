import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Column from '../columns/column';
import rantscript from '../../consts/rantscript';

class Weekly extends Component {
  constructor() {
    super();
    this.state = {
      weeks: [],
      selection: 0,
    };
  }
  componentDidMount() {
    rantscript.listWeekly()
      .then((res) => {
        this.setState({ weeks: res });
      });
  }
  onClick(week = 67) {
    const { column } = this.props;
    const { weeks } = this.state;
    this.props.fetch(column.sort, column.range, column.id, true, column.itemType, week);
    this.setState({ selection: weeks.length - week });
  }
  render() {
    const { weeks, selection } = this.state;
    const { theme } = this.props;
    let selectionText = 'Loading...';
    if (weeks.length !== 0) {
      selectionText = `wk${weeks[selection].week}: ${weeks[selection].prompt}`;
    }
    return (
      <div className="weekly_container">
        <div
          className="weekly_selection"
          style={{
            width: `${theme.column.width}px`,
          }}
        >
          <div
            className="weekly_option"
            onClick={() => this.onClick(67)}
          >{selectionText}</div>
        </div>
        <Column {...this.props} />
      </div>
    );
  }
}

Weekly.propTypes = {
  fetch: PropTypes.func.isRequired,
  column: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default Weekly;
