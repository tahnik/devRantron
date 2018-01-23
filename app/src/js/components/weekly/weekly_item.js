import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WeeklyItem extends Component {
  constructor() {
    super();
    this.state = {
      hovering: false,
    };
  }
  render() {
    const {
      week, selection, theme, onClick,
    } = this.props;
    return (
      <div
        key={week.week}
        className={`weekly_selection ${selection} ${week.week}`}
        onClick={() => onClick(week.week)}
        onMouseEnter={() => this.setState({ hovering: true })}
        onMouseLeave={() => this.setState({ hovering: false })}
        style={{
          width: `${parseInt(theme.column.width, 10) - 25}px`,
          backgroundColor: `${this.state.hovering ?
            theme.backgroundColor
            : theme.item_card.backgroundColor
          }`,
        }}
      >
        <div className="weekly_option">
          <div className="weekDesc"><b>{`wk${week.week}`}</b> {`${week.prompt}`}</div>
        </div>
      </div>
    );
  }
}

WeeklyItem.propTypes = {
  week: PropTypes.object.isRequired,
  selection: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default WeeklyItem;
