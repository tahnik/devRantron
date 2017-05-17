import React, { Component } from 'react';

class Notifs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      middleWidth: null,
    };
  }
  componentDidMount() {
    //
  }
  render() {
    return (
      <div className="notifs_container" >
        Notifs
      </div>
    );
  }
}

Notifs.propTypes = {
};

export default Notifs;
