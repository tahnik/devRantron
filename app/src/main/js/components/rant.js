import React, { Component } from 'react';

/* Ignore esling error for now. More stuff will be added later */
class Rant extends Component {
  render() {
    return (
      <div className="rant" >
        <div className="rant_vote_container">
          <button><p>++</p></button>
          <span>{this.props.rant.score}</span>
          <button><p>--</p></button>
        </div>
        <p>{this.props.rant.text}</p>
      </div>
    );
  }
}

Rant.propTypes = { rant: React.PropTypes.object.isRequired };

export default Rant;
