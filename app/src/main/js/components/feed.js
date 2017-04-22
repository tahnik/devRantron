import React, { Component } from 'react';
import { connect } from 'react-redux';
import Collabs from '../containers/feeds/collabs';
import Rants from '../containers/feeds/rants';
import Stories from '../containers/feeds/stories';
import Weekly from '../containers/feeds/weekly';
import ROUTES from '../consts/routes';
import { resetPage, loading } from '../actions/rants';

const rantscript = require('electron').remote.require('rantscript');


// change to disable comprssion in production
rantscript.httpSettings.SET_COMPRESS(false);
// only execute if we are in development
if (process.env.NODE_ENV === 'development') {
  rantscript.httpSettings.SET_DEBUG(true);
}


class Feed extends Component {
  componentWillMount() {
    this.props.loading();
    this.props.resetPage();
  }

  componentWillUpdate() {
    this.props.resetPage();
  }

  getActiveFeed() {
    const url = this.props.match.url;
    switch (url) {
      case ROUTES.main.stories:
        return <Stories key={url} fetch={rantscript.stories} />;
      case ROUTES.main.collabs:
        return <Collabs key={url} fetch={rantscript.collabs} />;
      case ROUTES.main.weekly:
        return <Weekly key={url} fetch={rantscript.weekly} />;
      default:
        return <Rants key={url} fetch={rantscript.rants} />;
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
  loading: React.PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  resetPage: () => { dispatch(resetPage()); },
  loading: () => { dispatch(loading()); },
});

export default connect(null, mapDispatchToProps)(Feed);
