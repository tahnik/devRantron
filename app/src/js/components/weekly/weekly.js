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
  componentWillMount() {
    const regex = /(#?)wk(\d{0,3})/;
    const weekString = this.props.match.params.week;
    let week = -1;
    if (regex.test(weekString)) {
      const { column } = this.props;
      week = weekString.replace(/^\D+/g, '');
      this.props.fetch(column.sort, column.range, column.id, true, this.props.itemType, week);
    }
    rantscript.listWeekly()
      .then((res) => {
        this.setState({ weeks: res });
        this.setState({ selection: res.length - (week === -1 ? res.length : week) });
      });
  }
  onClick(week = 67) {
    const { column } = this.props;
    const { weeks } = this.state;
    this.expand();
    this.props.fetch(column.sort, column.range, column.id, true, this.props.itemType, week);
    this.setState({ selection: weeks.length - week });
  }
  fetch(sort, range, id = 0, refresh = false, itemType) {
    const { weeks } = this.state;
    this.props.fetch(sort, range, id, refresh, itemType, weeks.length - this.state.selection);
  }
  expand() {
    this.setState({ expanded: !this.state.expanded });
  }
  render() {
    const { weeks, selection, expanded } = this.state;
    const { theme } = this.props;
    const selectedWeek = weeks[selection] || weeks[weeks.length - 1];

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
              {weeks.length !== 0 ?
                (<span><b>wk{selectedWeek.week}</b> {selectedWeek.prompt}</span>)
                : 'Loading weeks...'
              }
            </div>
            <i className={`selBtn ${expanded ? 'ion-chevron-up' : 'ion-chevron-down'}`} />
          </div>
        </div>

        <div className={`weekly_expand ${expanded && expanded ? 'active' : ''}`}>
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

        <Column
          {...this.props}
          fetch={
            (sort, range, id, refresh, itemType) => this.fetch(sort, range, id, refresh, itemType)
          }
        />
      </div>
    );
  }
}

Weekly.propTypes = {
  fetch: PropTypes.func.isRequired,
  column: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  itemType: PropTypes.string.isRequired,
};

export default Weekly;
