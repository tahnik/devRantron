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
      expanded: false,
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
    this.expand();
    this.props.fetch(column.sort, column.range, column.id, true, column.itemType, week);
    this.setState({ selection: weeks.length - week });
  }
  expand() {
    this.setState({ expanded: !this.state.expanded });
  }
  render() {
    const { weeks, selection, expanded } = this.state;
    const { theme } = this.props;

    return (
      <div className="weekly_container">
        <div
          className="weekly_selection"
          onClick={() => this.expand()}
          style={{
            width: `${theme.column.width}px`,
          }}
        >
          <div className="weekly_option">
            <div className="weekDesc">
              {weeks.length !== 0 ? (<span><b>wk{weeks[selection].week}</b> {weeks[selection].prompt}</span>) : 'Loading weeks...'}
            </div>
            <i className={`selBtn ${expanded ? 'ion-chevron-up' : 'ion-chevron-down'}`} />
          </div>
        </div>
        {weeks.length !== 0 && expanded ? (
          <div className="weekly_expand">
            {weeks.map(week =>
              (
                <div
                  key={week.week}
                  className={`weekly_selection ${selection} ${week.week}`}
                  onClick={() => this.onClick(week.week)}
                  style={{
                    width: `${theme.column.width}px`,
                  }}
                >
                  <div className={'weekly_option'}>
                    <div className="weekDesc"><b>{`wk${week.week}`}</b> {`${week.prompt}`}</div>
                  </div>
                </div>
              ),
            )}
          </div>
        ) : (<div />)}

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
