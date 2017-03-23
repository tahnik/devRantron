import React, { Component } from 'react';
import rantscript from 'rantscript';
import Rant from './rant';

/* Ignore esling error for now. More stuff will be added later */
class Rants extends Component {
  constructor(props) {
    super(props);
    this.state = { displayedRants: [] };
  }

  componentDidMount() {
    rantscript
      .rants('algo', 25, 0)
      .then((resp) => {
        this.setState({ displayedRants: resp });
      });
  }

  render() {
    if (this.state.displayedRants.length > 0) {
      return (
        <div className="rants" >
          { this.state.displayedRants.map(rant => (
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
