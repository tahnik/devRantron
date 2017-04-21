import React, { Component } from 'react';
import { connect } from 'react-redux';
import { tabItem } from '../../actions/nav';
import FEED from '../../consts/feed';

class TopNav extends Component {

  onClickTabItem(type) {
    this.props.updateItem(type);
  }

  render() {
    return (
      <div className="top_nav">
        <div className="top_nav_container" id="top_nav_container" >
          {
          this.props.items.map((item) => {
            let activeStyle = '';
            if (this.props.selectedItem === item) {
              activeStyle = '1px solid white';
            }
            return (
              <button
                className="btn"
                onClick={() => (
                  () => {
                    if (this.props.selectedItem !== item) this.onClickTabItem(item);
                  }
                )()}
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
  items: React.PropTypes.array,
  updateItem: React.PropTypes.func.isRequired,
  selectedItem: React.PropTypes.string.isRequired,
};

TopNav.defaultProps = {
  items: [],
  selectedItem: FEED.RANTS.ALGO,
};

const mapStateToProps = state => ({
  items: state.topNav.items,
  selectedItem: state.topNav.selectedItem,
});

const mapDispatchToProps = dispatch => ({
  updateItem: (i) => { dispatch(tabItem(i)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);
