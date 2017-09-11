import React from 'react';

export default getComponent => class AsyncComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      Component: null,
    };
  }

  componentWillMount() {
    if (!this.state.Component) {
      getComponent().then((Component) => {
        this.setState({ Component: Component.default });
      });
    }
  }
  render() {
    const { Component } = this.state;
    if (Component) {
      return <Component {...this.props} />;
    }
    return null;
  }
};
