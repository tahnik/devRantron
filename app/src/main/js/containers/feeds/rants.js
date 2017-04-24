import React, { Component } from 'react';
import twemoji from 'twemoji';
import { connect } from 'react-redux';
// import RantCard from '../rant/rant_card';
// import RantItem from '../rant/rant_item';
import { dumpRants } from '../../actions/rants';
import STATE from '../../consts/state';
import FEED from '../../consts/feed';
import { tabbedNav, tabItem } from '../../actions/nav';
import { filterDuplicate, basicRantView } from '../rant/rant_view';

class Rants extends Component {

  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      scrollLock: false,  // false == not acquired
    };
  }

  componentWillMount() {
    const DEFAULT_TAB_ITEM = FEED.RANTS.ALGO;
    this.fetchRants(DEFAULT_TAB_ITEM);
    this.props.updateTabItem(DEFAULT_TAB_ITEM);
    this.props.updateTopNav(Object.values(FEED.RANTS));
  }

  componentDidMount() {
    document.getElementsByClassName('main_container')[0].addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate() {
    twemoji.parse(document.body);
  }

  componentWillUnmount() {
    document.getElementsByClassName('main_container')[0].removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const { rants } = this.props;
    const windowHeight = document.getElementsByClassName('main_container')[0].offsetHeight;
    const scrollHeight = document.getElementsByClassName('rantContainer')[0].clientHeight - windowHeight;
    const scrollTop = document.getElementsByClassName('main_container')[0].scrollTop;

    if (
      scrollTop + (windowHeight * 2) >= scrollHeight &&
      rants.state !== STATE.LOADING &&
      !this.state.scrollLock
    ) {
      this.state.scrollLock = true;
      this.fetchRants(rants.feedType);
    }
  }

  fetchRants(type) {
    const { rants } = this.props;
    this.props.fetch(
      type,
      25,
      25 * this.props.rants.page,
      this.props.authToken,
    ).then((res) => {
      this.props.dumpRants(type, filterDuplicate(rants.currentRants, res));
      if (this.state.scrollLock) {
        this.state.scrollLock = false;
      }
    });
  }

  render() {
    const { rants } = this.props;

    return basicRantView(rants);
  }
}

Rants.propTypes = {
  rants: React.PropTypes.object.isRequired,
  fetch: React.PropTypes.func.isRequired,
  updateTopNav: React.PropTypes.func.isRequired,
  updateTabItem: React.PropTypes.func.isRequired,
  dumpRants: React.PropTypes.func.isRequired,
  authToken: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    rants: state.rants,
    authToken: state.auth.authToken,
    selectedItem: state.topNav.selectedItem,
  };
}

const mapDispatchToProps = dispatch => ({
  dumpRants: (t, p) => { dispatch(dumpRants(t, p)); },
  updateTopNav: (r) => { dispatch(tabbedNav(r)); },
  updateTabItem: (r) => { dispatch(tabItem(r)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Rants);
