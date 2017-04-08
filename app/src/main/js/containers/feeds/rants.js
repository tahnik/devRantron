import React, { Component } from 'react';
import { connect } from 'react-redux';
import RantCard from '../rant/rant_card';
import RantItem from '../rant/rant_item';
import { fetch } from '../../actions/rants';
import { STATE } from '../../consts/state';

// Use import instead?
const twemoji = require('twemoji');

class Rants extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }
  componentDidUpdate() {
    twemoji.parse(document.body);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll() {
    const { rants } = this.props;
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom + (windowHeight * 2) >= docHeight && rants.state !== STATE.LOADING) {
      this.props.fetch(
        rants.feedType,
        25,
        25 * rants.page,
      );
    }
  }
  render() {
    const { rants } = this.props;
    if (rants.state === STATE.LOADING && rants.currentRants.length === 0) {
      return (
        <div id="loaderCont" >
          <div className="loader" id="loader1" />
          <div className="loader" id="loader2" />
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
  rants: React.PropTypes.array.isRequired,
  fetch: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    rants: state.rants,
  };
}

export default connect(mapStateToProps, { fetch })(Rants);
