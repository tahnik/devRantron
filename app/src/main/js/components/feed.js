import React, { Component } from 'react';
import Collabs from '../containers/feeds/collabs';
import Rants from '../containers/feeds/rants';
import Stories from '../containers/feeds/stories';
import Weekly from '../containers/feeds/weekly';
import ROUTES from '../consts/routes';

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
      <div className="main_container row">
        <div className="row" style={{ visibility: 'hidden', position: 'absolute', maxWidth: '900px', width: '100%' }} >
          <div className="rants col s6" id="fakeRant" style={{ visibility: 'hidden' }} >
            <div id="hiddenRant" style={{ visibility: 'hidden' }} />
          </div>
          <div className="rants col s6" id="fakeRant" style={{ visibility: 'hidden' }} >
            <div style={{ visibility: 'hidden' }} />
          </div>
        </div>
        {this.state.activeFeed}
      </div>
    );
  }
}

Feed.propTypes = {
  match: React.PropTypes.shape({
    path: React.PropTypes.string.isRequired,
  }).isRequired,
};

export default Feed;
