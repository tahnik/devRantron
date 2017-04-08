import React, { Component } from 'react';
import CommentItem from './comment_item';

class RantItem extends Component {
  componentDidMount() {
    document.body.style.overflow = 'hidden';
  }
  componentWillUnmount() {
    document.body.style.overflow = 'scroll';
  }
  render() {
    const { rant } = this.props.rant;
    const { comments } = this.props.rant;
    let imageSource = <img src="res/images/empty_avatar.png" alt="" />;

    if (rant.user_avatar.i) {
      imageSource = <img src={`https://avatars.devrant.io/${rant.user_avatar.i}`} alt="" />;
    }
    return (
      <div
        className="rant_item_container"
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
                  <i className="ion-chatbubbles" />
                </div>
              </div>
            </div>
          </div>
          <div className="col s6 col-comment" >
            {
              comments.map((comment) => {
                return (
                  <CommentItem comment={comment} />
                );
              })
            }
          </div>
        </div>
      </div>
    );
    // let trimmedString = rant.text;
    // if (rant.text.length > 300) {
    //   const maxLength = 300;
    //   trimmedString = rant.text.substr(0, maxLength);
    //   trimmedString = `${trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')))}...(Read More)`;
    // }

    // let imageSource = <img src="res/images/empty_avatar.png" alt="" />;

    // if (rant.user_avatar.i) {
    //   imageSource = <img src={`https://avatars.devrant.io/${rant.user_avatar.i}`} alt="" />;
    // }
    // return (
    //   <div className="rant_card row" >
    //     <div className="card blue-grey darken-1">
    //       <div className="card-user">
    //         { imageSource }
    //         <div>
    //           <p>{rant.user_username}</p>
    //           <p className="user_score">+{rant.user_score}</p>
    //         </div>
    //       </div>
    //       <div className="card-content white-text">
    //         <pre><p>{trimmedString}</p></pre>
    //       </div>
    //       <div className="card-image">
    //         <img src={rant.attached_image.url} alt="" />
    //       </div>
    //       <div className="card-bottomBar">
    //         <i className="ion-plus-round" />
    //         <p>{rant.score}</p>
    //         <i className="ion-minus-round" />
    //         <div style={{ flex: 1 }} />
    //         <p>{rant.num_comments}</p>
    //         <i className="ion-chatbubbles" />
    //       </div>
    //     </div>
    //   </div>
    // );
  }
}

RantItem.propTypes = {
  rant: React.PropTypes.shape({
    rant: React.PropTypes.object,
    comments: React.PropTypes.object,
  }).isRequired,
};

export default RantItem;
