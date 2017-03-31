import React, { Component } from 'react';
import Collabs from '../containers/feeds/collabs';
import Discussion from '../containers/feeds/discussions';
import Rants from '../containers/feeds/rants';
import Stories from '../containers/feeds/stories';
import Weekly from '../containers/feeds/weekly';
import { ROUTES } from '../consts/routes';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFeed: <Rants />,
    };
  }
  componentWillMount() {
    this.changeActiveFeed();
  }
  changeActiveFeed() {
    switch (this.props.match.path) {
      case ROUTES.stories:
        this.setState({ activeFeed: <Stories /> });
        break;
      case ROUTES.collabs:
        this.setState({ activeFeed: <Collabs /> });
        break;
      case ROUTES.rants:
        this.setState({ activeFeed: <Rants /> });
        break;
      case ROUTES.weekly:
        this.setState({ activeFeed: <Weekly /> });
        break;
      default:
        this.setState({ activeFeed: <Rants /> });
    }
  }
  render() {
    return (
      <div className="main_container">
        {this.state.activeFeed}
      </div>
    );
  }
}

export default Feed;
