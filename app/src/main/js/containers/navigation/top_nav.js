import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ROUTES from '../../consts/routes';
import FEED from '../../consts/feed';
import { fetch, resetPage } from '../../actions/rants';

class TopNav extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeItem: '',
    };
  }

  componentWillMount() {
    this.props.fetch(
      this.props.rants.feedType,
      25,
    );
    this.setState({ activeItem: this.props.rants.feedType });
  }

  getTopItems() {
    switch (this.props.match.path) {
      case ROUTES.root:
        return Object.values(FEED.RANTS);
      case ROUTES.stories:
        return Object.values(FEED.STORIES);
      default:
        return [];
    }
  }

  changeTopNav(type) {
    this.props.resetPage();
    this.props.fetch(
      type,
      25,
      25 * this.props.rants.page,
    );
    this.setState({ activeItem: type });
  }

  render() {
    return (
      <div className="top_nav">
        <div className="top_nav_container" id="top_nav_container" >
          {
          this.getTopItems().map((item) => {
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
  resetPage: React.PropTypes.func.isRequired,
  rants: React.PropTypes.object.isRequired,
  match: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    rants: state.rants,
  };
}

export default withRouter(connect(mapStateToProps, { fetch, resetPage })(TopNav));
