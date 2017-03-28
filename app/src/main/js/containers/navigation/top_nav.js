import React, { Component } from 'react';

const TOP_ITEM = [
  { name: 'Top' },
  { name: 'Algo' },
  { name: 'Recent' },
];
class TopNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: TOP_ITEM[0],
    };
  }
  render() {
    return (
      <div className="top_nav">
        <div className="top_nav_container" id="top_nav_container" >
          {
          TOP_ITEM.map(item => (
            <button
              className="btn"
              id={item.name}
              onClick={() => this.changeTopNav(item.name)} key={item.name}
            >
              {item.name}
            </button>
            ))
        }
        </div>
      </div>
    );
  }
}

export default TopNav;
