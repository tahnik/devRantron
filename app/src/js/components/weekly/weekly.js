import React, { Component } from 'react';
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
          <div className="weekly_option">{selectionText}</div>
        </div>
        <Column {...this.props} />
      </div>
    );
  }
}

export default Weekly;
