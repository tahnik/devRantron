import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RantType extends Component {
  constructor() {
    super();
    this.types = [
      { id: 1, color: '#d55063', icon: 'icon ion-chatbubble-working', text: 'Rant / Story' },
      { id: 2, color: '#e1c871', icon: 'ion-android-people', text: 'Collab' },
      { id: 3, color: '#2b8a9c', icon: 'icon ion-image', text: 'Joke / Meme' },
      { id: 4, color: '#ab73a2', icon: 'icon ion-help', text: 'Question' },
      { id: 5, color: '#fa9a67', icon: 'icon ion-heart', text: 'devRant' },
      { id: 6, color: '#7ac8a6', icon: 'icon ion-ios-game-controller-a', text: 'Random' },
    ];
    this.state = {
      open: false,
      selected: { id: 1, color: '#d55063', icon: 'ion-chatbubble-working', text: 'Rant / Story' },
    };
  }

  select(type) {
    this.props.onSelect(type);
    this.setState({ selected: type, open: false });
  }

  render() {
    return (
      <div className="dropdown">
        <div
          className="item selected"
          style={{ background: this.state.selected.color }}
          onClick={() => this.setState({ open: !this.state.open })}
        >
          <div className="flexgrow">
            <i className={this.state.selected.icon} /><span>{this.state.selected.text}</span>
          </div>
          <div className="dropbtn">
            <i className="ion-chevron-down" />
          </div>
        </div>
        <div className={`actualDropdown ${this.state.open ? 'active' : ''}`}>
          {
            this.types.map(type =>
              (type.id !== this.state.selected.id &&
                <div
                  className="item"
                  style={{ background: type.color }}
                  onClick={() => this.select(type)}
                >
                  <div className="flexgrow">
                    <i className={type.icon} /><span>{type.text}</span>
                  </div>
                </div>
              ),
            )
          }
        </div>
      </div>
    );
  }
}


RantType.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default RantType;
