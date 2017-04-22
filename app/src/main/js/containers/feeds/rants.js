import React, { Component } from 'react';
import { connect } from 'react-redux';
import RantCard from '../rant/rant_card';
import RantItem from '../rant/rant_item';
import { fetch, dumpRants } from '../../actions/rants';
import STATE from '../../consts/state';
import FEED from '../../consts/feed';
import { tabbedNav, tabItem } from '../../actions/nav';

// Use import instead?
const twemoji = require('twemoji');

class Rants extends Component {

  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
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

    if (scrollTop + (windowHeight * 2) >= scrollHeight && rants.state !== STATE.LOADING) {
      this.fetchRants(rants.feedType);
    }
  }

  fetchRants(type) {
    this.props.fetch(
      type,
      25,
      25 * this.props.rants.page,
      this.props.authToken,
    );
  }

  render() {
    const { rants } = this.props;

    if (rants.state === STATE.LOADING && rants.currentRants.length === 0) {
      return (
        <div style={{ display: 'flex' }}>
          <div id="loaderCont" >
            <div className="loader" id="loader1" />
            <div className="loader" id="loader2" />
          </div>
        </div>
      );
    }

    return (
      <div>
        <RantItem />
        <div className="row rantContainer" >
          {
          rants.currentRants.map((currentRants, index) => {
            const key = `column${index}`;
            return (
              <div className="rants col s6" id={key} key={key} >
                {
                  currentRants.map(rant => <RantCard rant={rant} key={rant.id} />)
                }
              </div>
            );
          })
          }
        </div>
      </div>
    );
  }
}

Rants.propTypes = {
  rants: React.PropTypes.object.isRequired,
  fetch: React.PropTypes.func.isRequired,
  updateTopNav: React.PropTypes.func.isRequired,
  updateTabItem: React.PropTypes.func.isRequired,
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
