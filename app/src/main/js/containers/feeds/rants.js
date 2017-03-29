import React, { Component } from 'react';
import RantCard from '../rant/rant_card';
import { connect } from 'react-redux';
import { fetch } from '../../actions/rants';
import { STATE } from '../../consts/state';
import { FEED } from '../../consts/feed';

class Rants extends Component {
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
      <div className="row" >
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

function mapStateToProps(state) {
  return {
    rants: state.rants,
  };
}

export default connect(mapStateToProps, { fetch })(Rants);
