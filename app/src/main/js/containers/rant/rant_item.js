import React, { Component } from 'react';
import { connect } from 'react-redux';
import Comments from './comments';
import { closeRant } from '../../actions/rant';
import { STATE } from '../../consts/state';

class RantItem extends Component {
  renderRant() {
    const { rant, comments } = this.props.rant.rant;
    let imageSource = <img src="res/images/empty_avatar.png" alt="" />;

    document.body.style.overflow = 'hidden';

    if (rant.user_avatar.i) {
      imageSource = <img src={`https://avatars.devrant.io/${rant.user_avatar.i}`} alt="" />;
    }
    return (
      <div
        className="rant_item_container"
        onContextMenu={() => this.props.closeRant()}
      >
        <div className="rant_item">
          <div className="col s6" >
            <div className="rant_card row" >
              <div className="card blue-grey darken-1">
                <div className="card-user">
                  { imageSource }
                  <div>
                    <p>{rant.user_username}</p>
                    <p className="user_score">+{rant.user_score}</p>
                  </div>
                </div>
                <div className="card-content white-text">
                  <pre><p>{rant.text}</p></pre>
                </div>
                <div className="card-image">
                  <img src={rant.attached_image.url} alt="" />
                </div>
                <div className="card-bottomBar">
                  <i className="ion-plus-round" />
                  <p>{rant.score}</p>
                  <i className="ion-minus-round" />
                  <div style={{ flex: 1 }} />
                  <p>{rant.num_comments}</p>
                  <i className="ion-reply" />
                </div>
              </div>
            </div>
          </div>
          <Comments comments={comments} />
        </div>
      </div>
    );
  }
  renderLoading() {
    return (
      <div
        className="rant_item_container"
      >
        <div id="loaderCont" >
          <div className="loader" id="loader1" />
          <div className="loader" id="loader2" />
        </div>
      </div>
    );
  }
  render() {
    const { rant } = this.props;

    if (rant.state === STATE.LOADING && rant.rant === null) {
      return (
        this.renderLoading()
      );
    } else if (rant.rant === null) {
      document.body.style.overflow = 'auto';
      return <div />;
    }
    return (
      this.renderRant()
    );
  }
}

RantItem.propTypes = {
  rant: React.PropTypes.shape({
    rant: React.PropTypes.object,
    comments: React.PropTypes.object,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    rant: state.rant,
  };
}

export default connect(mapStateToProps, { closeRant })(RantItem);
