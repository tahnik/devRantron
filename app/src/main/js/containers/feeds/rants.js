import React, { Component } from 'react';
import { connect } from 'react-redux';
import RantCard from '../rant/rant_card';
import RantItem from '../rant/rant_item';
import { fetch, resetPage } from '../../actions/rants';
import STATE from '../../consts/state';
import FEED from '../../consts/feed';
import TopNav from '../navigation/top_nav';
import { tabbedNav, tabItem } from '../../actions/nav';

// Use import instead?
const twemoji = require('twemoji');

class Rants extends Component {

  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    // this.state = {
    //   firstTime: true
    // }
    // const DEFAULT_TAB_ITEM = FEED.RANTS.ALGO
    // props.updateTabItem(DEFAULT_TAB_ITEM);
    // this.fetchRants(DEFAULT_TAB_ITEM);
  }

  componentWillMount() {
    const DEFAULT_TAB_ITEM = FEED.RANTS.ALGO
    // this.props.fetch(
    //   DEFAULT_TAB_ITEM,
    //   25,
    //   25 * this.props.rants.page,
    // );
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
      // this.props.fetch(
      //   rants.feedType,
      //   25,
      //   25 * rants.page,
      //   this.props.authToken,
      // );
      this.fetchRants(rants.feedType);
    }
  }

  fetchRants(type) {
    // this.props.resetPage();
    this.props.fetch(
      type,
      25,
      25 * this.props.rants.page,
      this.props.authToken,
    );
  }

  render() {
    // if (this.state.firstTime) {
    //   this.setState({ firstTime: false });
    // } else {
    //   this.fetchRants(this.props.selectedItem);
    // }

    const { rants } = this.props;
    // this.props.updateTopNav(Object.values(FEED.RANTS));

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
  resetPage: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    rants: state.rants,
    authToken: state.auth.authToken,
    selectedItem: state.topNav.selectedItem,
  };
}

const mapDispatchToProps = (dispatch) => ({
  fetch: (m, e, o, w) => fetch(m, e, o, w)(dispatch),
  resetPage: () => resetPage()(dispatch),
  updateTopNav: (r) => dispatch(tabbedNav(r)),
  updateTabItem: (r) => dispatch(tabItem(r)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Rants);
