import React, { Component } from 'react';
import { connect } from 'react-redux';
import { tabItem } from '../../actions/nav';
import { resetPage, fetch } from '../../actions/rants';

class TopNav extends Component {
  onClickTabItem(type) {
    this.props.updateItem(type);
    this.props.resetPage();
    this.props.fetch(
      type,
      25,
      25 * this.props.rants.page,
      this.props.authToken,
    );
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
                onClick={() => this.onClickTabItem(item)}
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
  updateItem: React.PropTypes.func.isRequired,
  resetPage: React.PropTypes.func.isRequired,
  rants: React.PropTypes.shape({
    page: React.PropTypes.number.isRequired,
  }),
  selectedItem: React.PropTypes.string, // eslint-disable-line
  authToken: React.PropTypes.object.isRequired,
};

TopNav.defaultProps = {
  items: [],
  rants: [],
};

const mapStateToProps = state => ({
  items: state.topNav.items,
  selectedItem: state.topNav.selectedItem,
  rants: state.rants,
  authToken: state.auth.authToken,
});

const mapDispatchToProps = dispatch => ({
  updateItem: (i) => { dispatch(tabItem(i)); },
  resetPage: () => { resetPage()(dispatch); },
  fetch: (m, e, o, w) => fetch(m, e, o, w)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);
