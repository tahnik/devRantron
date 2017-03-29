import React, { Component } from 'react';
import RantCard from '../rant/rant_card';
import { connect } from 'react-redux';
import { fetchRants } from '../../actions/rants';
import { STATE } from '../../consts/state';

class Rants extends Component {
  componentDidMount() {
    this.props.fetchRants('top', 10, 0);
  }
  render() {
    const { rants } = this.props;
    console.log(rants)
    if (rants.state === STATE.LOADING) {
      return (
        <div className="center">
          <div id="loaderCont">
            <div className="loader" id="loader1" />
            <div className="loader" id="loader2" />
          </div>
        </div>
      );
    }
    return (
      <div className="rants row">
        {
        rants.currentRants.map(rant => <RantCard rant={rant} key={rant.id} />)
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

export default connect(mapStateToProps, { fetchRants })(Rants);
