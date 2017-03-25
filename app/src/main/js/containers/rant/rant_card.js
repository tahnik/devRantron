import React, { Component } from 'react';
import { connect, bindActionCreators } from 'react-redux';
import { fetchRants } from '../actions/rants';
import Vote from '../actions/vote';

/* Ignore esling error for now. More stuff will be added later */
class Rants extends Component {
  componentWillMount() {
    this.props.fetchRants();
  }

  render() {
    const { rants, fetching, fetched, error } = this.props;
    if (!fetched) {
      return (
        <div className="rants" >
          { rants.map(rant => (
            <div className="rant" >
              <Vote rant={rant} />
              <p>{rant.text}</p>
            </div>
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    fetchRants,
    dispatch,
  );
}


function mapStateToProps(state) {
  return {
    rants: state.rants.rants,
    fetching: state.rants.fetching,
    fetched: state.rants.fetched,
    error: state.rants.error,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Rants);
