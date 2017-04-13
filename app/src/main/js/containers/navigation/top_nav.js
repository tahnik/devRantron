import React, { Component } from 'react';

class TopNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: '',
    };
  }

  changeTopNav(type) {
    this.props.fetch(type);
    this.setState({ activeItem: type });
  }

  render() {
    return (
      <div className="top_nav">
        <div className="top_nav_container" id="top_nav_container" >
          {
          this.props.items.map((item) => {
            let activeStyle = '';
            if (this.state.activeItem === item) {
              activeStyle = '1px solid white';
            }
            return (
              <button
                className="btn"
                onClick={() => this.changeTopNav(item)}
                key={item}
                style={{ borderBottom: activeStyle }}
              >
                {item}
              </button>
            );
          })
        }
        </div>
      </div>
    );
  }
}

TopNav.propTypes = {
  fetch: React.PropTypes.func.isRequired,
  items: React.PropTypes.array,
};

TopNav.defaultProps = {
  items: [],
};

export default TopNav;
