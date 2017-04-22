import React, { Component } from 'react';
import { connect } from 'react-redux';
import Collabs from '../containers/feeds/collabs';
import Rants from '../containers/feeds/rants';
import Stories from '../containers/feeds/stories';
import Weekly from '../containers/feeds/weekly';
import ROUTES from '../consts/routes';
import { resetPage } from '../actions/rants';


class Feed extends Component {
  componentWillUpdate() {
    this.props.resetPage();
  }

  getActiveFeed() {
    const url = this.props.match.url;
    switch (url) {
      case ROUTES.main.stories:
        return <Stories key={url} />;
      case ROUTES.main.collabs:
        return <Collabs key={url} />;
      case ROUTES.main.weekly:
        return <Weekly key={url} />;
      default:
        return <Rants key={url} />;
    }
  }

  render() {
    return (
      <div className="main_container row">
        <div className="row" style={{ visibility: 'hidden', position: 'absolute', maxWidth: '900px', width: '100%' }} >
          <div className="rants col s6" id="fakeRant" style={{ visibility: 'hidden' }} >
            <div id="hiddenRant" style={{ visibility: 'hidden' }} />
          </div>
          <div className="rants col s6" id="fakeRant" style={{ visibility: 'hidden' }} >
            <div style={{ visibility: 'hidden' }} />
          </div>
        </div>
        { this.getActiveFeed() }
      </div>
    );
  }
}

Feed.propTypes = {
  match: React.PropTypes.shape({
    url: React.PropTypes.string.isRequired,
  }).isRequired,
  resetPage: React.PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  resetPage: () => { dispatch(resetPage()); },
});

export default connect(null, mapDispatchToProps)(Feed);
