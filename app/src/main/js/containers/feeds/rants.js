import React, { Component } from 'react';
import RantCard from '../rant/rant_card';
import { connect } from 'react-redux';
import { fetch } from '../../actions/rants';
import { STATE } from '../../consts/state';
import { FEED } from '../../consts/feed';

function mapStateToProps(state) {
  return {
    rants: state.rants,
  };
}

class Rants extends Component {
  /* Ignore for now, not always running componentDidMount() {
    const { rants } = this.props;

    document.body.onscroll = () => {
      console.log(document.body.scrollTop, document.body.scrollHeight, window.innerHeight * 2);
      console.log(document.body.scrollTop > document.body.scrollHeight - (window.innerHeight * 2));

      if (document.body.scrollTop > document.body.scrollHeight - (window.innerHeight * 2) && rants.state !== STATE.LOADING) {
        console.log('Load Rants');
        this.props.fetch(rants.feedType, 25, rants.page);
      }
    }
  } */

  render() {
    const { rants } = this.props;

    if (rants.state === STATE.LOADING) {
      return (
        <div>
          <div id="loaderCont" >
            <div className="loader" id="loader1" />
            <div className="loader" id="loader2" />
          </div>
        </div>
      );
    }
    return (
      <div className="row" id="rantsFeed" >
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
    );
  }
}

export default connect(mapStateToProps, { fetch })(Rants);
