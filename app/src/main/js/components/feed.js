import React, { Component } from 'react';
import { connect } from 'react-redux';
import Rants from '../containers/feeds/rants';
import ROUTES from '../consts/routes';
import { loading, resetPage, dumpRants } from '../actions/rants';
import { tabbedNav, tabItem, blankNav } from '../actions/nav';
import FEED from '../consts/feed';

const RANTS_PER_LOAD = 25;

const rantscript = require('electron').remote.require('rantscript');


// change to disable comprssion in production
rantscript.httpSettings.SET_COMPRESS(false);
// only execute if we are in development
if (process.env.NODE_ENV === 'development') {
  rantscript.httpSettings.SET_DEBUG(true);
}

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skip: 0,
      selectedItem: '',
      url: props.match.url ? props.match.url : ROUTES.main.rants,
    };
  }

  /* A brief description of what's happenning:
  1. First the component will mount componentWillMount is called
  2. It loads the contents of TopNav
  3. Since it updates selectedItem, it triggers a re-render of this component
  4. shouldComponentUpdate is called, then componentWillUpdate, it updates the rants, sets skip to 0
  5. now everytime the user scrolls down they load new rants and skip increments
  6. when route changes, it again triggers a re-render
  7. shouldComponentUpdate is called, then componentWillUpdate, simply updates the route
  8. which in-turn updates the TopNav, selectedItem changes causing a re-render
  9. which in-turn updates the rants :)
  */

  componentWillMount() {
    console.log('component will mount');
    this.props.resetPage();
    this.loadRants(false, true, false);
  }

  shouldComponentUpdate(p) {
    console.log('should component update');
    return (
      p.selectedItem !== this.state.selectedItem ||
      p.match.url !== this.state.url
    );
  }

  componentWillUpdate(p) {
    console.log('component will update');
    let updateTN = false;
    let updateR = false;
    if (this.state.url !== p.match.url) {
      updateTN = true;
      this.state.url = p.match.url;
      this.state.selectedItem = '';
    } else {  // p.selectedItem !== this.state.selectedItem
      updateR = true;
      this.state.selectedItem = p.selectedItem;
      this.state.skip = 0;
      this.props.loading(p.selectedItem);
    }

    this.props.resetPage();
    this.loadRants(updateR, updateTN, updateR, p.selectedItem);
  }

  loadRants(
    incrementSkip = true,
    updateTopNav = false,
    updateRants = true,
    selectedItem = this.state.selectedItem,
  ) {
    switch (this.state.url) {
      case ROUTES.main.rants: {
        if (updateTopNav) {
          this.props.updateTopNav(Object.values(FEED.RANTS));
          this.props.updateTabItem(FEED.RANTS.ALGO);
        }
        if (updateRants) {
          rantscript.rants(
            selectedItem, RANTS_PER_LOAD, this.state.skip, this.props.authToken,
          ).then(res => this.props.dumpRants(selectedItem, res));
        }
        break;
      }
      case ROUTES.main.stories: {
        if (updateTopNav) {
          this.props.updateTopNav(Object.values(FEED.STORIES));
          this.props.updateTabItem(FEED.STORIES.TOP);
        }
        if (updateRants) {
          rantscript.stories(
            undefined, selectedItem, RANTS_PER_LOAD, this.state.skip, this.props.authToken,
          ).then(res => this.props.dumpRants(selectedItem, res));
        }
        break;
      }
      case ROUTES.main.collabs: {
        if (updateTopNav) {
          this.props.blankNav();
          this.props.updateTabItem('recent');
        }
        if (updateRants) {
          rantscript.collabs(
            undefined, RANTS_PER_LOAD, this.state.skip, this.props.authToken,
          ).then(res => this.props.dumpRants(selectedItem, res));
        }
        break;
      }
      case ROUTES.main.weekly: {
        if (updateTopNav) {
          this.props.updateTopNav(Object.values(FEED.WEEKLY));
          this.props.updateTabItem(FEED.WEEKLY.ALGO);
        }
        if (updateRants) {
          rantscript.weekly(
            40, selectedItem, RANTS_PER_LOAD, this.state.skip, this.props.authToken,
          ).then(res => this.props.dumpRants(selectedItem, res));
        }
        break;
      }
      default:
        console.log('404: Not Found');
    }
    if (incrementSkip) this.state.skip += 25;
  }
  render() {
    console.log(this.props.match.url);

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
        <Rants loadRants={() => this.loadRants()} key={this.props.match.url} />
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
  dumpRants: React.PropTypes.func.isRequired,
  blankNav: React.PropTypes.func.isRequired,
  // selectedItem: React.PropTypes.string.isRequired,
  authToken: React.PropTypes.object.isRequired,
  updateTopNav: React.PropTypes.func.isRequired,
  updateTabItem: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    authToken: state.auth.authToken,
    selectedItem: state.topNav.selectedItem,
  };
}

const mapDispatchToProps = dispatch => ({
  resetPage: () => { dispatch(resetPage()); },
  loading: (t) => { dispatch(loading(t)); },
  dumpRants: (t, p) => { dispatch(dumpRants(t, p)); },
  updateTopNav: (r) => { dispatch(tabbedNav(r)); },
  updateTabItem: (r) => { dispatch(tabItem(r)); },
  blankNav: () => { dispatch(blankNav()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
