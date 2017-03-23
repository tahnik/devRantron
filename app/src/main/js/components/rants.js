import React, { Component } from 'react';
import { connect } from 'react-redux';

import {fetchRants} from '../actions/rantsActions';

import Rant from './rant';

@connect((store) => {
  return {
    rants: store.rants.rants,
    fetching: store.rants.fetching,
    fetched: store.rants.fetched,
    error: store.rants.error,
  };
})
/* Ignore esling error for now. More stuff will be added later */
class Rants extends Component {
  componentWillMount() {
    this.props.dispatch(fetchRants());
  }

  render() {
    const { rants, fetching, fetched, error } = this.props;
    if (!fetched) {
      return (
        <div className="rants" >
          { rants.map(rant => (
            <Rant key={rant.id} rant={rant} />
          ))}
        </div>
      );
    }
    return (
      <div className="rants center">
        <div id="loaderCont">
          <div className="loader" id="loader1" />
          <div className="loader" id="loader2" />
        </div>
      </div>
    );
  }
}

export default Rants;
